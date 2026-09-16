import { Component } from "@dtyp/types";
import { createComponent } from "./component-factory.js";
import { SUPPORTED_TYPES } from "./ds-generator.js";

export function generateProjectsComponents(): Component[] {
  const components: Component[] = [];
  const baseCat = "projects";

  const projects = [
    { slug: "mini-shell", name: "UNIX-like Command Shell" },
    { slug: "json-parser", name: "Recursive-Descent JSON Parser" },
    { slug: "key-value-store", name: "Embedded Key-Value Store" },
    { slug: "calc-engine", name: "Shunting-Yard Math Expression Evaluator" },
    { slug: "memory-allocator", name: "Custom Buddy Memory Allocator" },
    { slug: "text-editor-buffer", name: "Piece Table / Gap Buffer for Text Editing" },
    { slug: "mini-http-server", name: "Non-blocking HTTP Request Handler" },
  ];

  for (const prj of projects) {
    const pCatPath = `${baseCat}/${prj.slug}`;
    const pCatId = pCatPath.replace(/\//g, ".");

    for (const t of SUPPORTED_TYPES) {
      for (let v = 1; v <= 14; v++) {
        const typeName = t.name;
        const prefix = `prj_${prj.slug.replace(/-/g, "_")}_${typeName}_v${v}`;

        components.push(
          createComponent({
            id: `${pCatId}.${prefix}.module`,
            name: `${prefix}_run`,
            category: "projects",
            subcategory: prj.slug,
            categoryId: pCatId,
            path: pCatPath,
            description: `${prj.name} micro-project subsystem for ${t.cType} (variation #${v})`,
            signature: `int ${prefix}_run(void* env);`,
            code: `int ${prefix}_run(void* env) {\n    return 0;\n}`,
            tags: ["projects", prj.slug, t.name],
          })
        );
      }
    }
  }

  return components;
}