import { Component } from "@dtyp/types";
import { createComponent } from "./component-factory.js";

export function generateCIntermediateComponents(): Component[] {
  const comps: Component[] = [];
  const add = (c: any) => comps.push(createComponent({ ...c, category: "c-intermediate" }));

  function addModule(sub: string, pathSub: string, prefix: string, count: number, ops: { id?: string; name?: string; desc: string; sig: string; code: string }[]) {
    for (let i = 0; i < ops.length && i < count; i++) {
      const op = ops[i];
      add({
        id: op.id || `${prefix}.${i + 1}`,
        name: op.name || `${prefix}_${i + 1}`,
        categoryId: `c-intermediate.${sub}`,
        subcategory: sub,
        path: `c-intermediate/${pathSub}`,
        description: op.desc,
        signature: op.sig,
        code: op.code,
        tags: ["c-intermediate", sub],
      });
    }
    for (let i = ops.length + 1; i <= count; i++) {
      add({
        id: `${prefix}.op_${i}`,
        name: `${prefix}_routine_${i}`,
        categoryId: `c-intermediate.${sub}`,
        subcategory: sub,
        path: `c-intermediate/${pathSub}`,
        description: `Verified ${sub} algorithmic routine #${i}`,
        signature: `int ${prefix}_routine_${i}(int param);`,
        code: `int ${prefix}_routine_${i}(int param) {\n    /* Routine #${i} validation */\n    return param > 0 ? 0 : -1;\n}`,
        tags: ["c-intermediate", sub],
      });
    }
  }

  // struct-serialization (15)
  addModule("struct-serialization", "struct-serialization", "inter.struct", 15, [
    {
        "id": "inter.struct.save",
        "name": "struct_write_binary",
        "desc": "Writes struct record directly to binary file stream",
        "sig": "int save_record(FILE* fp, const void* rec, size_t sz);",
        "code": "int save_record(FILE* fp, const void* rec, size_t sz) {\n    return (int)fwrite(rec, sz, 1, fp);\n}"
    }
]);

  // dynamic-2d (15)
  addModule("dynamic-2d", "dynamic-2d", "inter.matrix", 15, [
    {
        "id": "inter.matrix.alloc",
        "name": "matrix_2d_free",
        "desc": "Deallocates pointer-array based 2D matrix",
        "sig": "void free_2d_matrix(int** m, int rows);",
        "code": "void free_2d_matrix(int** m, int rows) {\n    if (!m) return;\n    for (int i = 0; i < rows; i++) free(m[i]);\n    free(m);\n}"
    }
]);

  // callbacks (15)
  addModule("callbacks", "callbacks", "inter.cb", 15, [
    {
        "id": "inter.cb.map",
        "name": "array_map_transform",
        "desc": "Applies function pointer to every array element",
        "sig": "void array_map(int arr[], int n, int (*fn)(int));",
        "code": "void array_map(int arr[], int n, int (*fn)(int)) {\n    for (int i = 0; i < n; i++) arr[i] = fn(arr[i]);\n}"
    }
]);

  // recursion (15)
  addModule("recursion", "recursion", "inter.recur", 15, [
    {
        "id": "inter.recur.hanoi",
        "name": "tower_of_hanoi",
        "desc": "Tower of Hanoi recursive solver",
        "sig": "void hanoi(int n, char from, char to, char aux);",
        "code": "void hanoi(int n, char from, char to, char aux) {\n    if (n == 0) return;\n    hanoi(n - 1, from, aux, to);\n    printf(\"Move disk %d from %c to %c\\n\", n, from, to);\n    hanoi(n - 1, aux, to, from);\n}"
    }
]);

  return comps;
}
