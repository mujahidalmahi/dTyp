import * as vscode from "vscode";
import * as path from "node:path";
import * as fs from "node:fs";
import * as os from "node:os";
import { spawn } from "node:child_process";
import { defaultLogger } from "@dtyp/utilities";

export interface SanitizerIssue {
	kind:
		| "heap-buffer-overflow"
		| "stack-buffer-overflow"
		| "global-buffer-overflow"
		| "use-after-free"
		| "double-free"
		| "null-dereference"
		| "integer-overflow"
		| "shift-out-of-bounds"
		| "generic-runtime-error";
	title: string;
	message: string;
	recommendation: string;
	filePath?: string;
	line?: number;
	column?: number;
	rawLog: string;
}

export class AddressSanitizerParser {
	public static parse(log: string, targetFilePath?: string): SanitizerIssue[] {
		const issues: SanitizerIssue[] = [];
		const lines = log.split("\n");

		// 1. Check Heap Buffer Overflow
		if (log.includes("heap-buffer-overflow")) {
			const loc = this.extractLocation(lines, targetFilePath);
			issues.push({
				kind: "heap-buffer-overflow",
				title: "🚨 Heap Buffer Overflow Detected",
				message:
					"Memory access exceeded the boundary of a dynamically allocated heap block (malloc/calloc).",
				recommendation:
					"Verify loop index bounds (e.g., `i < n` instead of `i <= n`) and ensure your malloc size includes all needed elements.",
				filePath: loc?.filePath,
				line: loc?.line,
				column: loc?.column,
				rawLog: log,
			});
		}

		// 2. Check Stack Buffer Overflow
		else if (log.includes("stack-buffer-overflow")) {
			const loc = this.extractLocation(lines, targetFilePath);
			issues.push({
				kind: "stack-buffer-overflow",
				title: "🚨 Stack Buffer Overflow Detected",
				message: "Array index out of bounds on a local stack array variable.",
				recommendation:
					"Ensure array indexing does not write beyond `array_size - 1` and beware of off-by-one errors.",
				filePath: loc?.filePath,
				line: loc?.line,
				column: loc?.column,
				rawLog: log,
			});
		}

		// 3. Check Use After Free
		else if (log.includes("heap-use-after-free")) {
			const loc = this.extractLocation(lines, targetFilePath);
			issues.push({
				kind: "use-after-free",
				title: "🚨 Use-After-Free Memory Violation",
				message: "A pointer was dereferenced or read after its target memory was released with free().",
				recommendation:
					"Immediately assign pointer to NULL after calling free (`ptr = NULL;`) to avoid dangling pointer usage.",
				filePath: loc?.filePath,
				line: loc?.line,
				column: loc?.column,
				rawLog: log,
			});
		}

		// 4. Check Double Free
		else if (log.includes("attempting double-free")) {
			const loc = this.extractLocation(lines, targetFilePath);
			issues.push({
				kind: "double-free",
				title: "🚨 Double-Free Vulnerability",
				message: "free() was invoked multiple times on the exact same heap memory address.",
				recommendation:
					"Ensure ownership of dynamically allocated memory is unambiguous, and reset freed pointers to NULL.",
				filePath: loc?.filePath,
				line: loc?.line,
				column: loc?.column,
				rawLog: log,
			});
		}

		// 5. Check NULL Pointer Dereference (UBSan or SEGV)
		else if (
			log.includes("null pointer dereference") ||
			log.includes("SEGV on unknown address 0x000000000000") ||
			log.includes("SEGV on unknown address 0x00000000")
		) {
			const loc = this.extractLocation(lines, targetFilePath);
			issues.push({
				kind: "null-dereference",
				title: "🚨 NULL Pointer Dereference",
				message: "Attempted to dereference (`*ptr` or `ptr->member`) a pointer that currently holds NULL.",
				recommendation: "Always add a NULL check `if (ptr == NULL) return ...;` before dereferencing pointers.",
				filePath: loc?.filePath,
				line: loc?.line,
				column: loc?.column,
				rawLog: log,
			});
		}

		// 6. Check Signed Integer Overflow (UBSan)
		else if (log.includes("signed integer overflow")) {
			const loc = this.extractLocation(lines, targetFilePath);
			issues.push({
				kind: "integer-overflow",
				title: "⚠️ Signed Integer Overflow",
				message: "Arithmetic computation exceeded the 32-bit signed integer capacity (INT_MAX / INT_MIN).",
				recommendation:
					"Use 64-bit integer types (`long long` or `int64_t`) or check for overflow before performing the operation.",
				filePath: loc?.filePath,
				line: loc?.line,
				column: loc?.column,
				rawLog: log,
			});
		}

		// 7. Check Shift Out of Bounds
		else if (log.includes("shift exponent")) {
			const loc = this.extractLocation(lines, targetFilePath);
			issues.push({
				kind: "shift-out-of-bounds",
				title: "⚠️ Bitwise Shift Out of Bounds",
				message: "Bitwise shift count is negative or greater than or equal to the width of the value.",
				recommendation: "Ensure bit shift amount is in range `0 <= shift < width` (e.g. `< 32` for `int`).",
				filePath: loc?.filePath,
				line: loc?.line,
				column: loc?.column,
				rawLog: log,
			});
		}

		return issues;
	}

