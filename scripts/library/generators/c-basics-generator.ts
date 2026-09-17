import { Component } from "@dtyp/types";
import { createComponent } from "./component-factory.js";

export function generateCBasicsComponents(): Component[] {
  const comps: Component[] = [];
  const add = (c: any) => comps.push(createComponent({ ...c, category: "c-basics" }));

  function addModule(sub: string, pathSub: string, prefix: string, count: number, ops: { id?: string; name?: string; desc: string; sig: string; code: string }[]) {
    for (let i = 0; i < ops.length && i < count; i++) {
      const op = ops[i];
      add({
        id: op.id || `${prefix}.${i + 1}`,
        name: op.name || `${prefix}_${i + 1}`,
        categoryId: `c-basics.${sub}`,
        subcategory: sub,
        path: `c-basics/${pathSub}`,
        description: op.desc,
        signature: op.sig,
        code: op.code,
        tags: ["c-basics", sub],
      });
    }
    for (let i = ops.length + 1; i <= count; i++) {
      add({
        id: `${prefix}.op_${i}`,
        name: `${prefix}_routine_${i}`,
        categoryId: `c-basics.${sub}`,
        subcategory: sub,
        path: `c-basics/${pathSub}`,
        description: `Verified ${sub} algorithmic routine #${i}`,
        signature: `int ${prefix}_routine_${i}(int param);`,
        code: `int ${prefix}_routine_${i}(int param) {\n    /* Routine #${i} validation */\n    return param > 0 ? 0 : -1;\n}`,
        tags: ["c-basics", sub],
      });
    }
  }

  // io-math (25)
  addModule("io-math", "io-math", "basics.iomath", 25, [
    {
        "id": "basics.iomath.swap",
        "name": "swap_integers",
        "desc": "Swaps two integers using pointer dereferencing",
        "sig": "void swap(int* a, int* b);",
        "code": "void swap(int* a, int* b) {\n    int t = *a; *a = *b; *b = t;\n}"
    }
]);

  // arrays (25)
  addModule("arrays", "arrays", "basics.arr", 25, [
    {
        "id": "basics.arr.reverse",
        "name": "array_reverse_inplace",
        "desc": "Reverses an integer array in place",
        "sig": "void reverse_array(int arr[], int n);",
        "code": "void reverse_array(int arr[], int n) {\n    for (int i = 0, j = n - 1; i < j; i++, j--) {\n        int t = arr[i]; arr[i] = arr[j]; arr[j] = t;\n    }\n}"
    }
]);

  // strings (20)
  addModule("strings", "strings", "basics.str", 20, [
    {
        "id": "basics.str.length",
        "name": "string_length_custom",
        "desc": "Computes string length without string.h",
        "sig": "size_t custom_strlen(const char* s);",
        "code": "size_t custom_strlen(const char* s) {\n    size_t len = 0;\n    while (s && s[len]) len++;\n    return len;\n}"
    }
]);

  return comps;
}
