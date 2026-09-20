import { describe, it, expect, vi } from "vitest";

vi.mock("vscode", () => ({
	DiagnosticSeverity: { Error: 0, Warning: 1, Information: 2, Hint: 3 },
	Diagnostic: class {
		constructor(public range: any, public message: string, public severity: any) {}
	},
	Position: class { constructor(public line: number, public character: number) {} },
	Range: class { constructor(public start: any, public end: any) {} },
	languages: {
		createDiagnosticCollection: vi.fn().mockReturnValue({ set: vi.fn(), delete: vi.fn() }),
	},
	window: {
		activeTextEditor: null,
		showWarningMessage: vi.fn(),
		setStatusBarMessage: vi.fn(),
	},
	CodeAction: class { constructor(public title: string, public kind: any) {} },
	CodeActionKind: { QuickFix: "quickfix" },
	WorkspaceEdit: class { replace = vi.fn(); },
}));

import { AcademicFormatter, CodeDoctorAnalyzer } from "../../apps/vscode/src/command/code-doctor.js";

describe("Academic Code Formatter & Code Doctor", () => {
	it("formats mixed spaces and tabs to strictly pure tabs ('\\t')", () => {
		const messyC = `
#include <stdio.h>

int add(int a, int b) {
    int sum=a+b;
        return sum;
}
`;
		const formatted = AcademicFormatter.format(messyC, "kr");

		// All indented lines must start with pure tabs '\t'
		const lines = formatted.split("\n");
		const indented = lines.filter((l) => l.startsWith("\t"));
		expect(indented.length).toBeGreaterThanOrEqual(2);

		// Must not have 4-space indentation anywhere
		const spaceIndented = lines.filter((l) => l.startsWith("    "));
		expect(spaceIndented.length).toBe(0);

		// Binary operators formatted with single spaces
		expect(formatted).toContain("int sum = a + b;");
	});

	it("detects uninitialized pointer variables", () => {
		const code = `
#include <stdio.h>

void test() {
	int* my_ptr;
	printf("hello\\n");
}
`;
		const issues = CodeDoctorAnalyzer.audit(code);
		const uninit = issues.filter((i) => i.kind === "uninitialized-pointer");
		expect(uninit.length).toBe(1);
		expect(uninit[0].title).toContain("Uninitialized Pointer 'my_ptr'");
		expect(uninit[0].recommendation).toContain("int* my_ptr = NULL;");
	});

	it("detects missing return in non-void function", () => {
		const code = `
int calculate(int x) {
	int y = x * 2;
}
`;
		const issues = CodeDoctorAnalyzer.audit(code);
		const missingReturn = issues.filter((i) => i.kind === "missing-return");
		expect(missingReturn.length).toBe(1);
		expect(missingReturn[0].title).toContain("Missing return in 'calculate()'");
	});

	it("detects unreachable dead code following return statement", () => {
		const code = `
int solve() {
	return 42;
	printf("This will never print!\\n");
}
`;
		const issues = CodeDoctorAnalyzer.audit(code);
		const deadCode = issues.filter((i) => i.kind === "unreachable-code");
		expect(deadCode.length).toBe(1);
		expect(deadCode[0].title).toContain("Unreachable Statement");
	});
});
