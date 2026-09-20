import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("vscode", () => {
  class Position {
    constructor(public line: number, public character: number) {}
    isEqual(other: Position) {
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
      showInformationMessage: vi.fn(),
      showWarningMessage: vi.fn(),
      showErrorMessage: vi.fn(),
      setStatusBarMessage: vi.fn(),
      showQuickPick: vi.fn(),
      showTextDocument: vi.fn(),
    },
    workspace: {
      getConfiguration: vi.fn().mockReturnValue({
        get: (_key: string, def: any) => def,
      }),
      openTextDocument: vi.fn(),
    },
    commands: {
      executeCommand: vi.fn(),
    },
    Uri: {
      parse: (str: string) => ({ toString: () => str }),
    },
  };
});

import * as vscode from "vscode";
import { StructuralTokenizer } from "@dtyp/typing-engine";
import { CStructuralDecomposer } from "@dtyp/typing-engine";
import { NonlinearAuthoringPlanner } from "@dtyp/typing-engine";
import { VSCodeTypingTarget } from "../../apps/vscode/src/adapter/vscode-typing-target.js";
import { AutoTypeEngine } from "../../apps/vscode/src/engine/auto-type-engine.js";
import { RenewEngine } from "../../apps/vscode/src/engine/renew-engine.js";
import { DefaultTypingEngine } from "@dtyp/typing-engine";
import { SessionEngine } from "../../apps/vscode/src/engine/session-engine.js";
import { SearchEngine } from "../../apps/vscode/src/engine/search-engine.js";
import { SnippetEngine } from "../../apps/vscode/src/engine/snippet-engine.js";

describe("Cursor Memory & Tabs-Only Indentation", () => {
  describe("1. Tabs-Only Indentation Invariant", () => {
    it("ensures tokenizer only emits tabs for leading indentation across all lines", () => {
      const tokenizer = new StructuralTokenizer({
        model: "linear",
        baseDelayMs: 10,
      });

      const cCode = `int compute(int x) {\n    int a = 1;\n        int b = 2;\n    return a + b;\n}`;
      const actions = tokenizer.tokenizeLinear(cCode);

      // Verify that after every newline, indentation characters are '\t' and never ' '
      for (let i = 0; i < actions.length; i++) {
        if (actions[i].char === "\n") {
          let j = i + 1;
          while (j < actions.length && (actions[j].char === "\t" || actions[j].char === " ")) {
            expect(actions[j].char).not.toBe(" ");
            expect(actions[j].char).toBe("\t");
            j++;
          }
        }
      }
    });

    it("ensures nonlinear planner scaffolds and body statements strictly use tabs", () => {
      const code = `#include <stdio.h>\n\nint main(void) {\n    printf("Hello\\n");\n    return 0;\n}`;
      const decomposed = CStructuralDecomposer.decompose(code);
      const steps = NonlinearAuthoringPlanner.plan(decomposed, code);

      for (const step of steps) {
        const lines = step.code.split("\n");
        for (const line of lines) {
          if (line.trim().length > 0) {
            const leading = line.match(/^[ \t]*/)?.[0] || "";
            // Must not contain 4 spaces for indentation
            expect(leading).not.toContain("    ");
          }
        }
      }
    });
  });

  describe("2. Resilient Cursor Memory (Realign Policy)", () => {
    it("seamlessly realigns editor selection when cursor jumps without crashing or stopping", async () => {
      let currentPos = new (vscode.Position as any)(0, 0);
      const mockEditor: any = {
        document: {
          uri: { toString: () => "file:///test.c" },
          lineAt: () => ({ text: "abc" }),
        },
        get selection() {
          return new (vscode.Selection as any)(currentPos, currentPos);
        },
        set selection(s: any) {
          currentPos = s.active;
        },
        edit: vi.fn(async (cb: any) => {
          cb({ insert: vi.fn() });
        }),
      };

      const target = new VSCodeTypingTarget(mockEditor);
      target.setCursorJumpPolicy("realign");
      target.resetHead(currentPos);

      // Type first character at (0, 0) -> next expected head is (0, 1)
      await target.typeCharacter("a");
      expect(target.getExpectedHead()?.character).toBe(1);

      // User manually moves cursor away to line 5, col 10
      currentPos = new (vscode.Position as any)(5, 10);
      expect(mockEditor.selection.active.line).toBe(5);

      // Typing next character should NOT throw; it must realign to expected head (0, 1)
      await target.typeCharacter("b");
      expect(target.getExpectedHead()?.character).toBe(2);
      expect(mockEditor.selection.active.line).toBe(0);
      expect(mockEditor.selection.active.character).toBe(2);
    });

    it("resets all target state cleanly when resetTarget() is called", () => {
      const target = new VSCodeTypingTarget();
      target.resetHead(new (vscode.Position as any)(1, 5));
      expect(target.getExpectedHead()).not.toBeNull();

      target.resetTarget();
      expect(target.getExpectedHead()).toBeNull();
    });
  });

  describe("3. Unblocking Stop & Renew Under Any Conditions", () => {
    it("cancels all state and clears locks cleanly on autoTypeEngine.cancel()", () => {
      const target = new VSCodeTypingTarget();
      const typingEngine = new DefaultTypingEngine(target);
      const autoTypeEngine = new AutoTypeEngine(typingEngine, target);

      autoTypeEngine.pause();
      expect(autoTypeEngine.isPaused()).toBe(true);

      autoTypeEngine.cancel();
      expect(autoTypeEngine.isPaused()).toBe(false);
      expect(autoTypeEngine.isTyping()).toBe(false);
      expect(target.getExpectedHead()).toBeNull();
    });

    it("renewQueue unblocks paused or stuck sessions and restarts from character 0", async () => {
      const target = new VSCodeTypingTarget();
      const typingEngine = new DefaultTypingEngine(target);
      const autoTypeEngine = new AutoTypeEngine(typingEngine, target);

      const mockContext: any = {
        globalState: { get: vi.fn().mockReturnValue([]), update: vi.fn() },
      };
      const sessionEngine = new SessionEngine(mockContext);
      const mockLibraryEngine: any = {
        search: vi.fn().mockResolvedValue([]),
        getSnippets: vi.fn().mockResolvedValue([]),
        findComponent: vi.fn(),
        getAllComponents: vi.fn().mockResolvedValue([]),
      };
      const searchEngine = new SearchEngine(mockLibraryEngine);
      const snippetEngine = new SnippetEngine(mockLibraryEngine);

      const renewEngine = new RenewEngine(
        autoTypeEngine,
        target,
        sessionEngine,
        mockLibraryEngine,
        searchEngine,
        snippetEngine
      );

      const mockEditor: any = {
        document: { uri: { toString: () => "file:///test.c" }, getText: () => "" },
        selection: { active: new (vscode.Position as any)(0, 0) },
      };

      // Start manual queue and pause it
      await autoTypeEngine.startInsertion("c_sort", "sort", "int x = 1;", mockEditor, "manual");
      autoTypeEngine.pause();
      expect(autoTypeEngine.isPaused()).toBe(true);

      const queue = autoTypeEngine.getActiveQueue();
      queue!.currentIndex = 5;

      // Renew queue should unblock, reset index to 0, and step
      const renewed = await renewEngine.renewQueue();
      expect(renewed).toBe(true);
      expect(queue!.currentIndex).toBe(0);
    });
  });
});
