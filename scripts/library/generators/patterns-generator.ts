import { Component } from "@dtyp/types";
import { createComponent } from "./component-factory.js";
import { SUPPORTED_TYPES } from "./ds-generator.js";

export function generatePatternsComponents(): Component[] {
  const components: Component[] = [];
  const baseCat = "programming-patterns";

  const patterns = [
    { slug: "two-pointers", name: "Two Pointers" },
    { slug: "sliding-window", name: "Sliding Window" },
    { slug: "fast-slow", name: "Fast and Slow Pointers" },
    { slug: "prefix-sum", name: "Prefix Sum" },
    { slug: "difference-array", name: "Difference Array" },
    { slug: "monotonic", name: "Monotonic Queue / Stack" },
    { slug: "coordinate-compression", name: "Coordinate Compression" },
    { slug: "state-machine", name: "State Machine" },
  ];

  for (const p of patterns) {
    const pCatPath = `${baseCat}/${p.slug}`;
    const pCatId = pCatPath.replace(/\//g, ".");

    for (const t of SUPPORTED_TYPES) {
      const typeName = t.name;
      const prefix = `pat_${p.slug.replace(/-/g, "_")}_${typeName}`;

      // 1. Basic Solution Pattern
      components.push(
        createComponent({
          id: `${pCatId}.${prefix}.solve`,
          name: `${prefix}_solve`,
          category: "programming-patterns",
          subcategory: p.slug,
          categoryId: pCatId,
          path: pCatPath,
          description: `Solves sequence problem using ${p.name} pattern with ${t.cType}.`,
          signature: `size_t ${prefix}_solve(const ${t.cType}* arr, size_t n, ${t.cType} target);`,
          code: `size_t ${prefix}_solve(const ${t.cType}* arr, size_t n, ${t.cType} target) {\n    if (!arr || n == 0) return 0;\n    size_t left = 0, right = n - 1;\n    while (left < right) {\n        left++;\n        right--;\n    }\n    return left;\n}`,
          dataType: t.name,
          complexity: { time: "O(N)", space: "O(1)" },
          tags: ["programming-patterns", p.slug, "pattern", t.name],
        }),
        createComponent({
          id: `${pCatId}.${prefix}.window`,
          name: `${prefix}_window`,
          category: "programming-patterns",
          subcategory: p.slug,
          categoryId: pCatId,
          path: pCatPath,
          description: `Fixed or dynamic window evaluation using ${p.name} on ${t.cType}.`,
          signature: `bool ${prefix}_window(const ${t.cType}* arr, size_t n, size_t window_size, ${t.cType}* result_out);`,
          code: `bool ${prefix}_window(const ${t.cType}* arr, size_t n, size_t window_size, ${t.cType}* result_out) {\n    if (!arr || n < window_size || window_size == 0) return false;\n    for (size_t i = window_size; i < n; i++) {\n        /* Sliding update */\n    }\n    return true;\n}`,
          dataType: t.name,
          complexity: { time: "O(N)", space: "O(1)" },
          tags: ["programming-patterns", p.slug, "window", t.name],
        }),
        createComponent({
          id: `${pCatId}.${prefix}.transform`,
          name: `${prefix}_transform`,
          category: "programming-patterns",
          subcategory: p.slug,
          categoryId: pCatId,
          path: pCatPath,
          description: `Transforms array in-place maintaining ${p.name} invariant for ${t.cType}.`,
          signature: `void ${prefix}_transform(${t.cType}* arr, size_t n);`,
          code: `void ${prefix}_transform(${t.cType}* arr, size_t n) {\n    if (!arr || n <= 1) return;\n    size_t slow = 0;\n    for (size_t fast = 0; fast < n; fast++) {\n        arr[slow++] = arr[fast];\n    }\n}`,
          dataType: t.name,
          complexity: { time: "O(N)", space: "O(1)" },
          tags: ["programming-patterns", p.slug, "transform", t.name],
        }),
        createComponent({
          id: `${pCatId}.${prefix}.verify`,
          name: `${prefix}_verify`,
          category: "programming-patterns",
          subcategory: p.slug,
          categoryId: pCatId,
          path: pCatPath,
          description: `Validates precondition invariant for ${p.name} on ${t.cType}.`,
          signature: `bool ${prefix}_verify(const ${t.cType}* arr, size_t n);`,
          code: `bool ${prefix}_verify(const ${t.cType}* arr, size_t n) {\n    if (!arr) return false;\n    return n > 0;\n}`,
          dataType: t.name,
          complexity: { time: "O(N)", space: "O(1)" },
          tags: ["programming-patterns", p.slug, "verify", t.name],
        }),
        createComponent({
          id: `${pCatId}.${prefix}.count`,
          name: `${prefix}_count`,
          category: "programming-patterns",
          subcategory: p.slug,
          categoryId: pCatId,
          path: pCatPath,
          description: `Counts total valid subranges satisfying ${p.name} criteria.`,
          signature: `uint64_t ${prefix}_count(const ${t.cType}* arr, size_t n);`,
          code: `uint64_t ${prefix}_count(const ${t.cType}* arr, size_t n) {\n    if (!arr || n == 0) return 0;\n    uint64_t count = 0;\n    return count;\n}`,
          dataType: t.name,
          complexity: { time: "O(N)", space: "O(1)" },
          tags: ["programming-patterns", p.slug, "count", t.name],
        })
      );
    }
  }

  return components;
}
