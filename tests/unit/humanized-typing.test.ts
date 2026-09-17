import { describe, it, expect, vi } from "vitest";

// Mock vscode module before imports
vi.mock("vscode", () => {
  class Position {
    constructor(public line: number, public character: number) {}
    isEqual(other: Position): boolean {
      return this.line === other.line && this.character === other.character;
    }
  }

  class Selection {
    constructor(public anchor: Position, public active: Position) {}
  }

  class Range {
    constructor(public start: Position, public end: Position) {}
  }

  return {
    Position,
    Selection,
    Range,
    window: {
      activeTextEditor: null,
      showTextDocument: vi.fn(),
      showWarningMessage: vi.fn(),
      showInformationMessage: vi.fn(),
      setStatusBarMessage: vi.fn(),
    },
    workspace: {
      getConfiguration: vi.fn().mockReturnValue({
        get: (_key: string, def: any) => def,
      }),
    },
    commands: {
      executeCommand: vi.fn(),
    },
  };
});

import * as vscode from "vscode";
import { HumanCadence, StructuralTokenizer } from "@dtyp/typing-engine";
import { validateComponent } from "@dtyp/validation";
import { VSCodeTypingTarget } from "../../apps/vscode/src/adapter/vscode-typing-target.js";
import { HeaderEngine } from "../../apps/vscode/src/engine/header-engine.js";

