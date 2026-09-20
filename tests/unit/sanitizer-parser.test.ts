import { describe, it, expect, vi } from "vitest";

vi.mock("vscode", () => {
	return {
		languages: {
			createDiagnosticCollection: vi.fn().mockReturnValue({
				set: vi.fn(),
				delete: vi.fn(),
				dispose: vi.fn(),
			}),
		},
		window: {
			showErrorMessage: vi.fn().mockResolvedValue(undefined),
			showInformationMessage: vi.fn().mockResolvedValue(undefined),
			showWarningMessage: vi.fn().mockResolvedValue(undefined),
			setStatusBarMessage: vi.fn(),
			createTerminal: vi.fn(),
		},
		Diagnostic: class {
			constructor(public range: any, public message: string, public severity: any) {}
		},
		DiagnosticSeverity: { Error: 0, Warning: 1, Information: 2, Hint: 3 },
		Position: class { constructor(public line: number, public character: number) {} },
		Range: class { constructor(public start: any, public end: any) {} },
	};
});

import { AddressSanitizerParser } from "../../apps/vscode/src/command/sanitizer-runner.js";

describe("AddressSanitizer & UB Guard Parser", () => {
	it("parses heap-buffer-overflow trace and provides educational recommendation", () => {
		const rawLog = `
=================================================================
==19420==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x602000000028 at pc 0x0001048b2d28 bp 0x7ffee35489f0 sp 0x7ffee35489e8
READ of size 4 at 0x602000000028 thread T0
    #0 0x1048b2d27 in main /Users/student/cs101/arrays.c:24:9
    #1 0x7fff6ec30cc8 in start (libdyld.dylib:x86_64+0x1acc8)
=================================================================
`;

		const issues = AddressSanitizerParser.parse(rawLog, "arrays.c");
		expect(issues.length).toBe(1);
		expect(issues[0].kind).toBe("heap-buffer-overflow");
		expect(issues[0].title).toContain("Heap Buffer Overflow");
		expect(issues[0].line).toBe(24);
		expect(issues[0].column).toBe(9);
		expect(issues[0].recommendation).toContain("Verify loop index bounds");
	});

	it("parses use-after-free violation accurately", () => {
		const rawLog = `
=================================================================
==8812==ERROR: AddressSanitizer: heap-use-after-free on address 0x602000000010 at pc 0x0001048a1b24
READ of size 4 at 0x602000000010 thread T0
    #0 0x1048a1b23 in free_and_read /workspace/dangling.c:16:12
=================================================================
`;

		const issues = AddressSanitizerParser.parse(rawLog, "dangling.c");
		expect(issues.length).toBe(1);
		expect(issues[0].kind).toBe("use-after-free");
		expect(issues[0].line).toBe(16);
		expect(issues[0].recommendation).toContain("Immediately assign pointer to NULL");
	});

	it("parses UBSan null pointer dereference runtime error", () => {
		const rawLog = `
/home/runner/solution.c:12:5: runtime error: null pointer dereference
SUMMARY: UndefinedBehaviorSanitizer: undefined-behavior /home/runner/solution.c:12:5 in
`;

		const issues = AddressSanitizerParser.parse(rawLog, "solution.c");
		expect(issues.length).toBe(1);
		expect(issues[0].kind).toBe("null-dereference");
		expect(issues[0].line).toBe(12);
		expect(issues[0].recommendation).toContain("NULL check");
	});

	it("parses UBSan signed integer overflow", () => {
		const rawLog = `
math.c:45:10: runtime error: signed integer overflow: 2147483647 + 1 cannot be represented in type 'int'
`;

		const issues = AddressSanitizerParser.parse(rawLog, "math.c");
		expect(issues.length).toBe(1);
		expect(issues[0].kind).toBe("integer-overflow");
		expect(issues[0].line).toBe(45);
		expect(issues[0].recommendation).toContain("long long");
	});

	it("returns empty array for clean execution log", () => {
		const rawLog = "Program exited normally with return code 0.\nOutputs matched.";
		const issues = AddressSanitizerParser.parse(rawLog);
		expect(issues.length).toBe(0);
	});
});
