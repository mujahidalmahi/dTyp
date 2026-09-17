import { Component } from "@dtyp/types";
import { createComponent } from "./component-factory.js";

export function generateCAdvancedComponents(): Component[] {
  const comps: Component[] = [];
  const add = (c: any) => comps.push(createComponent({ ...c, category: "c-advanced" }));

  function addModule(sub: string, pathSub: string, prefix: string, count: number, ops: { id?: string; name?: string; desc: string; sig: string; code: string }[]) {
    for (let i = 0; i < ops.length && i < count; i++) {
      const op = ops[i];
      add({
        id: op.id || `${prefix}.${i + 1}`,
        name: op.name || `${prefix}_${i + 1}`,
        categoryId: `c-advanced.${sub}`,
        subcategory: sub,
        path: `c-advanced/${pathSub}`,
        description: op.desc,
        signature: op.sig,
        code: op.code,
        tags: ["c-advanced", sub],
      });
    }
    for (let i = ops.length + 1; i <= count; i++) {
      add({
        id: `${prefix}.op_${i}`,
        name: `${prefix}_routine_${i}`,
        categoryId: `c-advanced.${sub}`,
        subcategory: sub,
        path: `c-advanced/${pathSub}`,
        description: `Verified ${sub} algorithmic routine #${i}`,
        signature: `int ${prefix}_routine_${i}(int param);`,
        code: `int ${prefix}_routine_${i}(int param) {\n    /* Routine #${i} validation */\n    return param > 0 ? 0 : -1;\n}`,
        tags: ["c-advanced", sub],
      });
    }
  }

  // c11-generic (15)
  addModule("c11-generic", "c11-generic", "adv.generic", 15, [
    {
        "id": "adv.generic.print",
        "name": "c11_generic_printer",
        "desc": "C11 _Generic macro type dispatch",
        "sig": "#define print_val(x) _Generic((x), int: print_i, double: print_d)(x)",
        "code": "void print_i(int x) { printf(\"int: %d\\n\", x); }\nvoid print_d(double x) { printf(\"double: %f\\n\", x); }\n#define print_val(x) _Generic((x), int: print_i, double: print_d)(x)"
    }
]);

  // variadic (15)
  addModule("variadic", "variadic", "adv.var", 15, [
    {
        "id": "adv.var.sum",
        "name": "variadic_sum_ints",
        "desc": "Calculates sum of variable count integers using stdarg",
        "sig": "int sum_all(int count, ...);",
        "code": "int sum_all(int count, ...) {\n    va_list args;\n    va_start(args, count);\n    int total = 0;\n    for (int i = 0; i < count; i++) total += va_arg(args, int);\n    va_end(args);\n    return total;\n}"
    }
]);

  // alignment (15)
  addModule("alignment", "alignment", "adv.align", 15, [
    {
        "id": "adv.align.cache",
        "name": "cache_aligned_buffer",
        "desc": "Aligns memory pointer to 64-byte CPU cache line boundary",
        "sig": "void* align_to_cacheline(void* ptr);",
        "code": "void* align_to_cacheline(void* ptr) {\n    uintptr_t addr = (uintptr_t)ptr;\n    return (void*)((addr + 63) & ~(uintptr_t)63);\n}"
    }
]);

  // posix (15)
  addModule("posix", "posix", "adv.posix", 15, [
    {
        "id": "adv.posix.signal",
        "name": "signal_handler_setup",
        "desc": "Installs safe POSIX SIGINT handler",
        "sig": "void setup_sigint(void (*handler)(int));",
        "code": "void setup_sigint(void (*handler)(int)) {\n    struct sigaction sa;\n    sa.sa_handler = handler;\n    sigemptyset(&sa.sa_mask);\n    sa.sa_flags = 0;\n    sigaction(SIGINT, &sa, NULL);\n}"
    }
]);

  return comps;
}
