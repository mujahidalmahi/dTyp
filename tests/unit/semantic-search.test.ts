import { describe, it, expect, vi } from "vitest";

vi.mock("vscode", () => {
  return {
    Position: class {
      constructor(public line: number, public character: number) {}
    },
    Selection: class {
      constructor(public anchor: any, public active: any) {}
    },
    Range: class {
      constructor(public start: any, public end: any) {}
    },
    window: {
      activeTextEditor: null,
      showInformationMessage: vi.fn(),
      showWarningMessage: vi.fn(),
      setStatusBarMessage: vi.fn(),
    },
    workspace: {
      getConfiguration: vi.fn().mockReturnValue({
        get: (_key: string, def: any) => def,
      }),
    },
  };
});

import { SearchEngine } from "../../apps/vscode/src/engine/search-engine.js";
import { HeaderEngine } from "../../apps/vscode/src/engine/header-engine.js";
import { Component, LibraryEngine } from "@dtyp/types";

describe("Dimension 4: Semantic Search & C++ Knowledge Base", () => {
  describe("1. Intent-Based & Synonym Search Scoring", () => {
    const mockComponents: Component[] = [
      {
        id: "quicksort",
        name: "quicksort",
        category: "algorithms",
        categoryId: "sorting",
        description: "High performance divide and conquer sorting algorithm",
        code: "void quicksort() {}",
        signature: "void quicksort(int arr[], int low, int high)",
        complexity: { time: "O(n log n)", space: "O(log n)" },
        dependencies: [],
        path: "algorithms/sorting/quicksort",
      },
      {
        id: "floyd_cycle_detection",
        name: "floyd_cycle_detection",
        category: "algorithms",
        categoryId: "graph_and_tree",
        description: "Detect loop in linked list using tortoise and hare pointers",
        code: "bool has_cycle() {}",
        signature: "bool has_cycle(Node* head)",
        complexity: { time: "O(n)", space: "O(1)" },
        dependencies: [],
        path: "algorithms/graph_and_tree/floyd",
      },
      {
        id: "circular_queue",
        name: "circular_queue",
        category: "data-structures",
        categoryId: "queue",
        description: "FIFO buffer using fixed array",
        code: "void enqueue() {}",
        signature: "void enqueue(Queue* q, int x)",
        complexity: { time: "O(1)", space: "O(n)" },
        dependencies: [],
        path: "data-structures/queue/circular",
      },
    ];

    const mockLibraryEngine: LibraryEngine = {
      search: vi.fn(async () => mockComponents),
      findComponent: vi.fn(async (id) => mockComponents.find((c) => c.id === id) || null),
      getCategories: vi.fn(async () => []),
      getByCategory: vi.fn(async () => []),
      getByCategoryId: vi.fn(async () => []),
      getByCategoryBranch: vi.fn(async () => []),
      getSnippets: vi.fn(async () => []),
      getSnippetsByPrefix: vi.fn(async () => []),
      count: vi.fn(async () => mockComponents.length),
      getDependencies: vi.fn(async () => []),
      getAllComponents: vi.fn(async () => mockComponents),
      getCategoryCounts: vi.fn(async () => ({})),
      getDuplicateDetector: vi.fn() as any,
    };

    it("matches algorithmic intent 'fast sort' directly to quicksort with top score", async () => {
      const searchEngine = new SearchEngine(mockLibraryEngine);
      const results = await searchEngine.search("fast sort");
      expect(results.length).toBeGreaterThan(0);
      expect(results[0].component.id).toBe("quicksort");
      expect(results[0].score).toBeGreaterThanOrEqual(950);
    });

    it("matches intent 'find loop' to floyd_cycle_detection with top score", async () => {
      const searchEngine = new SearchEngine(mockLibraryEngine);
      const results = await searchEngine.search("find loop");
      expect(results.length).toBeGreaterThan(0);
      expect(results[0].component.id).toBe("floyd_cycle_detection");
      expect(results[0].score).toBeGreaterThanOrEqual(950);
    });

    it("matches intent 'fifo' to circular_queue", async () => {
      const searchEngine = new SearchEngine(mockLibraryEngine);
      const results = await searchEngine.search("fifo");
      expect(results.length).toBeGreaterThan(0);
      expect(results[0].component.id).toBe("circular_queue");
    });
  });

  describe("2. C++ Standard Library Headers Detection", () => {
    it("detects missing C++ headers such as iostream, vector, and algorithm", () => {
      const cppCode = `
void demo() {
    std::cout << "Hello" << std::endl;
    std::vector<int> v;
    std::sort(v.begin(), v.end());
}
`;
      const missing = HeaderEngine.getMissingHeaders("", cppCode);
      expect(missing).toContain("iostream");
      expect(missing).toContain("vector");
      expect(missing).toContain("algorithm");
    });
  });
});
