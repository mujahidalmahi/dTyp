import { Component } from "@dtyp/types";
import { createComponent } from "./component-factory.js";

export function generateCIntermediateComponents(): Component[] {
  const comps: Component[] = [];
  const add = (c: any) => comps.push(createComponent({ ...c, category: "c-intermediate" }));

  for (let i = 1; i <= 200; i++) {
    add({
      id: `cintermediate.pointer.math_${i}`,
      name: `c_pointer_buffer_transform_${i}`,
      categoryId: "c-intermediate.pointers",
      subcategory: "pointers",
      path: "c-intermediate/pointers",
      description: `Pointer arithmetic and dynamic memory manipulation #${i}`,
      signature: `void c_pointer_buffer_transform_${i}(int* start, int* end);`,
      code: `void c_pointer_buffer_transform_${i}(int* start, int* end) {\n    while (start < end) {\n        int temp = *start;\n        *start = *end;\n        *end = temp;\n        start++;\n        end--;\n    }\n}`,
      tags: ["c-intermediate", "pointers"],
    });
  }

  return comps;
}
