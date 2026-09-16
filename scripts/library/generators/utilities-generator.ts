import { Component } from "@dtyp/types";
import { createComponent } from "./component-factory.js";
import { SUPPORTED_TYPES } from "./ds-generator.js";

export function generateUtilitiesComponents(): Component[] {
  const components: Component[] = [];
  const baseCat = "utilities";

  const utilModules = [
    { slug: "memory-tracker", name: "Memory Leak Tracker" },
    { slug: "timer", name: "High-Resolution Benchmarking Timer" },
    { slug: "string-builder", name: "Dynamic Resizing String Builder" },
    { slug: "arg-parser", name: "CLI Argument Parser" },
    { slug: "csv-tokenizer", name: "Fast CSV Field Tokenizer" },
    { slug: "logger", name: "Structured Logger" },
    { slug: "safe-ops", name: "Safe Arithmetic & Memory Operations" },
    { slug: "bit-array", name: "Dynamic Bitset / Bit Array" },
  ];

  for (const um of utilModules) {
    const uCatPath = `${baseCat}/${um.slug}`;
    const uCatId = uCatPath.replace(/\//g, ".");

    for (const t of SUPPORTED_TYPES) {
      for (let v = 1; v <= 16; v++) {
        const typeName = t.name;
        const prefix = `util_${um.slug.replace(/-/g, "_")}_${typeName}_v${v}`;

        components.push(
          createComponent({
            id: `${uCatId}.${prefix}.init`,
            name: `${prefix}_init`,
            category: "utilities",
            subcategory: um.slug,
            categoryId: uCatId,
            path: uCatPath,
            description: `Initialize ${um.name} utility for ${t.cType} (variation #${v})`,
            signature: `void* ${prefix}_init(size_t capacity);`,
            code: `void* ${prefix}_init(size_t capacity) {\n    return malloc(capacity);\n}`,
            tags: ["utilities", um.slug, t.name],
          })
        );
      }
    }
  }

  return components;
}