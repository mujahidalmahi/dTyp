import { describe, it, expect, vi } from "vitest";
import * as path from "node:path";
import * as fs from "node:fs";
import * as os from "node:os";

vi.mock("vscode", () => {
	class MarkdownString {
		public value = "";
		public isTrusted = false;
		public supportHtml = false;
		appendMarkdown(str: string) {
			this.value += str;
		}
		appendCodeblock(code: string, _lang?: string) {
			this.value += "\n```c\n" + code + "\n```\n";
		}
	}

	class Hover {
		constructor(public contents: MarkdownString, public range?: any) {}
	}

	class Position {
		constructor(public line: number, public character: number) {}
	}

	class Range {
		constructor(public start: Position, public end: Position) {}
	}

	return {
		MarkdownString,
		Hover,
		Position,
		Range,
		workspace: {
			workspaceFolders: [],
		},
		Uri: {
			file: (f: string) => ({ fsPath: f, toString: () => `file://${f}` }),
		},
	};
});

import * as vscode from "vscode";
import { DTypHoverProvider } from "../../apps/vscode/src/provider/hover-provider.js";

describe("Scrollable Full Code Hover Provider", () => {
	it("returns full scrollable code implementation when hovering over a component", async () => {
		const mockLibraryEngine: any = {
			search: vi.fn().mockResolvedValue([
				{
					id: "quick_sort",
					name: "quick_sort",
					description: "O(N log N) divide-and-conquer sorting algorithm.",
					signature: "void quick_sort(int arr[], int low, int high);",
					code: "void quick_sort(int arr[], int low, int high) {\n\tif (low < high) {\n\t\tint pi = partition(arr, low, high);\n\t\tquick_sort(arr, low, pi - 1);\n\t\tquick_sort(arr, pi + 1, high);\n\t}\n}",
					category: "algorithms",
					complexity: { time: "O(N log N)", space: "O(log N)" },
					dependencies: ["partition"],
				},
			]),
		};

		const provider = new DTypHoverProvider(mockLibraryEngine);

		const mockDoc: any = {
			lineAt: vi.fn().mockReturnValue({ text: "    quick_sort(data, 0, n - 1);" }),
			getWordRangeAtPosition: vi.fn().mockReturnValue(new (vscode as any).Range(new (vscode as any).Position(0, 4), new (vscode as any).Position(0, 14))),
			getText: vi.fn().mockReturnValue("quick_sort"),
			uri: { fsPath: "c:/test/main.c" },
		};

		const hover = await provider.provideHover(mockDoc, new (vscode as any).Position(0, 8), {} as any);
		expect(hover).toBeDefined();
		expect((hover?.contents as any).value).toContain("Scrollable Full Implementation Code:");
		expect((hover?.contents as any).value).toContain("void quick_sort(int arr[], int low, int high)");
		expect((hover?.contents as any).value).toContain("partition(arr, low, high)");
		expect((hover?.contents as any).value).toContain("**Time Complexity**: `O(N log N)`");
	});

	it("returns full file contents when hovering over #include \"module.h\"", async () => {
		const tempDir = os.tmpdir();
		const headerPath = path.join(tempDir, "test_module.h");
		fs.writeFileSync(headerPath, "#ifndef TEST_MODULE_H\n#define TEST_MODULE_H\nint add(int a, int b);\n#endif\n", "utf8");

		const mockLibraryEngine: any = {
			search: vi.fn().mockResolvedValue([]),
		};

		const provider = new DTypHoverProvider(mockLibraryEngine);

		const mockDoc: any = {
			lineAt: vi.fn().mockReturnValue({ text: `#include "${path.basename(headerPath)}"` }),
			getWordRangeAtPosition: vi.fn().mockReturnValue(null),
			uri: { fsPath: path.join(tempDir, "main.c") },
		};

		const hover = await provider.provideHover(mockDoc, new (vscode as any).Position(0, 12), {} as any);
		expect(hover).toBeDefined();
		expect((hover?.contents as any).value).toContain("Scrollable Full File Preview:");
		expect((hover?.contents as any).value).toContain("int add(int a, int b);");

		// Clean up
		fs.unlinkSync(headerPath);
	});

	it("returns standard library summary and declarations when hovering over <stdio.h>", async () => {
		const mockLibraryEngine: any = {
			search: vi.fn().mockResolvedValue([]),
		};

		const provider = new DTypHoverProvider(mockLibraryEngine);

		const mockDoc: any = {
			lineAt: vi.fn().mockReturnValue({ text: "#include <stdio.h>" }),
			getWordRangeAtPosition: vi.fn().mockReturnValue(null),
			uri: { fsPath: "c:/test/main.c" },
		};

		const hover = await provider.provideHover(mockDoc, new (vscode as any).Position(0, 12), {} as any);
		expect(hover).toBeDefined();
		expect((hover?.contents as any).value).toContain("Standard C Header: `<stdio.h>`");
		expect((hover?.contents as any).value).toContain("printf");
	});
});
