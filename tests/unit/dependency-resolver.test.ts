import { describe, it, expect } from "vitest";
import { DependencyResolver, DependencyCycleError } from "@dtyp/library-engine";
import { Component } from "@dtyp/types";

describe("DependencyResolver", () => {
  const resolver = new DependencyResolver();

  const makeMockComp = (id: string, name: string, dependencies: string[]): Component => ({
    id,
    name,
    language: "c",
    categoryId: "test",
    category: "test",
    path: "/test",
    description: `Test ${id}`,
    signature: `void ${name}()`,
    code: `void ${name}() {}`,
    complexity: { time: "O(1)", space: "O(1)" },
    version: "1.0.0",
    dependencies,
    tags: [],
  });

  it("resolves linear dependencies in topological order", async () => {
    const components: Record<string, Component> = {
      "sorting.quickSort": makeMockComp("sorting.quickSort", "quickSort", ["sorting.partition"]),
      "sorting.partition": makeMockComp("sorting.partition", "partition", ["sorting.swap"]),
      "sorting.swap": makeMockComp("sorting.swap", "swap", []),
    };

    const resolved = await resolver.resolve("sorting.quickSort", async (id) => components[id] ?? null);
    const names = resolved.map((c) => c.name);

    expect(names).toEqual(["swap", "partition", "quickSort"]);
  });

  it("deduplicates diamond dependencies", async () => {
    // A -> B, C; B -> D; C -> D
    const components: Record<string, Component> = {
      "A": makeMockComp("A", "A", ["B", "C"]),
      "B": makeMockComp("B", "B", ["D"]),
      "C": makeMockComp("C", "C", ["D"]),
      "D": makeMockComp("D", "D", []),
    };

    const resolved = await resolver.resolve("A", async (id) => components[id] ?? null);
    const names = resolved.map((c) => c.name);

    expect(names.filter((n) => n === "D").length).toBe(1);
    expect(names.indexOf("D")).toBeLessThan(names.indexOf("B"));
    expect(names.indexOf("D")).toBeLessThan(names.indexOf("C"));
    expect(names.indexOf("B")).toBeLessThan(names.indexOf("A"));
    expect(names.indexOf("C")).toBeLessThan(names.indexOf("A"));
  });

  it("Invariant 6: detects cycles and throws DependencyCycleError", async () => {
    // A -> B -> C -> A
    const components: Record<string, Component> = {
      "A": makeMockComp("A", "A", ["B"]),
      "B": makeMockComp("B", "B", ["C"]),
      "C": makeMockComp("C", "C", ["A"]),
    };

    await expect(
      resolver.resolve("A", async (id) => components[id] ?? null)
    ).rejects.toThrow(DependencyCycleError);
  });
});
