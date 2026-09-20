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
import {
  CStructuralDecomposer,
  NonlinearAuthoringPlanner,
  StructuralTokenizer,
  HumanCadence,
} from "@dtyp/typing-engine";
import { VSCodeTypingTarget } from "../../apps/vscode/src/adapter/vscode-typing-target.js";
import { AutoTypeEngine } from "../../apps/vscode/src/engine/auto-type-engine.js";

describe("Enhanced Humanized & Non-Sequential Typing Engine", () => {
  describe("1. Smart Block Auto-Expansion (enter_block)", () => {
    it("emits enter_block when '{' is followed by a newline", () => {
      const tokenizer = new StructuralTokenizer({
        model: "humanized",
        baseDelayMs: 15,
        enableTypoSimulation: false,
      });

      const code = `int main(void) {\n    return 0;\n}`;
      const actions = tokenizer.tokenizeLinear(code);

      const braceAction = actions.find((a) => a.char === "{" && a.type === "type");
      expect(braceAction).toBeDefined();
      expect(braceAction?.autoClose).toBe("}");

      const enterBlockAction = actions.find((a) => a.type === "enter_block");
      expect(enterBlockAction).toBeDefined();
      expect(enterBlockAction?.baseIndent).toBe("");
      expect(enterBlockAction?.blockIndent).toBe("\t");

      // Closing brace should be an overtype
      const overtypeBrace = actions.find((a) => a.type === "overtype" && a.char === "}");
      expect(overtypeBrace).toBeDefined();
    });

    it("does NOT emit enter_block for inline braces like array initializers", () => {
      const tokenizer = new StructuralTokenizer({
        model: "humanized",
        baseDelayMs: 15,
        enableTypoSimulation: false,
      });

      const code = `int arr[3] = {1, 2, 3};`;
      const actions = tokenizer.tokenizeLinear(code);

      const enterBlockAction = actions.find((a) => a.type === "enter_block");
      expect(enterBlockAction).toBeUndefined();

      const braceAction = actions.find((a) => a.char === "{" && a.type === "type");
      expect(braceAction).toBeDefined();
      expect(braceAction?.autoClose).toBe("}");
    });

    it("executes enterBlock in VSCodeTypingTarget to produce 3-line scaffold with tab indentation", async () => {
      let lines = ["int main(void) {}"];
      let activePos = new (vscode.Position as any)(0, 16); // between { and }

      const mockEditor: any = {
        document: {
          uri: { toString: () => "file:///test.c" },
          get lineCount() {
            return lines.length;
          },
          lineAt: (l: number) => ({ text: lines[l] }),
        },
        get selection() {
          return new (vscode.Selection as any)(activePos, activePos);
        },
        set selection(s: any) {
          activePos = s.active;
        },
        edit: vi.fn(async (callback: any) => {
          const editBuilder = {
            insert: (pos: any, text: string) => {
              const currentLine = lines[pos.line];
              const before = currentLine.slice(0, pos.character);
              const after = currentLine.slice(pos.character);
              const fullInserted = before + text + after;
              const newLines = fullInserted.split("\n");
              lines.splice(pos.line, 1, ...newLines);
            },
          };
          callback(editBuilder);
        }),
      };

      const target = new VSCodeTypingTarget(mockEditor);
      target.resetHead(activePos);

      await target.enterBlock("", "\t");

      // Verify that 3 lines are created:
      // Line 0: int main(void) {
      // Line 1: \t
      // Line 2: }
      expect(lines.length).toBe(3);
      expect(lines[0]).toBe("int main(void) {");
      expect(lines[1]).toBe("\t");
      expect(lines[2]).toBe("}");

      // Cursor placed on line 1, column 1 (after 1 tab)
      expect(activePos.line).toBe(1);
      expect(activePos.character).toBe(1);
    });
  });

  describe("2. Universal Non-Sequential Coding", () => {
    it("decomposes a single function and identifies returnStatement and bodyBeforeReturn", () => {
      const singleFn = `int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}`;
      const decomposed = CStructuralDecomposer.decompose(singleFn);
      expect(decomposed.isSingleFunction).toBe(true);
      expect(decomposed.primaryFunction).toBeDefined();

      const fn = decomposed.primaryFunction!;
      expect(fn.name).toBe("fibonacci");
      expect(fn.returnStatement).toContain("return fibonacci(n - 1) + fibonacci(n - 2);");
      expect(fn.bodyBeforeReturn).toContain("if (n <= 1) return n;");
    });

    it("plans non-linear skeleton-first drafting for a single function (landmark: above_return)", () => {
      const singleFn = `int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}`;
      const decomposed = CStructuralDecomposer.decompose(singleFn);
      const steps = NonlinearAuthoringPlanner.plan(decomposed, singleFn);

      expect(steps.length).toBeGreaterThanOrEqual(2);

      // Step 1: Function skeleton with return anchor
      expect(steps[0].kind).toBe("function_scaffold");
      expect(steps[0].code).toContain("int fibonacci(int n) {");
      expect(steps[0].code).toContain("return fibonacci(n - 1) + fibonacci(n - 2);");

      // Step 2: Jump above return and type body logic
      expect(steps[1].kind).toBe("function_body");
      expect(steps[1].cursorMoveBefore?.landmark).toBe("above_return");
      expect(steps[1].code).toContain("if (n <= 1) return n;");
    });

    it("scaffolds multi-function library components: entry function first, then helpers above", () => {
      const multiFn = `int gcd(int a, int b) {
    while (b) {
        int t = b;
        b = a % b;
        a = t;
    }
    return a;
}

int lcm(int a, int b) {
    return (a * b) / gcd(a, b);
}`;

      const decomposed = CStructuralDecomposer.decompose(multiFn);
      expect(decomposed.helperFunctions.length).toBe(2);

      const steps = NonlinearAuthoringPlanner.plan(decomposed, multiFn);
      expect(steps.length).toBeGreaterThanOrEqual(2);

      // Entry function lcm() scaffolded first
      expect(steps[0].kind).toBe("function_scaffold");
      expect(steps[0].code).toContain("int lcm(int a, int b) {");

      // Helper function gcd() authored above lcm()
      const helperStep = steps.find((s) => s.kind === "helper_function");
      expect(helperStep).toBeDefined();
      expect(helperStep?.code).toContain("int gcd(int a, int b)");
    });

    it("detects dynamic allocation and cleanup pairs (malloc and free)", () => {
      const allocCode = `void processData(int n) {
    int *arr = (int *)malloc(n * sizeof(int));
    for (int i = 0; i < n; i++) arr[i] = i * 2;
    free(arr);
}`;
      const decomposed = CStructuralDecomposer.decompose(allocCode);
      const fn = decomposed.helperFunctions[0];
      expect(fn.hasAllocCleanupPair).toBe(true);
      expect(fn.allocStatement).toContain("malloc(");
      expect(fn.cleanupStatement).toContain("free(arr);");
      expect(fn.bodyBetweenAlloc).toContain("for (int i = 0; i < n; i++)");
    });
  });

  describe("3. Extended Natural Human Coding Behaviors", () => {
    it("generates delayed-recognition typo sequences: typo -> overshoot -> pause -> 2x backspace -> correct -> re-type overshoot", () => {
      const cadence = new HumanCadence({
        baseDelayMs: 25,
        jitterMs: 5,
        enableTypoSimulation: true,
      });

      const delayedSeq = cadence.createDelayedTypoSequence("e", "r", "x");
      expect(delayedSeq.length).toBe(7);

      // 1: typo
      expect(delayedSeq[0]).toMatchObject({ type: "type", char: "r" });
      // 2: overshoot char
      expect(delayedSeq[1]).toMatchObject({ type: "type", char: "x" });
      // 3: delayed recognition pause
      expect(delayedSeq[2]).toMatchObject({ type: "pause" });
      // 4: backspace overshoot
      expect(delayedSeq[3]).toMatchObject({ type: "backspace" });
      // 5: backspace typo
      expect(delayedSeq[4]).toMatchObject({ type: "backspace" });
      // 6: corrected stroke
      expect(delayedSeq[5]).toMatchObject({ type: "type", char: "e" });
      // 7: re-typed overshoot char
      expect(delayedSeq[6]).toMatchObject({ type: "type", char: "x" });
    });

    it("injects comma_parameter pause after parameter commas", () => {
      const tokenizer = new StructuralTokenizer({
        model: "humanized",
        baseDelayMs: 15,
        enableTypoSimulation: false,
      });

      const code = `foo(a, b, c);`;
      const actions = tokenizer.tokenizeLinear(code);

      const commaPauses = actions.filter(
        (a) => a.type === "pause" && a.pauseKind === "comma_parameter"
      );
      expect(commaPauses.length).toBe(2);
    });

    it("injects inter_block pause between double newlines", () => {
      const tokenizer = new StructuralTokenizer({
        model: "humanized",
        baseDelayMs: 15,
        enableTypoSimulation: false,
      });

      const code = `int a = 1;\n\nint b = 2;`;
      const actions = tokenizer.tokenizeLinear(code);

      const interBlockPause = actions.find(
        (a) => a.type === "pause" && a.pauseKind === "inter_block"
      );
      expect(interBlockPause).toBeDefined();
    });

    it("applies deliberate cadence to binary operators with whitespace", () => {
      const cadence = new HumanCadence({
        baseDelayMs: 30,
        jitterMs: 0,
      });

      const plainDelay = cadence.calculateStrokeDelay("x", false);
      const operatorDelay = cadence.calculateStrokeDelay("=", false, " ");
      expect(operatorDelay).toBeGreaterThan(plainDelay);
    });
  });

  describe("4. AutoTypeEngine Execution of New Actions", () => {
    it("handles enter_block in manual stepping (stepNextCharacter)", async () => {
      const mockTarget = {
        enterBlock: vi.fn(),
        typeCharacter: vi.fn(),
        overtypeCharacter: vi.fn(),
        deleteBackward: vi.fn(),
        moveCursor: vi.fn(),
        resetHead: vi.fn(),
        setEditor: vi.fn(),
        setCursorJumpPolicy: vi.fn(),
        setPauseOnTabSwitch: vi.fn(),
        setUndoChunkSize: vi.fn(),
        getExpectedHead: vi.fn().mockReturnValue(null),
        onCursorJump: vi.fn(),
      };

      const engine = new AutoTypeEngine({ cancel: vi.fn() } as any, mockTarget as any);
      const mockEditor: any = {
        selection: { active: { line: 0, character: 0 } },
        document: { uri: { toString: () => "file:///test.c" } },
      };

      await engine.startInsertion(
        "testComp",
        "testComp",
        "int main(void) {\n    return 0;\n}",
        mockEditor,
        "manual"
      );

      // Step through all queued actions
      while (engine.getRemainingCount() > 0) {
        await engine.stepNextCharacter(mockEditor);
      }

      expect(mockTarget.enterBlock).toHaveBeenCalledWith("", "\t");
      expect(mockTarget.overtypeCharacter).toHaveBeenCalledWith("}");
    });
  });
});