	private static extractLocation(
		lines: string[],
		targetFilePath?: string
	): { filePath?: string; line?: number; column?: number } | null {
		const targetBase = targetFilePath ? path.basename(targetFilePath) : "";

		for (const l of lines) {
			// Matches: #0 0x... in main /path/to/file.c:42:10 or (/path/to/file.c:42)
			const stackMatch = /([a-zA-Z0-9_\-\\/.]+\.[a-zA-Z0-9]+):(\d+)(?::(\d+))?/.exec(l);
			if (stackMatch) {
				const fileCandidate = stackMatch[1];
				const lineNum = parseInt(stackMatch[2], 10);
				const colNum = stackMatch[3] ? parseInt(stackMatch[3], 10) : 1;

				if (!targetBase || fileCandidate.includes(targetBase)) {
					return {
						filePath: targetFilePath || fileCandidate,
						line: lineNum,
						column: colNum,
					};
				}
			}
		}

		return null;
	}
}

export class SanitizerRunner {
	private static diagnosticCollection: vscode.DiagnosticCollection | null = null;
	private static logger = defaultLogger.child("SanitizerRunner");

	public static init(context: vscode.ExtensionContext): void {
		this.diagnosticCollection = vscode.languages.createDiagnosticCollection("dtyp-sanitizer");
		context.subscriptions.push(this.diagnosticCollection);
	}

	public static async runSanitizer(doc?: vscode.TextDocument): Promise<void> {
		const document = doc ?? vscode.window.activeTextEditor?.document;
		if (!document) {
			vscode.window.showWarningMessage("dTyp: Open a C/C++ file to run AddressSanitizer.");
			return;
		}

		if (document.isDirty) {
			await document.save();
		}

		const filePath = document.uri.fsPath;
		const isCpp = document.languageId === "cpp" || filePath.endsWith(".cpp");
		const compiler = isCpp ? "g++" : "gcc";
		const stdFlag = isCpp ? "-std=c++17" : "-std=c11";

		const tempDir = os.tmpdir();
		const binaryName = `dtyp_asan_${Date.now()}${process.platform === "win32" ? ".exe" : ""}`;
		const binaryPath = path.join(tempDir, binaryName);

		vscode.window.setStatusBarMessage("$(shield) dTyp: Compiling with AddressSanitizer & UB Guard...", 3000);

		// Compile with ASan and UBSan flags
		const compileArgs = [
			"-fsanitize=address,undefined",
			"-fno-omit-frame-pointer",
			"-g",
			"-O1",
			stdFlag,
			filePath,
			"-o",
			binaryPath,
		];

		const compileResult = await new Promise<{ code: number; stderr: string }>((resolve) => {
			const child = spawn(compiler, compileArgs);
			let stderr = "";
			child.stderr.on("data", (data) => (stderr += data.toString()));
			child.on("close", (code) => resolve({ code: code ?? 1, stderr }));
			child.on("error", (err) => resolve({ code: 1, stderr: err.message }));
		});

		if (compileResult.code !== 0) {
			vscode.window.showErrorMessage(
				`dTyp: AddressSanitizer compilation failed:\n${compileResult.stderr}`
			);
			return;
		}

		// Run binary and monitor for memory / undefined behavior faults
		vscode.window.setStatusBarMessage("$(shield) dTyp: Running memory & UB diagnostics...", 2500);

		const runResult = await new Promise<{ code: number; stdout: string; stderr: string }>((resolve) => {
			let child: any = null;
			let stdout = "";
			let stderr = "";

			const timer = setTimeout(() => {
				if (child) child.kill("SIGKILL");
			}, 3000);

			child = spawn(binaryPath);
			child.stdout.on("data", (data: any) => (stdout += data.toString()));
			child.stderr.on("data", (data: any) => (stderr += data.toString()));

			child.on("close", (code: number | null) => {
				clearTimeout(timer);
				resolve({ code: code ?? 0, stdout, stderr });
			});

			child.on("error", (err: any) => {
				clearTimeout(timer);
				resolve({ code: 1, stdout, stderr: err.message });
			});
		});

		// Cleanup binary
		try {
			if (fs.existsSync(binaryPath)) fs.unlinkSync(binaryPath);
		} catch {}

		// Clear previous sanitizer diagnostics
		if (this.diagnosticCollection) {
			this.diagnosticCollection.delete(document.uri);
		}

		const combinedOutput = `${runResult.stdout}\n${runResult.stderr}`;
		const issues = AddressSanitizerParser.parse(combinedOutput, filePath);

		if (issues.length === 0) {
			vscode.window.showInformationMessage(
				"🛡️ dTyp Guard: 0 Memory Leaks, Buffer Overflows, or Undefined Behaviors detected! Clean execution. ★"
			);
			return;
		}

		// Add diagnostics to VS Code editor
		const diagnostics: vscode.Diagnostic[] = [];
		for (const issue of issues) {
			const line = Math.max(0, (issue.line ?? 1) - 1);
			const col = Math.max(0, (issue.column ?? 1) - 1);
			const range = new vscode.Range(new vscode.Position(line, col), new vscode.Position(line, col + 10));

			const diag = new vscode.Diagnostic(
				range,
				`${issue.title}\n${issue.message}\n💡 Recommendation: ${issue.recommendation}`,
				vscode.DiagnosticSeverity.Error
			);
			diag.source = "dTyp ASan/UBSan Guard";
			diagnostics.push(diag);
		}

		if (this.diagnosticCollection) {
			this.diagnosticCollection.set(document.uri, diagnostics);
		}

		// Show first issue to user
		const first = issues[0];
		vscode.window.showErrorMessage(
			`${first.title} at line ${first.line ?? "?"}: ${first.message}\n💡 ${first.recommendation}`,
			"View In Terminal"
		).then((action) => {
			if (action === "View In Terminal") {
				const term = vscode.window.createTerminal("dTyp Sanitizer Trace");
				term.show();
				term.sendText(`echo "${combinedOutput.replace(/"/g, '\\"')}"`);
			}
		});
	}
}
