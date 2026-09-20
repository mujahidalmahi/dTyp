import { describe, it, expect, vi } from "vitest";

vi.mock("vscode", () => {
  class Position {
    constructor(public line: number, public character: number) {}
    isEqual(other: Position) {
      return this.line === other.line && this.character === other.character;
    }
  }
  class Range {
    constructor(public start: Position, public end: Position) {}
  }
  class CodeLens {
    constructor(public range: Range, public command?: any) {}
  }
  class Diagnostic {
    public source?: string;
    public code?: string;
    constructor(public range: Range, public message: string, public severity: any) {}
  }
  class CodeAction {
    public diagnostics?: any[];
    public isPreferred?: boolean;
    public edit?: any;
    constructor(public title: string, public kind?: any) {}
  }
  class WorkspaceEdit {
    public insert = vi.fn();
  }
  class ThemeIcon {
    constructor(public id: string) {}
  }

  return {
    Position,
    Range,
    CodeLens,
    Diagnostic,
    DiagnosticSeverity: { Error: 0, Warning: 1, Information: 2, Hint: 3 },
    CodeAction,
    CodeActionKind: { QuickFix: "QuickFix" },
    WorkspaceEdit,
    ThemeIcon,
    ViewColumn: { Beside: -2 },
    window: {
      activeTextEditor: null,
      showInformationMessage: vi.fn(),
      showWarningMessage: vi.fn(),
      showErrorMessage: vi.fn(),
      setStatusBarMessage: vi.fn(),
      createTerminal: vi.fn().mockReturnValue({
        show: vi.fn(),
        sendText: vi.fn(),
      }),
      createWebviewPanel: vi.fn().mockReturnValue({
        webview: { html: "", onDidReceiveMessage: vi.fn() },
        onDidDispose: vi.fn(),
        reveal: vi.fn(),
        dispose: vi.fn(),
      }),
    },
    workspace: {
      getConfiguration: vi.fn().mockReturnValue({
        get: (_key: string, def: any) => def,
      }),
    },
    languages: {
      createDiagnosticCollection: vi.fn().mockReturnValue({
        set: vi.fn(),
        delete: vi.fn(),
        clear: vi.fn(),
      }),
    },
  };
});

import * as vscode from "vscode";
import { CompilerRunner } from "../../apps/vscode/src/command/compiler-runner.js";
import { MemoryEngine } from "../../apps/vscode/src/engine/memory-engine.js";
import { VisualizerPanel } from "../../apps/vscode/src/view/visualizer-panel.js";
import { Component } from "@dtyp/types";

describe("Dimension 2: Academic Superpowers (Compiler Runner, Visualizer & Memory Guard)", () => {
  describe("1. CompilerRunner CodeLens", () => {
    it("provides CodeLens above main() in C files", () => {
      const runner = new CompilerRunner();
      const mockDoc: any = {
        languageId: "c",
        lineCount: 5,
        lineAt: (line: number) => {
          if (line === 2) {
            return { text: "int main(int argc, char *argv[]) {" };
          }
          return { text: "" };
        },
      };

      const lenses = runner.provideCodeLenses(mockDoc);
      expect(lenses).toHaveLength(1);
      expect(lenses[0].command?.command).toBe("dtyp.compileAndRun");
      expect(lenses[0].command?.title).toContain("Run with GCC");
    });

    it("provides G++ CodeLens in C++ files", () => {
      const runner = new CompilerRunner();
      const mockDoc: any = {
        languageId: "cpp",
        lineCount: 3,
        lineAt: (line: number) => {
          if (line === 1) {
            return { text: "int main() {" };
          }
          return { text: "" };
        },
      };

      const lenses = runner.provideCodeLenses(mockDoc);
      expect(lenses).toHaveLength(1);
      expect(lenses[0].command?.title).toContain("Run with G++");
    });
  });

  describe("2. MemoryEngine NULL Check Detection & QuickFix", () => {
    it("detects allocation without NULL check and marks hasNullCheck as false", () => {
      const unsafeCode = `
void test() {
    int *arr = (int*)malloc(sizeof(int) * 10);
    arr[0] = 5;
    free(arr);
}
`;
      const allocations = MemoryEngine.analyzeAllocations(unsafeCode);
      expect(allocations).toHaveLength(1);
      expect(allocations[0].variableName).toBe("arr");
      expect(allocations[0].hasMatchingFree).toBe(true);
      expect(allocations[0].hasNullCheck).toBe(false);
    });

    it("identifies safe code with NULL check and marks hasNullCheck as true", () => {
      const safeCode = `
void test() {
    int *arr = malloc(sizeof(int) * 10);
    if (arr == NULL) {
        return;
    }
    free(arr);
}
`;
      const allocations = MemoryEngine.analyzeAllocations(safeCode);
      expect(allocations).toHaveLength(1);
      expect(allocations[0].hasNullCheck).toBe(true);
    });

    it("generates QuickFix CodeAction for missing NULL check with pure tabs", () => {
      const engine = new MemoryEngine();
      const mockDoc: any = {
        uri: { toString: () => "file:///test.c" },
        lineAt: () => ({ text: "    int *ptr = malloc(100);" }),
        getText: () => "int *ptr = malloc(100);",
      };

      const diag = new (vscode.Diagnostic as any)(
        new (vscode.Range as any)(0, 0, 0, 10),
        "dTyp: Missing NULL check! Pointer 'ptr' allocated via malloc() without verifying 'ptr == NULL'.",
        vscode.DiagnosticSeverity.Information
      );
      diag.code = "dtyp.memory.null_check";

      const actions = engine.provideCodeActions(mockDoc, {} as any, {
        diagnostics: [diag],
      } as any);

      expect(actions.length).toBeGreaterThan(0);
      expect(actions[0].title).toContain("if (ptr == NULL)");
    });
  });

  describe("3. Data Structure Visualizer Panel", () => {
    it("renders tree, list, and array diagrams for components", () => {
      const treeComp: Component = {
        id: "bst_insert",
        name: "bst_insert",
        category: "data-structures",
        categoryId: "ds_tree",
        description: "Insert node into Binary Search Tree",
        code: "void bst_insert() {}",
        signature: "void bst_insert(Node** root, int val)",
        complexity: { time: "O(log n)", space: "O(1)" },
        dependencies: [],
        path: "data-structures/tree/bst",
      };

      const panel = VisualizerPanel.show(
        { fsPath: "c:/test" } as any,
        treeComp
      );

      expect(panel).toBeDefined();
      panel.dispose();
    });
  });
});
