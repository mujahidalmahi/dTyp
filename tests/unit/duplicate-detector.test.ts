import { describe, it, expect } from "vitest";
import { DuplicateDetector } from "@dtyp/library-engine";
import { Component } from "@dtyp/types";

describe("DuplicateDetector", () => {
  const detector = new DuplicateDetector();

  const mockNodeComp: Component = {
    id: "linkedList.node",
    name: "Node",
    language: "c",
    categoryId: "structures",
    category: "structures",
    path: "/structures",
    description: "Linked list node struct",
    signature: "typedef struct Node Node;",
    code: "typedef struct Node {\n    int data;\n    struct Node* next;\n} Node;",
    complexity: { time: "O(1)", space: "O(1)" },
    version: "1.0.0",
    dependencies: [],
    tags: ["linked-list"],
  };

  const mockSwapComp: Component = {
    id: "utilities.swap",
    name: "swap",
    language: "c",
    categoryId: "fundamentals",
    category: "fundamentals",
    path: "/fundamentals",
    description: "Swaps two integers",
    signature: "void swap(int* a, int* b)",
    code: "void swap(int* a, int* b) {\n    int temp = *a;\n    *a = *b;\n    *b = temp;\n}",
    complexity: { time: "O(1)", space: "O(1)" },
    version: "1.0.0",
    dependencies: [],
    tags: ["swap"],
  };

  it("detects existing functions in source text", () => {
    const existingSource = `
#include <stdio.h>

void swap(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main() {
    return 0;
}
    `;

    expect(detector.hasFunction(existingSource, "swap")).toBe(true);
    expect(detector.hasFunction(existingSource, "partition")).toBe(false);
  });

  it("detects existing structs in source text", () => {
    const existingSource = `
struct Node {
    int data;
    struct Node* next;
};
    `;

    expect(detector.hasStruct(existingSource, "Node")).toBe(true);
    expect(detector.hasStruct(existingSource, "TreeNode")).toBe(false);
  });

  it("Invariant 7: filters duplicate components from insertion batch", () => {
    const existingSource = `
#include <stdio.h>

void swap(int* a, int* b) {
    // existing
}
    `;

    const result = detector.filterNonDuplicates(existingSource, [mockSwapComp, mockNodeComp]);
    expect(result.toInsert.map((c) => c.name)).toEqual(["Node"]);
    expect(result.skipped.map((s) => s.component.name)).toEqual(["swap"]);
  });
});
