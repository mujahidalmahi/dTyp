import * as vscode from "vscode";
import * as path from "node:path";
import * as fs from "node:fs";
import * as os from "node:os";
import { spawn } from "node:child_process";
import { defaultLogger } from "@dtyp/utilities";

export interface TestCase {
	id: string;
	name: string;
	input: string;
	expectedOutput: string;
	actualOutput?: string;
	status?: "passed" | "failed" | "tle" | "error" | "pending";
	durationMs?: number;
	exitCode?: number;
	error?: string;
}

export interface TestSuiteResult {
	total: number;
	passed: number;
	failed: number;
	cases: TestCase[];
}

export const PRESET_TEST_CASES: Record<string, TestCase[]> = {
	"Sorting & Arrays": [
		{
			id: "sort-1",
			name: "Random Array (5 Elements)",
			input: "5\n42 12 88 3 19\n",
			expectedOutput: "3 12 19 42 88",
		},
		{
			id: "sort-2",
			name: "Already Sorted Array",
			input: "4\n1 2 3 4\n",
			expectedOutput: "1 2 3 4",
		},
		{
			id: "sort-3",
			name: "Reverse Sorted Array",
			input: "4\n9 7 5 3\n",
			expectedOutput: "3 5 7 9",
		},
	],
	"Palindrome & String": [
		{
			id: "pal-1",
			name: "Simple Palindrome",
			input: "racecar\n",
			expectedOutput: "YES",
		},
		{
			id: "pal-2",
			name: "Non-Palindrome",
			input: "algorithm\n",
			expectedOutput: "NO",
		},
		{
			id: "pal-3",
			name: "Single Character",
			input: "a\n",
			expectedOutput: "YES",
		},
	],
	"Binary Search": [
		{
			id: "bs-1",
			name: "Element Present in Middle",
			input: "5\n10 20 30 40 50\n30\n",
			expectedOutput: "Found at index 2",
		},
		{
			id: "bs-2",
			name: "Element Not Present",
			input: "5\n10 20 30 40 50\n99\n",
			expectedOutput: "Not Found",
		},
	],
	"Two Sum": [
		{
			id: "ts-1",
			name: "Standard Target Pair",
			input: "4\n2 7 11 15\n9\n",
			expectedOutput: "0 1",
		},
		{
			id: "ts-2",
			name: "Negative Numbers",
			input: "3\n-3 4 3\n0\n",
			expectedOutput: "0 2",
		},
	],
	"GCD (Greatest Common Divisor)": [
		{
			id: "gcd-1",
			name: "Co-primes",
			input: "17 19\n",
			expectedOutput: "1",
		},
		{
			id: "gcd-2",
			name: "Standard Common Factors",
			input: "48 18\n",
			expectedOutput: "6",
		},
	],
};

export class TestRunner {
	private static logger = defaultLogger.child("TestRunner");

	/**
	 * Compiles source file to a temporary binary.
	 */
	public static async compile(filePath: string, isCpp: boolean): Promise<string> {
		const compiler = isCpp ? "g++" : "gcc";
		const stdFlag = isCpp ? "-std=c++17" : "-std=c11";
		const tempDir = os.tmpdir();
		const binaryName = `dtyp_test_${Date.now()}_${Math.floor(Math.random() * 10000)}${process.platform === "win32" ? ".exe" : ""}`;
		const binaryPath = path.join(tempDir, binaryName);

		const args = ["-Wall", "-Wextra", stdFlag, "-O2", filePath, "-o", binaryPath];

		return new Promise<string>((resolve, reject) => {
			const child = spawn(compiler, args);
			let stderr = "";

			child.stderr.on("data", (data) => {
				stderr += data.toString();
			});

			child.on("close", (code) => {
				if (code === 0) {
					resolve(binaryPath);
				} else {
					reject(new Error(`Compilation failed (code ${code}):\n${stderr}`));
				}
			});

			child.on("error", (err) => {
				reject(new Error(`Failed to invoke ${compiler}: ${err.message}`));
			});
		});
	}

	/**
	 * Executes a single test case with stdin piping and timeout guard.
	 */
	public static async executeTestCase(
		binaryPath: string,
		testCase: TestCase,
		timeoutMs = 2500
	): Promise<TestCase> {
		const startTime = Date.now();

		return new Promise<TestCase>((resolve) => {
			let child: any = null;
			let stdout = "";
			let stderr = "";
			let timedOut = false;

			const timer = setTimeout(() => {
				timedOut = true;
				if (child) {
					try {
						child.kill("SIGKILL");
					} catch {}
				}
			}, timeoutMs);

			try {
				child = spawn(binaryPath);
			} catch (err: any) {
				clearTimeout(timer);
				resolve({
					...testCase,
					status: "error",
					error: `Failed to spawn binary: ${err.message}`,
					durationMs: Date.now() - startTime,
				});
				return;
			}

			if (testCase.input) {
				child.stdin.write(testCase.input);
			}
			child.stdin.end();

			child.stdout.on("data", (data: any) => {
				stdout += data.toString();
			});

			child.stderr.on("data", (data: any) => {
				stderr += data.toString();
			});

			child.on("close", (code: number | null) => {
				clearTimeout(timer);
				const durationMs = Date.now() - startTime;

				if (timedOut) {
					resolve({
						...testCase,
						status: "tle",
						actualOutput: stdout,
						durationMs,
						error: `Time Limit Exceeded (${timeoutMs}ms limit)`,
					});
					return;
				}

				const normalizedActual = stdout.trim().replace(/\r\n/g, "\n");
				const normalizedExpected = testCase.expectedOutput.trim().replace(/\r\n/g, "\n");
				const passed = code === 0 && normalizedActual === normalizedExpected;

				resolve({
					...testCase,
					actualOutput: stdout.trim(),
					exitCode: code ?? 0,
					durationMs,
					status: passed ? "passed" : "failed",
					error: code !== 0 ? stderr.trim() || `Process exited with code ${code}` : undefined,
				});
			});

			child.on("error", (err: any) => {
				clearTimeout(timer);
				resolve({
					...testCase,
					status: "error",
					error: err.message,
					durationMs: Date.now() - startTime,
				});
			});
		});
	}

	/**
	 * Cleans up temporary executable safely.
	 */
	public static cleanupBinary(binaryPath: string): void {
		try {
			if (fs.existsSync(binaryPath)) {
				fs.unlinkSync(binaryPath);
			}
		} catch {}
	}
}
