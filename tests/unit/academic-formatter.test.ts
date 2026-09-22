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

	it("formats deeply nested blocks correctly with pure tabs", () => {
		const nestedCode = `
int main() {
if (x > 0) {
for (int i = 0; i < 10; i++) {
if (i % 2 == 0) {
printf("%d\\n", i);
} else {
printf("odd\\n");
}
}
}
return 0;
}
`;
		const formatted = AcademicFormatter.format(nestedCode, "kr");
		const lines = formatted.split("\n");
		expect(lines.find((l) => l.includes("printf(\"%d\\n\", i);"))).toBe("\t\t\t\tprintf(\"%d\\n\", i);");
		expect(lines.find((l) => l.includes("printf(\"odd\\n\");"))).toBe("\t\t\t\tprintf(\"odd\\n\");");
		expect(lines.find((l) => l.includes("return 0;"))).toBe("\treturn 0;");
	});

	it("formats else on new line and Allman braces", () => {
		const allmanCode = `
int main()
{
	if (x)
	{
		foo();
	}
	else if (y)
	{
		bar();
	}
	else
	{
		baz();
	}
	return 0;
}
`;
		const formatted = AcademicFormatter.format(allmanCode, "kr");
		console.log("ALLMAN TO KR:\n" + formatted);
	});

	it("formats switch case and do while correctly", () => {
		const switchCode = `
int main() {
while (1) {
switch (x) {
case 1: {
int a = 0;
break;
}
case 2:
break;
default:
break;
}
}
}
`;
		const formatted = AcademicFormatter.format(switchCode, "kr");
		console.log("SWITCH CASE FORMATTED:\n" + formatted);
	});

	it("formats nested blocks inside structs and functions", () => {
		const structCode = `
struct Outer {
int id;
struct Inner {
int sub_id;
char name[32];
} inner;
void (*handler)(void);
};
`;
		const formatted = AcademicFormatter.format(structCode, "kr");
		const lines = formatted.split("\n");
		expect(lines.find((l) => l.includes("int sub_id;"))).toBe("\t\tint sub_id;");
	});

	it("ignores braces inside string literals and comments", () => {
		const code = `
int main() {
printf("Opening brace: { and closing: }\\n");
// Note: unclosed { in comment
/* Another { unclosed } comment */
if (1) {
printf("still correctly indented\\n");
}
return 0;
}
`;
		const formatted = AcademicFormatter.format(code, "kr");
		const lines = formatted.split("\n");
		expect(lines.find((l) => l.includes("still correctly indented"))).toBe("\t\tprintf(\"still correctly indented\\n\");");
		expect(lines.find((l) => l.includes("return 0;"))).toBe("\treturn 0;");
	});

	it("formats squished braces and trailing statement braces correctly", () => {
		const squished = `
int solve() {
if (a) {
if (b) {
foo(); }}
return 0; }
`;
		const formatted = AcademicFormatter.format(squished, "kr");
		const lines = formatted.split("\n");
		expect(lines.find((l) => l.includes("foo();"))).toBe("\t\t\tfoo();");
		expect(lines.find((l) => l.includes("return 0;"))).toBe("\treturn 0;");
		// Ensure no line contains "}}}"
		expect(lines.some((l) => l.includes("}}}"))).toBe(false);
	});

	it("formats unbraced nested loops and conditionals with hierarchical indentation", () => {
		const unbraced = `
int main() {
for (int i = 0; i < n; i++)
for (int j = 0; j < m; j++)
if (i == j)
matrix[i][j] = 1;
else
matrix[i][j] = 0;
return 0;
}
`;
		const formatted = AcademicFormatter.format(unbraced, "kr");
		const lines = formatted.split("\n");
		expect(lines.find((l) => l.includes("for (int i = 0;"))).toBe("\tfor (int i = 0; i < n; i++)");
		expect(lines.find((l) => l.includes("for (int j = 0;"))).toBe("\t\tfor (int j = 0; j < m; j++)");
		expect(lines.find((l) => l.includes("if (i == j)"))).toBe("\t\t\tif (i == j)");
		expect(lines.find((l) => l.includes("matrix[i][j] = 1;"))).toBe("\t\t\t\tmatrix[i][j] = 1;");
		expect(lines.find((l) => l.includes("else"))).toBe("\t\t\telse");
		expect(lines.find((l) => l.includes("matrix[i][j] = 0;"))).toBe("\t\t\t\tmatrix[i][j] = 0;");
		expect(lines.find((l) => l.includes("return 0;"))).toBe("\treturn 0;");
	});
});
