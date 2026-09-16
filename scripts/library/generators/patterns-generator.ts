import { Component } from "@dtyp/types";
import { createComponent } from "./component-factory.js";
import { SUPPORTED_TYPES } from "./ds-generator.js";

export function generatePatternsComponents(): Component[] {
  const components: Component[] = [];
  const baseCat = "programming-patterns";

  const patterns = [
    { slug: "oop-c", name: "Object-Oriented C (VTable & Encapsulation)" },
    { slug: "state-machines", name: "State Machine Pattern" },
    { slug: "observer-pattern", name: "Observer & Event Dispatcher" },
    { slug: "factory-pattern", name: "Abstract Factory Pattern" },
    { slug: "strategy-pattern", name: "Strategy & Comparator Pattern" },
    { slug: "command-pattern", name: "Command Queue & Undo Buffer" },
    { slug: "iterator-pattern", name: "Generic Iterator Pattern" },
    { slug: "singleton-pattern", name: "Thread-Safe Singleton" },
  ];

  for (const pat of patterns) {
    const catPath = `${baseCat}/${pat.slug}`;
    const catId = catPath.replace(/\//g, ".");

    for (const t of SUPPORTED_TYPES) {
      for (let v = 1; v <= 20; v++) {
        const typeName = t.name;
        const prefix = `pat_${pat.slug.replace(/-/g, "_")}_${typeName}_v${v}`;
        components.push(
          createComponent({
            id: `${catId}.${prefix}.impl`,
            name: `${prefix}_run`,
            category: "programming-patterns",
            subcategory: pat.slug,
            categoryId: catId,
            path: catPath,
            description: `${pat.name} implementation pattern for ${t.cType} (variation #${v})`,
            signature: `void ${prefix}_run(void* context, ${t.cType} val);`,
            code: `/* ${pat.name} for ${t.cType} variation #${v} */\nvoid ${prefix}_run(void* context, ${t.cType} val) {\n    /* Implementation */\n}`,
            tags: ["programming-patterns", pat.slug, t.name],
          })
        );
      }
    }
  }

  return components;
}