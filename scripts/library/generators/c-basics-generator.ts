import { Component } from "@dtyp/types";
import { createComponent } from "./component-factory.js";
import { SUPPORTED_TYPES } from "./ds-generator.js";

export function generateCBasicsComponents(): Component[] {
  const components: Component[] = [];
  const catPath = "c-basics";

  // 1. SYNTAX: Statements, Expressions, Blocks, Declarations, Definitions
  const syntaxCategories = [
    { slug: "statements", name: "Statements" },
    { slug: "expressions", name: "Expressions" },
    { slug: "blocks", name: "Blocks" },
    { slug: "declarations", name: "Declarations" },
    { slug: "definitions", name: "Definitions" },
  ];

  for (const sc of syntaxCategories) {
    const p = `${catPath}/syntax/${sc.slug}`;
    const id = p.replace(/\//g, ".");
    for (const t of SUPPORTED_TYPES) {
      components.push(
        createComponent({
          id: `${id}.${sc.slug}_${t.name}`,
          name: `syntax_${sc.slug}_${t.name}`,
          type: "snippet",
          category: "c-basics",
          subcategory: sc.slug,
          categoryId: id,
          path: p,
          description: `C syntax template for ${sc.name} of ${t.cType}.`,
          signature: `/* ${sc.name} for ${t.cType} */`,
          code: `/* ${sc.name} */\n${t.cType} var_${t.name} = ${t.sampleVal};\n(void)var_${t.name};`,
          dataType: t.name,
        })
      );
    }
  }

  // 2. VARIABLES: Declaration, Initialization, Assignment, Scope, Lifetime
  const varCategories = [
    { slug: "declaration", name: "Declaration" },
    { slug: "initialization", name: "Initialization" },
    { slug: "assignment", name: "Assignment" },
    { slug: "scope", name: "Scope" },
    { slug: "lifetime", name: "Lifetime" },
  ];

  for (const vc of varCategories) {
    const p = `${catPath}/variables/${vc.slug}`;
    const id = p.replace(/\//g, ".");
    for (const t of SUPPORTED_TYPES) {
      components.push(
        createComponent({
          id: `${id}.${vc.slug}_${t.name}`,
          name: `var_${vc.slug}_${t.name}`,
          type: "snippet",
          category: "c-basics",
          subcategory: vc.slug,
          categoryId: id,
          path: p,
          description: `Variable ${vc.name} pattern for ${t.cType}.`,
          signature: `${vc.slug === "declaration" ? `${t.cType} v;` : `${t.cType} v = ${t.sampleVal};`}`,
          code: `${vc.slug === "declaration" ? `${t.cType} v;\n(void)v;` : `${t.cType} v = ${t.sampleVal};\n(void)v;`}`,
          dataType: t.name,
        })
      );
    }
  }

  // 3. DATA TYPES: Integer, Floating Point, Character, Boolean, Signed, Unsigned
  const dtCategories = [
    { slug: "integer", name: "Integer" },
    { slug: "floating-point", name: "Floating Point" },
    { slug: "character", name: "Character" },
    { slug: "boolean", name: "Boolean" },
    { slug: "signed", name: "Signed" },
    { slug: "unsigned", name: "Unsigned" },
  ];

  for (const dt of dtCategories) {
    const p = `${catPath}/data-types/${dt.slug}`;
    const id = p.replace(/\//g, ".");
    for (const t of SUPPORTED_TYPES) {
      components.push(
        createComponent({
          id: `${id}.${dt.slug}_${t.name}`,
          name: `type_${dt.slug}_${t.name}`,
          type: "snippet",
          category: "c-basics",
          subcategory: dt.slug,
          categoryId: id,
          path: p,
          description: `Data type usage and sizeof introspection for ${t.cType}.`,
          signature: `size_t sz = sizeof(${t.cType});`,
          code: `size_t sz = sizeof(${t.cType});\nprintf("Size of ${t.name}: %zu bytes\\n", sz);`,
          dataType: t.name,
        })
      );
    }
  }

  // 4. OPERATORS: Arithmetic, Relational, Logical, Assignment, Increment, Bitwise
  const opCategories = [
    { slug: "arithmetic", name: "Arithmetic" },
    { slug: "relational", name: "Relational" },
    { slug: "logical", name: "Logical" },
    { slug: "assignment", name: "Assignment" },
    { slug: "increment", name: "Increment" },
    { slug: "bitwise", name: "Bitwise" },
  ];

  for (const op of opCategories) {
    const p = `${catPath}/operators/${op.slug}`;
    const id = p.replace(/\//g, ".");
    for (const t of SUPPORTED_TYPES) {
      components.push(
        createComponent({
          id: `${id}.${op.slug}_${t.name}`,
          name: `op_${op.slug}_${t.name}`,
          category: "c-basics",
          subcategory: op.slug,
          categoryId: id,
          path: p,
          description: `Executes ${op.name} operations on ${t.cType}.`,
          signature: `void op_${op.slug}_${t.name}(${t.cType} a, ${t.cType} b);`,
          code: `void op_${op.slug}_${t.name}(${t.cType} a, ${t.cType} b) {\n    /* ${op.name} operation */\n    (void)a; (void)b;\n}`,
          dataType: t.name,
        })
      );
    }
  }

  // 5. CONTROL FLOW: Conditions, Switch, Loops For, Loops While, Loops Do While
  const cfCategories = [
    { slug: "conditions", name: "Conditions" },
    { slug: "switch", name: "Switch" },
    { slug: "loops-for", name: "Loops For" },
    { slug: "loops-while", name: "Loops While" },
    { slug: "loops-do-while", name: "Loops Do While" },
  ];

  for (const cf of cfCategories) {
    const p = `${catPath}/control-flow/${cf.slug}`;
    const id = p.replace(/\//g, ".");
    for (const t of SUPPORTED_TYPES) {
      components.push(
        createComponent({
          id: `${id}.${cf.slug}_${t.name}`,
          name: `cf_${cf.slug.replace(/-/g, "_")}_${t.name}`,
          category: "c-basics",
          subcategory: cf.slug,
          categoryId: id,
          path: p,
          description: `Control flow structure for ${cf.name} controlling ${t.cType} evaluation.`,
          signature: `void cf_${cf.slug.replace(/-/g, "_")}_${t.name}(const ${t.cType}* arr, size_t n);`,
          code: `void cf_${cf.slug.replace(/-/g, "_")}_${t.name}(const ${t.cType}* arr, size_t n) {\n    if (!arr || n == 0) return;\n    for (size_t i = 0; i < n; i++) {\n        /* Process loop iteration */\n    }\n}`,
          dataType: t.name,
        })
      );
    }
  }

  // 6. FUNCTIONS: Basics, Recursion, Parameters
  const fnCategories = [
    { slug: "basics", name: "Basics" },
    { slug: "recursion", name: "Recursion" },
    { slug: "parameters", name: "Parameters" },
  ];

  for (const fn of fnCategories) {
    const p = `${catPath}/functions/${fn.slug}`;
    const id = p.replace(/\//g, ".");
    for (const t of SUPPORTED_TYPES) {
      components.push(
        createComponent({
          id: `${id}.${fn.slug}_${t.name}`,
          name: `fn_${fn.slug}_${t.name}`,
          category: "c-basics",
          subcategory: fn.slug,
          categoryId: id,
          path: p,
          description: `C function pattern for ${fn.name} with ${t.cType}.`,
          signature: `${t.cType} fn_${fn.slug}_${t.name}(${t.cType} arg);`,
          code: `${t.cType} fn_${fn.slug}_${t.name}(${t.cType} arg) {\n    return arg;\n}`,
          dataType: t.name,
        })
      );
    }
  }

  // 7. ARRAYS: 1D, 2D, Operations
  const arrCategories = [
    { slug: "1d", name: "One Dimensional Arrays" },
    { slug: "2d", name: "Two Dimensional Arrays" },
    { slug: "operations", name: "Array Operations" },
  ];

  for (const ac of arrCategories) {
    const p = `${catPath}/arrays/${ac.slug}`;
    const id = p.replace(/\//g, ".");
    for (const t of SUPPORTED_TYPES) {
      components.push(
        createComponent({
          id: `${id}.${ac.slug}_init_${t.name}`,
          name: `arr_${ac.slug.replace(/-/g, "_")}_init_${t.name}`,
          category: "c-basics",
          subcategory: ac.slug,
          categoryId: id,
          path: p,
          description: `Array initialization and zero-fill for ${ac.name} of ${t.cType}.`,
          signature: `void arr_${ac.slug.replace(/-/g, "_")}_init_${t.name}(${t.cType}* arr, size_t n);`,
          code: `void arr_${ac.slug.replace(/-/g, "_")}_init_${t.name}(${t.cType}* arr, size_t n) {\n    if (!arr) return;\n    for (size_t i = 0; i < n; i++) arr[i] = ${t.sampleVal};\n}`,
          dataType: t.name,
        }),
        createComponent({
          id: `${id}.${ac.slug}_copy_${t.name}`,
          name: `arr_${ac.slug.replace(/-/g, "_")}_copy_${t.name}`,
          category: "c-basics",
          subcategory: ac.slug,
          categoryId: id,
          path: p,
          description: `Copies contiguous array of ${t.cType}.`,
          signature: `void arr_${ac.slug.replace(/-/g, "_")}_copy_${t.name}(const ${t.cType}* src, ${t.cType}* dest, size_t n);`,
          code: `void arr_${ac.slug.replace(/-/g, "_")}_copy_${t.name}(const ${t.cType}* src, ${t.cType}* dest, size_t n) {\n    if (!src || !dest) return;\n    for (size_t i = 0; i < n; i++) dest[i] = src[i];\n}`,
          dataType: t.name,
        })
      );
    }
  }

  // 8. STRINGS: Basics, Manipulation, Searching
  const strCategories = [
    { slug: "basics", name: "Basics" },
    { slug: "manipulation", name: "Manipulation" },
    { slug: "searching", name: "Searching" },
  ];

  for (const sc of strCategories) {
    const p = `${catPath}/strings/${sc.slug}`;
    const id = p.replace(/\//g, ".");
    for (const t of SUPPORTED_TYPES) {
      components.push(
        createComponent({
          id: `${id}.${sc.slug}_fmt_${t.name}`,
          name: `str_${sc.slug}_fmt_${t.name}`,
          category: "c-basics",
          subcategory: sc.slug,
          categoryId: id,
          path: p,
          description: `Formats ${t.cType} into formatted string buffer.`,
          signature: `int str_${sc.slug}_fmt_${t.name}(char* buf, size_t max_len, ${t.cType} val);`,
          code: `int str_${sc.slug}_fmt_${t.name}(char* buf, size_t max_len, ${t.cType} val) {\n    if (!buf || max_len == 0) return 0;\n    return snprintf(buf, max_len, "${t.fmt}", val);\n}`,
          dataType: t.name,
        })
      );
    }
  }

  return components;
}
