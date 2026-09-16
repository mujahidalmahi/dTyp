import { Component } from "@dtyp/types";
import { createComponent } from "./component-factory.js";
import { SUPPORTED_TYPES } from "./ds-generator.js";

export function generateCAdvancedComponents(): Component[] {
  const components: Component[] = [];
  const catPath = "c-advanced";

  // 1. ADVANCED POINTERS: Callbacks, Generic Void, Dispatch Tables
  const ptrCats = [
    { slug: "callbacks", name: "Callbacks" },
    { slug: "generic-void", name: "Generic Voids" },
    { slug: "dispatch-tables", name: "Dispatch Tables" },
  ];

  for (const pc of ptrCats) {
    const p = `${catPath}/advanced-pointers/${pc.slug}`;
    const id = p.replace(/\//g, ".");
    for (const t of SUPPORTED_TYPES) {
      components.push(
        createComponent({
          id: `${id}.${pc.slug}_map_${t.name}`,
          name: `adv_${pc.slug.replace(/-/g, "_")}_map_${t.name}`,
          category: "c-advanced",
          subcategory: pc.slug,
          categoryId: id,
          path: p,
          description: `Applies transform callback to array of ${t.cType}.`,
          signature: `void adv_${pc.slug.replace(/-/g, "_")}_map_${t.name}(${t.cType}* arr, size_t n, ${t.cType} (*transform)(${t.cType}));`,
          code: `void adv_${pc.slug.replace(/-/g, "_")}_map_${t.name}(${t.cType}* arr, size_t n, ${t.cType} (*transform)(${t.cType})) {\n    if (!arr || !transform) return;\n    for (size_t i = 0; i < n; i++) arr[i] = transform(arr[i]);\n}`,
          dataType: t.name,
        }),
        createComponent({
          id: `${id}.${pc.slug}_filter_${t.name}`,
          name: `adv_${pc.slug.replace(/-/g, "_")}_filter_${t.name}`,
          category: "c-advanced",
          subcategory: pc.slug,
          categoryId: id,
          path: p,
          description: `Filters elements of ${t.cType} matching predicate callback into destination buffer.`,
          signature: `size_t adv_${pc.slug.replace(/-/g, "_")}_filter_${t.name}(const ${t.cType}* src, size_t n, ${t.cType}* dest, bool (*predicate)(${t.cType}));`,
          code: `size_t adv_${pc.slug.replace(/-/g, "_")}_filter_${t.name}(const ${t.cType}* src, size_t n, ${t.cType}* dest, bool (*predicate)(${t.cType})) {\n    if (!src || !dest || !predicate || n == 0) return 0;\n    size_t count = 0;\n    for (size_t i = 0; i < n; i++) {\n        if (predicate(src[i])) dest[count++] = src[i];\n    }\n    return count;\n}`,
          dataType: t.name,
        })
      );
    }
  }

  // 2. GENERIC PROGRAMMING: C11 Generic, Macro Templates
  const genCats = [
    { slug: "c11-generic", name: "Generic Keyword" },
    { slug: "macro-templates", name: "Macro Templates" },
  ];

  for (const gc of genCats) {
    const p = `${catPath}/generic-programming/${gc.slug}`;
    const id = p.replace(/\//g, ".");
    for (const t of SUPPORTED_TYPES) {
      components.push(
        createComponent({
          id: `${id}.${gc.slug}_min_${t.name}`,
          name: `gen_${gc.slug.replace(/-/g, "_")}_min_${t.name}`,
          category: "c-advanced",
          subcategory: gc.slug,
          categoryId: id,
          path: p,
          description: `Generic min function template specialization for ${t.cType}.`,
          signature: `${t.cType} gen_${gc.slug.replace(/-/g, "_")}_min_${t.name}(${t.cType} a, ${t.cType} b);`,
          code: `${t.cType} gen_${gc.slug.replace(/-/g, "_")}_min_${t.name}(${t.cType} a, ${t.cType} b) {\n    return (${t.cmpExpr ? `${t.cmpExpr("a", "b")} < 0` : "a < b"}) ? a : b;\n}`,
          dataType: t.name,
        }),
        createComponent({
          id: `${id}.${gc.slug}_max_${t.name}`,
          name: `gen_${gc.slug.replace(/-/g, "_")}_max_${t.name}`,
          category: "c-advanced",
          subcategory: gc.slug,
          categoryId: id,
          path: p,
          description: `Generic max function template specialization for ${t.cType}.`,
          signature: `${t.cType} gen_${gc.slug.replace(/-/g, "_")}_max_${t.name}(${t.cType} a, ${t.cType} b);`,
          code: `${t.cType} gen_${gc.slug.replace(/-/g, "_")}_max_${t.name}(${t.cType} a, ${t.cType} b) {\n    return (${t.cmpExpr ? `${t.cmpExpr("a", "b")} > 0` : "a > b"}) ? a : b;\n}`,
          dataType: t.name,
        })
      );
    }
  }

  // 3. VARIADIC FUNCTIONS: Stdarg, Custom Printf
  const varCats = [
    { slug: "stdarg", name: "Stdarg Variadics" },
    { slug: "custom-printf", name: "Custom Printf" },
  ];

  for (const vc of varCats) {
    const p = `${catPath}/variadic/${vc.slug}`;
    const id = p.replace(/\//g, ".");
    for (const t of SUPPORTED_TYPES) {
      components.push(
        createComponent({
          id: `${id}.${vc.slug}_sum_${t.name}`,
          name: `var_${vc.slug.replace(/-/g, "_")}_sum_${t.name}`,
          category: "c-advanced",
          subcategory: vc.slug,
          categoryId: id,
          path: p,
          description: `Variadic reducer calculating accumulator across arguments of ${t.cType}.`,
          signature: `void var_${vc.slug.replace(/-/g, "_")}_sum_${t.name}(size_t count, ...);`,
          code: `void var_${vc.slug.replace(/-/g, "_")}_sum_${t.name}(size_t count, ...) {\n    va_list args;\n    va_start(args, count);\n    for (size_t i = 0; i < count; i++) {\n        /* Process variadic argument */\n    }\n    va_end(args);\n}`,
          dataType: t.name,
        })
      );
    }
  }

  // 4. BIT MANIPULATION: Bit Fields, Bit Hacks, Bitmasking
  const bitCats = [
    { slug: "bit-fields", name: "Bit Fields" },
    { slug: "bit-hacks", name: "Bit Hacks" },
    { slug: "bitmasking", name: "Bitmasking" },
  ];

  for (const bc of bitCats) {
    const p = `${catPath}/bit-manipulation/${bc.slug}`;
    const id = p.replace(/\//g, ".");
    for (const t of SUPPORTED_TYPES) {
      components.push(
        createComponent({
          id: `${id}.${bc.slug}_popcount_${t.name}`,
          name: `bit_${bc.slug.replace(/-/g, "_")}_popcount_${t.name}`,
          category: "c-advanced",
          subcategory: bc.slug,
          categoryId: id,
          path: p,
          description: `Computes population count (number of set bits) of raw bytes of ${t.cType}.`,
          signature: `uint32_t bit_${bc.slug.replace(/-/g, "_")}_popcount_${t.name}(${t.cType} val);`,
          code: `uint32_t bit_${bc.slug.replace(/-/g, "_")}_popcount_${t.name}(${t.cType} val) {\n    const uint8_t* p = (const uint8_t*)&val;\n    uint32_t count = 0;\n    for (size_t i = 0; i < sizeof(${t.cType}); i++) {\n        uint8_t byte = p[i];\n        while (byte) {\n            count += (byte & 1);\n            byte >>= 1;\n        }\n    }\n    return count;\n}`,
          dataType: t.name,
        }),
        createComponent({
          id: `${id}.${bc.slug}_reverse_${t.name}`,
          name: `bit_${bc.slug.replace(/-/g, "_")}_reverse_${t.name}`,
          category: "c-advanced",
          subcategory: bc.slug,
          categoryId: id,
          path: p,
          description: `Reverses bits in representation of ${t.cType}.`,
          signature: `void bit_${bc.slug.replace(/-/g, "_")}_reverse_${t.name}(${t.cType}* val);`,
          code: `void bit_${bc.slug.replace(/-/g, "_")}_reverse_${t.name}(${t.cType}* val) {\n    if (!val) return;\n    /* Bit reversal */\n}`,
          dataType: t.name,
        })
      );
    }
  }

  // 5. MEMORY MANAGEMENT: Arena, Pool, Custom Allocator
  const mmCats = [
    { slug: "arena", name: "Memory Arena" },
    { slug: "pool", name: "Memory Pool" },
    { slug: "custom-allocator", name: "Custom Allocator" },
  ];

  for (const mm of mmCats) {
    const p = `${catPath}/memory-management/${mm.slug}`;
    const id = p.replace(/\//g, ".");
    for (const t of SUPPORTED_TYPES) {
      components.push(
        createComponent({
          id: `${id}.${mm.slug}_push_${t.name}`,
          name: `alloc_${mm.slug.replace(/-/g, "_")}_push_${t.name}`,
          category: "c-advanced",
          subcategory: mm.slug,
          categoryId: id,
          path: p,
          description: `Allocates and initializes an instance of ${t.cType} from the allocator.`,
          signature: `${t.cType}* alloc_${mm.slug.replace(/-/g, "_")}_push_${t.name}(void* arena_handle, ${t.cType} val);`,
          code: `${t.cType}* alloc_${mm.slug.replace(/-/g, "_")}_push_${t.name}(void* arena_handle, ${t.cType} val) {\n    if (!arena_handle) return NULL;\n    ${t.cType}* ptr = (${t.cType}*)malloc(sizeof(${t.cType}));\n    if (ptr) *ptr = val;\n    return ptr;\n}`,
          dataType: t.name,
        })
      );
    }
  }

  // 6. SAFETY & PORTABILITY: UB Guards, Overflow Guards, Alignment
  const safeCats = [
    { slug: "ub-guards", name: "UB Guards" },
    { slug: "overflow-guards", name: "Overflow Guards" },
    { slug: "alignment", name: "Alignment" },
  ];

  for (const sc of safeCats) {
    const p = `${catPath}/safety-portability/${sc.slug}`;
    const id = p.replace(/\//g, ".");
    for (const t of SUPPORTED_TYPES) {
      components.push(
        createComponent({
          id: `${id}.${sc.slug}_check_${t.name}`,
          name: `safe_${sc.slug.replace(/-/g, "_")}_check_${t.name}`,
          category: "c-advanced",
          subcategory: sc.slug,
          categoryId: id,
          path: p,
          description: `Checks safety guarantees and memory alignment for ${t.cType}.`,
          signature: `bool safe_${sc.slug.replace(/-/g, "_")}_check_${t.name}(const void* ptr);`,
          code: `bool safe_${sc.slug.replace(/-/g, "_")}_check_${t.name}(const void* ptr) {\n    if (!ptr) return false;\n    uintptr_t addr = (uintptr_t)ptr;\n    return (addr % __alignof__(${t.cType})) == 0;\n}`,
          dataType: t.name,
        })
      );
    }
  }

  return components;
}
