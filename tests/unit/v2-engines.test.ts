import { describe, it, expect, vi } from "vitest";

// Mock vscode module before importing engines
vi.mock("vscode", () => ({
  Range: class Range {
    constructor(public start: any, public end: any) {}
  },
  Position: class Position {
    constructor(public line: number, public character: number) {}
  },
  Selection: class Selection {
    constructor(public start: any, public end: any) {}
  },
  TextEditorRevealType: {
    Default: 0,
    InCenter: 1,
  },
  commands: {
    executeCommand: vi.fn(),
  },
  workspace: {
    getConfiguration: vi.fn().mockReturnValue({
      get: (_key: string, def: any) => def,
    }),
  },
}));

import { MemoryEngine } from "../../apps/vscode/src/engine/memory-engine.js";
import { SearchEngine } from "../../apps/vscode/src/engine/search-engine.js";
import { AutoTypeEngine } from "../../apps/vscode/src/engine/auto-type-engine.js";
import { DefaultTypingEngine } from "@dtyp/typing-engine";
import { TypingTarget, Component, LibraryEngine } from "@dtyp/types";

class MockTypingTarget implements TypingTarget {
  public typedCharacters: string[] = [];
  async focus(): Promise<void> {}
  async typeCharacter(char: string): Promise<void> {
    this.typedCharacters.push(char);
  }
  async releaseModifiers(): Promise<void> {}
}

class MockLibraryEngine implements Partial<LibraryEngine> {
  public components: Component[] = [
    {
      id: "ds.stack.fixed_array_int_16",
      name: "Stack_fixed_array_int_16",
      language: "c",
      category: "data-structures",
      categoryId: "data-structures.stacks",
      path: "data-structures/stacks",
      description: "Fixed array stack implementation for int",
      signature: "void push(int v);",
      code: "void push(int v) {}",
      complexity: { time: "O(1)", space: "O(1)" },
      dependencies: [],
      tags: ["stack", "array"],
      version: "1.0.0",
    },
    {
      id: "algo.sort.quick_var_1",
      name: "quickSort",
      language: "c",
      category: "algorithms",
      categoryId: "algorithms.sorting",
      path: "algorithms/sorting",
      description: "In-place quick sort with Lomuto partition",
      signature: "void quickSort(int* arr, int n);",
      code: "void quickSort(int* arr, int n) {}",
      complexity: { time: "O(N log N)", space: "O(log N)" },
      dependencies: [],
      tags: ["sort", "quick"],
      version: "1.0.0",
    },
    {
      id: "boilerPlate.main.std",
      name: "StandardMain",
      language: "c",
      category: "boiler-plate",
      categoryId: "boiler-plate.main",
      path: "boiler-plate/main",
      description: "Standard C main function starter",
      signature: "int main(int argc, char* argv[])",
      code: "int main(int argc, char* argv[]) { return 0; }",
      complexity: { time: "O(1)", space: "O(1)" },
      dependencies: [],
      tags: ["main", "starter"],
      version: "1.0.0",
    },
  ];

  async search(query: string): Promise<Component[]> {
    const q = query.toLowerCase();
    return this.components.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.id.toLowerCase().includes(q)
    );
  }
}

describe("dTyp v2.0 Production Engines", () => {
  describe("MemoryEngine", () => {
    it("detects existing headers in file", () => {
      const doc = "#include <stdio.h>\n#include <stdlib.h>\nint main() {}";
      const headers = MemoryEngine.getExistingHeaders(doc);
      expect(headers.has("stdio.h")).toBe(true);
      expect(headers.has("stdlib.h")).toBe(true);
      expect(headers.has("stdbool.h")).toBe(false);
    });

    it("identifies missing headers required by inserted code", () => {
      const doc = "#include <stdio.h>\n";
      const codeToInsert = "int* ptr = (int*)malloc(sizeof(int)); bool flag = true;";
      const missing = MemoryEngine.getMissingHeaders(doc, codeToInsert);
      expect(missing).toContain("stdlib.h");
      expect(missing).toContain("stdbool.h");
      expect(missing).not.toContain("stdio.h");
    });
  });

  describe("SearchEngine", () => {
    it("ranks exact matches higher than partial matches", async () => {
      const mockEngine = new MockLibraryEngine() as unknown as LibraryEngine;
      const search = new SearchEngine(mockEngine);

      const results = await search.search("quickSort");
      expect(results.length).toBeGreaterThan(0);
      expect(results[0].component.name).toBe("quickSort");
      expect(results[0].score).toBe(800);
    });

    it("supports category-scoped search queries (e.g. 'boiler:main')", async () => {
      const mockEngine = new MockLibraryEngine() as unknown as LibraryEngine;
      const search = new SearchEngine(mockEngine);

      const results = await search.search("boiler:main");
      expect(results.length).toBe(1);
      expect(results[0].component.category).toBe("boiler-plate");
      expect(results[0].component.name).toBe("StandardMain");
    });
  });

  describe("AutoTypeEngine (Dual Mode: Auto & Manual Ctrl+D Stepping)", () => {
    it("supports manual queuing and character stepping", async () => {
      const mockTarget = new MockTypingTarget();
      const typingEngine = new DefaultTypingEngine(mockTarget);
      const autoType = new AutoTypeEngine(typingEngine, mockTarget as any);

      let queuedRemaining = 0;
      autoType.onQueueChange((hasQueue, remaining) => {
        queuedRemaining = remaining;
      });

      const mockEditor: any = {
        selection: { active: { line: 0, character: 0 } },
        edit: vi.fn().mockImplementation(async (callback) => {
          const builder = {
            insert: vi.fn(),
          };
          callback(builder);
          return true;
        }),
      };

      await autoType.startInsertion("c1", "testFunc", "int x = 42;", mockEditor, "manual");

      expect(autoType.isManualQueueActive()).toBe(true);
      expect(autoType.getRemainingCount()).toBe(11);
      expect(queuedRemaining).toBe(11);

      const stepped = await autoType.stepNextCharacter(mockEditor);
      expect(stepped).toBe(1);
      expect(autoType.getRemainingCount()).toBe(10);

      await autoType.flushRemaining(mockEditor);
      expect(autoType.isManualQueueActive()).toBe(false);
      expect(autoType.getRemainingCount()).toBe(0);
    });
  });
});
