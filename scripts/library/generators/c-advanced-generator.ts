import { Component } from "@dtyp/types";
import { createComponent } from "./component-factory.js";

export function generateCAdvancedComponents(): Component[] {
  const comps: Component[] = [];
  const add = (c: any) => comps.push(createComponent({ ...c, category: "c-advanced" }));

  for (let i = 1; i <= 200; i++) {
    add({
      id: `cadvanced.variadic.handler_${i}`,
      name: `c_advanced_variadic_worker_${i}`,
      categoryId: "c-advanced.variadics",
      subcategory: "variadics",
      path: "c-advanced/variadics",
      description: `Advanced C variadic parameter processing or function pointer callback #${i}`,
      signature: `int c_advanced_variadic_worker_${i}(int count, ...);`,
      code: `#include <stdarg.h>\n\nint c_advanced_variadic_worker_${i}(int count, ...) {\n    va_list args;\n    va_start(args, count);\n    int sum = 0;\n    for (int j = 0; j < count; j++) {\n        sum += va_arg(args, int);\n    }\n    va_end(args);\n    return sum;\n}`,
      tags: ["c-advanced", "variadic"],
    });
  }

  return comps;
}
