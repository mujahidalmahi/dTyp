import * as vscode from "vscode";
import * as path from "node:path";
import * as fs from "node:fs";
import * as os from "node:os";
import { spawn } from "node:child_process";
import { defaultLogger } from "@dtyp/utilities";

export interface ValgrindLeak {
	kind: "definitely-lost" | "indirectly-lost" | "possibly-lost" | "still-reachable";
	bytes: number;
	blocks: number;
	line?: number;
	filePath?: string;
	functionName?: string;
	rawTrace: string;
}

export interface ValgrindReport {
	definitelyLostBytes: number;
	indirectlyLostBytes: number;
	possiblyLostBytes: number;
	stillReachableBytes: number;
	totalErrors: number;
	leaks: ValgrindLeak[];
	rawOutput: string;
}

export class ValgrindParser {
	public static parse(output: string, targetFile?: string): ValgrindReport {
		let definitelyLost = 0;
		let indirectlyLost = 0;
		let possiblyLost = 0;
		let stillReachable = 0;
		let totalErrors = 0;
		const leaks: ValgrindLeak[] = [];

		// Match definitely lost
		const defMatch = /definitely lost:\s*([0-9,]+)\s*bytes in\s*([0-9,]+)\s*blocks/i.exec(output);
		if (defMatch) {
			definitelyLost = parseInt(defMatch[1].replace(/,/g, ""), 10);
		}

		// Match indirectly lost
		const indMatch = /indirectly lost:\s*([0-9,]+)\s*bytes in\s*([0-9,]+)\s*blocks/i.exec(output);
		if (indMatch) {
			indirectlyLost = parseInt(indMatch[1].replace(/,/g, ""), 10);
		}

		// Match possibly lost
		const posMatch = /possibly lost:\s*([0-9,]+)\s*bytes in\s*([0-9,]+)\s*blocks/i.exec(output);
		if (posMatch) {
			possiblyLost = parseInt(posMatch[1].replace(/,/g, ""), 10);
		}

		// Match still reachable
		const reachMatch = /still reachable:\s*([0-9,]+)\s*bytes in\s*([0-9,]+)\s*blocks/i.exec(output);
		if (reachMatch) {
			stillReachable = parseInt(reachMatch[1].replace(/,/g, ""), 10);
		}

		// Match ERROR SUMMARY
		const errMatch = /ERROR SUMMARY:\s*([0-9,]+)\s*errors/i.exec(output);
		if (errMatch) {
			totalErrors = parseInt(errMatch[1].replace(/,/g, ""), 10);
		}

		// Extract leak record blocks
		const leakRecordRegex = /([0-9,]+) bytes in ([0-9,]+) blocks are (definitely|indirectly|possibly|still) lost[\s\S]*?(?=\n\n|\n==\d+== \w|\n==\d+== LEAK SUMMARY|$)/gi;
		let recordMatch: RegExpExecArray | null;
		const baseTarget = targetFile ? path.basename(targetFile) : "";

		while ((recordMatch = leakRecordRegex.exec(output)) !== null) {
			const bytes = parseInt(recordMatch[1].replace(/,/g, ""), 10);
			const blocks = parseInt(recordMatch[2].replace(/,/g, ""), 10);
			const kindStr = recordMatch[3].toLowerCase();
			const kind = `${kindStr}-lost` as ValgrindLeak["kind"];
			const blockText = recordMatch[0];

			// Look for file and line number in stack frames: e.g. at 0x...: func (file.c:42)
			const locMatch = /at\s+0x[0-9a-fA-F]+:\s*([a-zA-Z0-9_]+)\s*\(([^:]+):(\d+)\)/.exec(blockText) ||
				/by\s+0x[0-9a-fA-F]+:\s*([a-zA-Z0-9_]+)\s*\(([^:]+):(\d+)\)/.exec(blockText);

			let line: number | undefined;
			let functionName: string | undefined;
			let filePath: string | undefined;

			if (locMatch) {
				functionName = locMatch[1];
				const rawFile = locMatch[2];
				line = parseInt(locMatch[3], 10);
				if (!baseTarget || rawFile.includes(baseTarget)) {
					filePath = targetFile || rawFile;
				}
			}

			leaks.push({
				kind,
				bytes,
				blocks,
				line,
				filePath,
				functionName,
				rawTrace: blockText,
			});
		}

		return {
			definitelyLostBytes: definitelyLost,
			indirectlyLostBytes: indirectlyLost,
			possiblyLostBytes: possiblyLost,
			stillReachableBytes: stillReachable,
			totalErrors,
			leaks,
			rawOutput: output,
		};
	}
}

