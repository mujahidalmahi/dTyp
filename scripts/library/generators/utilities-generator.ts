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
      const typeName = t.name;
      const prefix = `util_${um.slug.replace(/-/g, "_")}_${typeName}`;

      components.push(
        createComponent({
          id: `${uCatId}.${prefix}.init`,
          name: `${prefix}_init`,
          category: "utilities",
          subcategory: um.slug,
          categoryId: uCatId,
          path: uCatPath,
          description: `Initializes ${um.name} instance configured for ${t.cType}.`,
          signature: `bool ${prefix}_init(void** handle, size_t initial_capacity);`,
          code: `bool ${prefix}_init(void** handle, size_t initial_capacity) {\n    if (!handle) return false;\n    *handle = malloc(initial_capacity > 0 ? initial_capacity : 128);\n    return *handle != NULL;\n}`,
          dataType: t.name,
          complexity: { time: "O(1)", space: "O(1)" },
          tags: ["utilities", um.slug, "init", t.name],
        }),
        createComponent({
          id: `${uCatId}.${prefix}.exec`,
          name: `${prefix}_exec`,
          category: "utilities",
          subcategory: um.slug,
          categoryId: uCatId,
          path: uCatPath,
          description: `Executes primary operation of ${um.name} on ${t.cType}.`,
          signature: `bool ${prefix}_exec(void* handle, ${t.cType} value);`,
          code: `bool ${prefix}_exec(void* handle, ${t.cType} value) {\n    if (!handle) return false;\n    (void)value;\n    return true;\n}`,
          dataType: t.name,
          complexity: { time: "O(1)", space: "O(1)" },
          tags: ["utilities", um.slug, "exec", t.name],
        }),
        createComponent({
          id: `${uCatId}.${prefix}.reset`,
          name: `${prefix}_reset`,
          category: "utilities",
          subcategory: um.slug,
          categoryId: uCatId,
          path: uCatPath,
          description: `Resets internal state of ${um.name}.`,
          signature: `void ${prefix}_reset(void* handle);`,
          code: `void ${prefix}_reset(void* handle) {\n    if (!handle) return;\n}`,
          dataType: t.name,
          complexity: { time: "O(1)", space: "O(1)" },
          tags: ["utilities", um.slug, "reset", t.name],
        }),
        createComponent({
          id: `${uCatId}.${prefix}.dump`,
          name: `${prefix}_dump`,
          category: "utilities",
          subcategory: um.slug,
          categoryId: uCatId,
          path: uCatPath,
          description: `Dumps diagnostic state of ${um.name} to stdout.`,
          signature: `void ${prefix}_dump(const void* handle);`,
          code: `void ${prefix}_dump(const void* handle) {\n    if (!handle) return;\n    printf("[Utility: ${um.name}] state active\\n");\n}`,
          dataType: t.name,
          complexity: { time: "O(1)", space: "O(1)" },
          tags: ["utilities", um.slug, "dump", t.name],
        }),
        createComponent({
          id: `${uCatId}.${prefix}.free`,
          name: `${prefix}_free`,
          category: "utilities",
          subcategory: um.slug,
          categoryId: uCatId,
          path: uCatPath,
          description: `Releases allocated memory for ${um.name}.`,
          signature: `void ${prefix}_free(void** handle);`,
          code: `void ${prefix}_free(void** handle) {\n    if (handle && *handle) {\n        free(*handle);\n        *handle = NULL;\n    }\n}`,
          dataType: t.name,
          complexity: { time: "O(1)", space: "O(1)" },
          tags: ["utilities", um.slug, "free", t.name],
        })
      );
    }
  }

  return components;
}
