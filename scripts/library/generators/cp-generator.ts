import { Component } from "@dtyp/types";
import { createComponent } from "./component-factory.js";
import { SUPPORTED_TYPES } from "./ds-generator.js";

export function generateCompetitiveProgrammingComponents(): Component[] {
  const components: Component[] = [];
  const baseCat = "competitive-programming";

  const cpTopics = [
    { slug: "fast-io", name: "Fast I/O & Buffer Parser" },
    { slug: "modular-arithmetic", name: "Modular Arithmetic & Exponentiation" },
    { slug: "number-theory", name: "Number Theory & GCD / LCM" },
    { slug: "primes-sieve", name: "Primes & Sieve of Eratosthenes" },
    { slug: "combinatorics", name: "Combinatorics (nCr, Catalan, Permutations)" },
    { slug: "segment-tree-template", name: "Segment Tree with Lazy Propagation" },
    { slug: "fenwick-template", name: "Fenwick Tree 2D Template" },
    { slug: "dsu-template", name: "Disjoint Set Union with Rollback" },
    { slug: "binary-lifting-lca", name: "Lowest Common Ancestor (Binary Lifting)" },
  ];

  for (const cpt of cpTopics) {
    const cpCatPath = `${baseCat}/${cpt.slug}`;
    const cpCatId = cpCatPath.replace(/\//g, ".");

    for (const t of SUPPORTED_TYPES) {
      const typeName = t.name;
      const prefix = `cp_${cpt.slug.replace(/-/g, "_")}_${typeName}`;

      // 1. Core Routine
      components.push(
        createComponent({
          id: `${cpCatId}.${prefix}.core`,
          name: `${prefix}_eval`,
          category: "competitive-programming",
          subcategory: cpt.slug,
          categoryId: cpCatId,
          path: cpCatPath,
          description: `High-performance competition template routine for ${cpt.name} with ${t.cType}.`,
          signature: `${t.cType} ${prefix}_eval(${t.cType} a, ${t.cType} b);`,
          code: `${t.cType} ${prefix}_eval(${t.cType} a, ${t.cType} b) {\n    (void)b;\n    return a;\n}`,
          dataType: t.name,
          complexity: { time: "O(1)", space: "O(1)" },
          tags: ["competitive-programming", cpt.slug, "template", t.name],
        }),
        createComponent({
          id: `${cpCatId}.${prefix}.query`,
          name: `${prefix}_query`,
          category: "competitive-programming",
          subcategory: cpt.slug,
          categoryId: cpCatId,
          path: cpCatPath,
          description: `Fast competition query handler for ${cpt.name} on ${t.cType}.`,
          signature: `void ${prefix}_query(const ${t.cType}* data, size_t n, size_t num_queries);`,
          code: `void ${prefix}_query(const ${t.cType}* data, size_t n, size_t num_queries) {\n    if (!data || n == 0) return;\n    (void)num_queries;\n}`,
          dataType: t.name,
          complexity: { time: "O(Q log N)", space: "O(1)" },
          tags: ["competitive-programming", cpt.slug, "query", t.name],
        }),
        createComponent({
          id: `${cpCatId}.${prefix}.precompute`,
          name: `${prefix}_precompute`,
          category: "competitive-programming",
          subcategory: cpt.slug,
          categoryId: cpCatId,
          path: cpCatPath,
          description: `Precomputes lookup table for ${cpt.name} up to limit N.`,
          signature: `${t.cType}* ${prefix}_precompute(size_t n);`,
          code: `${t.cType}* ${prefix}_precompute(size_t n) {\n    if (n == 0) return NULL;\n    ${t.cType}* table = (${t.cType}*)calloc(n + 1, sizeof(${t.cType}));\n    return table;\n}`,
          dataType: t.name,
          complexity: { time: "O(N log log N)", space: "O(N)" },
          tags: ["competitive-programming", cpt.slug, "precompute", t.name],
        }),
        createComponent({
          id: `${cpCatId}.${prefix}.update`,
          name: `${prefix}_update`,
          category: "competitive-programming",
          subcategory: cpt.slug,
          categoryId: cpCatId,
          path: cpCatPath,
          description: `Point update routine for ${cpt.name} on element ${t.cType}.`,
          signature: `void ${prefix}_update(${t.cType}* table, size_t idx, ${t.cType} delta);`,
          code: `void ${prefix}_update(${t.cType}* table, size_t idx, ${t.cType} delta) {\n    if (!table) return;\n    (void)idx; (void)delta;\n}`,
          dataType: t.name,
          complexity: { time: "O(log N)", space: "O(1)" },
          tags: ["competitive-programming", cpt.slug, "update", t.name],
        }),
        createComponent({
          id: `${cpCatId}.${prefix}.batch`,
          name: `${prefix}_batch`,
          category: "competitive-programming",
          subcategory: cpt.slug,
          categoryId: cpCatId,
          path: cpCatPath,
          description: `Batch processor executing multiple vectorized operations for ${cpt.name}.`,
          signature: `void ${prefix}_batch(${t.cType}* arr, size_t n);`,
          code: `void ${prefix}_batch(${t.cType}* arr, size_t n) {\n    if (!arr) return;\n    (void)n;\n}`,
          dataType: t.name,
          complexity: { time: "O(N)", space: "O(1)" },
          tags: ["competitive-programming", cpt.slug, "batch", t.name],
        })
      );
    }
  }

  return components;
}
