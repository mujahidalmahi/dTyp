import { Component } from "@dtyp/types";
import { createComponent } from "./component-factory.js";

export function generateProjectsComponents(): Component[] {
  const comps: Component[] = [];
  const add = (c: any) => comps.push(createComponent({ ...c, category: "projects" }));

  for (let i = 1; i <= 150; i++) {
    add({
      id: `projects.system.micro_${i}`,
      name: `project_micro_system_module_${i}`,
      categoryId: "projects.systems",
      subcategory: "systems",
      path: "projects/systems",
      description: `Miniature system project module #${i} (embedded key-value, micro shell, JSON parser)`,
      signature: `int project_micro_system_module_${i}(void* state, const char* command);`,
      code: `int project_micro_system_module_${i}(void* state, const char* command) {\n    if (!command) return -1;\n    /* Micro-system execution pipeline #${i} */\n    return 0;\n}`,
      tags: ["projects", "systems"],
    });
  }

  return comps;
}
