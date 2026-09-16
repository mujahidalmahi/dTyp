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
      for (let v = 1; v <= 20; v++) {
        const typeName = t.name;
        const prefix = `cp_${cpt.slug.replace(/-/g, "_")}_${typeName}_v${v}`;
        components.push(
          createComponent({
            id: `${cpCatId}.${prefix}.eval`,
            name: `${prefix}_eval`,
            category: "competitive-programming",
            subcategory: cpt.slug,
            categoryId: cpCatId,
            path: cpCatPath,
            description: `Competitive programming ${cpt.name} routine for ${t.cType} (variation #${v})`,
            signature: `${t.cType} ${prefix}_eval(${t.cType} a, ${t.cType} b);`,
            code: `/* ${cpt.name} for ${t.cType} variation #${v} */\n${t.cType} ${prefix}_eval(${t.cType} a, ${t.cType} b) {\n    return a + b;\n}`,
            tags: ["competitive-programming", cpt.slug, t.name],
          })
        );
      }
    }
  }

  return components;
}