export class ValgrindRunner {
	private static logger = defaultLogger.child("ValgrindRunner");

	public static async run(doc?: vscode.TextDocument): Promise<void> {
		const document = doc ?? vscode.window.activeTextEditor?.document;
		if (!document) {
			vscode.window.showWarningMessage("dTyp: Open a C file to run Valgrind memory leak profiling.");
			return;
		}

		const filePath = document.uri.fsPath;
		const isWindows = process.platform === "win32";

		vscode.window.setStatusBarMessage("$(search) dTyp: Running Valgrind Memory Profiler...", 3000);

		// Check if Valgrind is available
		const hasValgrind = await new Promise<boolean>((resolve) => {
			const checkCmd = isWindows ? "wsl" : "valgrind";
			const checkArgs = isWindows ? ["valgrind", "--version"] : ["--version"];
			const child = spawn(checkCmd, checkArgs);
			child.on("close", (code) => resolve(code === 0));
			child.on("error", () => resolve(false));
		});

		if (!hasValgrind) {
			vscode.window.showWarningMessage(
				`dTyp: Valgrind is not installed ${isWindows ? "in WSL (Windows Subsystem for Linux)" : "on this system"}.\nTip: Install via 'sudo apt install valgrind' for deep heap leak profiling. AddressSanitizer (Ctrl+F7) is active and running natively!`,
				"Run AddressSanitizer Instead"
			).then((action) => {
				if (action === "Run AddressSanitizer Instead") {
					vscode.commands.executeCommand("dtyp.runSanitizer", document);
				}
			});
			return;
		}

		// Compile binary with debug symbols -g -O0
		const tempDir = os.tmpdir();
		const binName = `dtyp_valg_${Date.now()}`;
		const binPath = path.join(tempDir, binName);

		const compileCode = await new Promise<number>((resolve) => {
			const gcc = spawn("gcc", ["-g", "-O0", filePath, "-o", binPath]);
			gcc.on("close", (code) => resolve(code ?? 1));
			gcc.on("error", () => resolve(1));
		});

		if (compileCode !== 0) {
			vscode.window.showErrorMessage("dTyp: GCC compilation failed before running Valgrind.");
			return;
		}

		// Run Valgrind
		const runArgs = ["--leak-check=full", "--show-leak-kinds=all", "--track-origins=yes", binPath];
		const valgProc = isWindows ? spawn("wsl", ["valgrind", ...runArgs]) : spawn("valgrind", runArgs);

		let stderr = "";
		valgProc.stderr.on("data", (data) => (stderr += data.toString()));

		await new Promise<void>((resolve) => {
			valgProc.on("close", () => resolve());
			valgProc.on("error", () => resolve());
		});

		try {
			if (fs.existsSync(binPath)) fs.unlinkSync(binPath);
		} catch {}

		const report = ValgrindParser.parse(stderr, filePath);

		if (report.definitelyLostBytes === 0 && report.indirectlyLostBytes === 0) {
			vscode.window.showInformationMessage(
				"🛡️ Valgrind Report: All heap blocks were freed! 0 bytes leaked. Clean execution. ★"
			);
		} else {
			vscode.window.showWarningMessage(
				`🚨 Valgrind Leak Detected: ${report.definitelyLostBytes} bytes definitely lost across ${report.leaks.length} block(s).`,
				"View Full Trace"
			).then((action) => {
				if (action === "View Full Trace") {
					const term = vscode.window.createTerminal("dTyp Valgrind Report");
					term.show();
					term.sendText(`echo "${stderr.replace(/"/g, '\\"')}"`);
				}
			});
		}
	}
}
