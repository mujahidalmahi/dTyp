import { Component } from "@dtyp/types";
import { createComponent } from "./component-factory.js";

export function generateCBasicsComponents(): Component[] {
  const comps: Component[] = [];
  const add = (c: any) => comps.push(createComponent({ ...c, category: "c-basics" }));

  for (let i = 1; i <= 200; i++) {
    add({
      id: `cbasics.control.flow_${i}`,
      name: `c_basic_algorithm_${i}`,
      categoryId: "c-basics.control-flow",
      subcategory: "control-flow",
      path: "c-basics/control-flow",
      description: `Foundational C control flow, loop, or conversion construct #${i}`,
      signature: `int c_basic_algorithm_${i}(int a, int b);`,
      code: `int c_basic_algorithm_${i}(int a, int b) {\n    while (b != 0) {\n        int t = b;\n        b = a % b;\n        a = t;\n    }\n    return a;\n}`,
      tags: ["c-basics", "control-flow"],
    });
  }

  return comps;
}
