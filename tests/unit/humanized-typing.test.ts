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
import { VSCodeTypingTarget } from "../../apps/vscode/src/adapter/vscode-typing-target.js";

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
});