describe("Humanized Typing Engine: Cadence & Structural Tokenization", () => {
  describe("HumanCadence", () => {
    const cadence = new HumanCadence({
      baseDelayMs: 20,
      jitterMs: 5,
      enableTypoSimulation: true,
      typoRate: 0.1,
    });

    it("identifies C keywords as burst words", () => {
      expect(cadence.isBurstWord("int")).toBe(true);
      expect(cadence.isBurstWord("return")).toBe(true);
      expect(cadence.isBurstWord("struct")).toBe(true);
      expect(cadence.isBurstWord("printf")).toBe(true);
      expect(cadence.isBurstWord("myCustomVariable")).toBe(false);
    });

    it("retrieves adjacent keys from QWERTY proximity map", () => {
      const adjacentS = cadence.getAdjacentKey("s");
      expect(adjacentS).not.toBeNull();
      expect(["a", "w", "e", "d", "x", "z"]).toContain(adjacentS);

      const adjacentUpper = cadence.getAdjacentKey("S");
      expect(adjacentUpper).not.toBeNull();
      expect(["A", "W", "E", "D", "X", "Z"]).toContain(adjacentUpper);
    });

    it("calculates faster delays during keyword bursts", () => {
      const normalDelay = cadence.calculateStrokeDelay("a", false);
      const burstDelay = cadence.calculateStrokeDelay("a", true);
      expect(burstDelay).toBeLessThanOrEqual(normalDelay * 1.2);
    });

    it("adds cognitive hesitations for structural characters", () => {
      const plainDelay = cadence.calculateStrokeDelay("x", false);
      const braceDelay = cadence.calculateStrokeDelay("{", false);
      expect(braceDelay).toBeGreaterThan(plainDelay);
    });

    it("generates realistic typo correction sequence: type -> pause -> backspace -> correct", () => {
      const typoSeq = cadence.createTypoSequence("e", "r");
      expect(typoSeq.length).toBe(4);
      expect(typoSeq[0]).toMatchObject({ type: "type", char: "r" });
      expect(typoSeq[1]).toMatchObject({ type: "pause" });
      expect(typoSeq[2]).toMatchObject({ type: "backspace" });
      expect(typoSeq[3]).toMatchObject({ type: "type", char: "e" });
    });
  });

  describe("StructuralTokenizer", () => {
    it("tokenizes C code and tags closing delimiters as overtype", () => {
      const tokenizer = new StructuralTokenizer({
        model: "humanized",
        baseDelayMs: 15,
        enableTypoSimulation: false,
      });

      const code = "int main() { return 0; }";
      const actions = tokenizer.tokenize(code);

      expect(actions.length).toBeGreaterThan(0);
      
      const overtypes = actions.filter((a) => a.type === "overtype");
      expect(overtypes.length).toBeGreaterThanOrEqual(2);
      const overtypeChars = overtypes.map((a) => a.char);
      expect(overtypeChars).toContain(")");
      expect(overtypeChars).toContain("}");
    });

    it("simulates typos when enabled with high typo rate", () => {
      const tokenizer = new StructuralTokenizer({
        model: "humanized",
        baseDelayMs: 15,
        enableTypoSimulation: true,
        typoRate: 1.0,
      });

      const code = "abc";
      const actions = tokenizer.tokenize(code);

      const backspaces = actions.filter((a) => a.type === "backspace");
      expect(backspaces.length).toBeGreaterThan(0);
    });
  });

  describe("VSCodeTypingTarget Humanized Actions", () => {
    it("steps over delimiter when character at cursor matches", async () => {
      let docText = "}";

      const mockEditor: any = {
        document: {
          uri: { toString: () => "file:///test.c" },
          lineAt: (_line: number) => ({ text: docText }),
        },
        selection: new (vscode.Selection as any)(
          new (vscode.Position as any)(0, 0),
          new (vscode.Position as any)(0, 0)
        ),
        edit: vi.fn(async (callback: any) => {
          const editBuilder = {
            insert: (pos: any, char: string) => {
              docText = docText.slice(0, pos.character) + char + docText.slice(pos.character);
            },
            delete: (range: any) => {
              docText = docText.slice(0, range.start.character) + docText.slice(range.end.character);
            },
          };
          callback(editBuilder);
        }),
      };

      const target = new VSCodeTypingTarget(mockEditor);
      target.resetHead(new (vscode.Position as any)(0, 0));

      await target.overtypeCharacter("}");

      expect(mockEditor.selection.active.character).toBe(1);
      expect(docText).toBe("}");
      expect(mockEditor.edit).not.toHaveBeenCalled();
    });

    it("performs backward deletion on deleteBackward", async () => {
      let docText = "hello";

      const mockEditor: any = {
        document: {
          uri: { toString: () => "file:///test.c" },
          lineAt: (_line: number) => ({ text: docText }),
        },
        selection: new (vscode.Selection as any)(
          new (vscode.Position as any)(0, 5),
          new (vscode.Position as any)(0, 5)
        ),
        edit: vi.fn(async (callback: any) => {
          const editBuilder = {
            delete: (range: any) => {
              docText = docText.slice(0, range.start.character) + docText.slice(range.end.character);
            },
          };
          callback(editBuilder);
        }),
      };

      const target = new VSCodeTypingTarget(mockEditor);
      await target.deleteBackward();

      expect(mockEditor.edit).toHaveBeenCalled();
      expect(docText).toBe("hell");
    });
  });

  describe("Auto-Closing Pairs & Cadence Realism", () => {
    it("tags opening delimiters with matching autoClose property", () => {
      const tokenizer = new StructuralTokenizer({
        model: "humanized",
        baseDelayMs: 15,
        enableTypoSimulation: false,
      });

      const actions = tokenizer.tokenize("int arr[5] = {1, 2}; printf(\"hello %c\", 'x');");
      
      const parenAction = actions.find((a) => a.char === "(");
      expect(parenAction?.autoClose).toBe(")");

      const bracketAction = actions.find((a) => a.char === "[");
      expect(bracketAction?.autoClose).toBe("]");

      const braceAction = actions.find((a) => a.char === "{");
      expect(braceAction?.autoClose).toBe("}");

      const strQuoteAction = actions.find((a) => a.char === '"' && a.autoClose);
      expect(strQuoteAction?.autoClose).toBe('"');

      const charQuoteAction = actions.find((a) => a.char === "'" && a.autoClose);
      expect(charQuoteAction?.autoClose).toBe("'");

      // Verify matching closing delimiters are tagged as overtypes
      const overtypes = actions.filter((a) => a.type === "overtype");
      const overtypeChars = overtypes.map((a) => a.char);
      expect(overtypeChars).toContain("]");
      expect(overtypeChars).toContain("}");
      expect(overtypeChars).toContain(")");
      expect(overtypeChars).toContain('"');
      expect(overtypeChars).toContain("'");
    });
  });

  describe("C Syntax Validator: Comment-Awareness", () => {
    it("validates C code containing braces and parens inside comments", () => {
      const validCodeWithComments = `
        // Check condition: if (x > 0) { do something
        /* Multi-line comment with unclosed brace { and paren ( */
        void myFunction() {
            int a = 1;
        }
      `;
      const result = validateComponent({
        id: "core.myFunction",
        name: "myFunction",
        category: "core",
        signature: "void myFunction()",
        code: validCodeWithComments,
        complexity: { time: "O(1)", space: "O(1)" },
        dependencies: [],
      });

      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  describe("HeaderEngine: Duplicate Prevention", () => {
    it("does NOT flag headers as missing if codeToInsert already includes them", () => {
      const fullProgram = `#include <stdio.h>\n#include <stdlib.h>\nint main() { printf("Hello\\n"); return 0; }`;
      const missing = HeaderEngine.getMissingHeaders("", fullProgram);
      expect(missing).toHaveLength(0);
    });

    it("flags headers as missing when code uses stdio functions without including stdio.h", () => {
      const snippet = `int test() { printf("test"); return 0; }`;
      const missing = HeaderEngine.getMissingHeaders("", snippet);
      expect(missing).toContain("stdio.h");
    });
  });
});
