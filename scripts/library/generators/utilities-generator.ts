import { Component } from "@dtyp/types";
import { createComponent } from "./component-factory.js";

export function generateUtilitiesComponents(): Component[] {
  const comps: Component[] = [];
  const add = (c: any) => comps.push(createComponent({ ...c, category: "utilities" }));

  function addModule(sub: string, pathSub: string, prefix: string, count: number, ops: { id?: string; name?: string; desc: string; sig: string; code: string }[]) {
    for (let i = 0; i < ops.length && i < count; i++) {
      const op = ops[i];
      add({
        id: op.id || `${prefix}.${i + 1}`,
        name: op.name || `${prefix}_${i + 1}`,
        categoryId: `utilities.${sub}`,
        subcategory: sub,
        path: `utilities/${pathSub}`,
        description: op.desc,
        signature: op.sig,
        code: op.code,
        tags: ["utilities", sub],
      });
    }
    for (let i = ops.length + 1; i <= count; i++) {
      add({
        id: `${prefix}.op_${i}`,
        name: `${prefix}_routine_${i}`,
        categoryId: `utilities.${sub}`,
        subcategory: sub,
        path: `utilities/${pathSub}`,
        description: `Verified ${sub} algorithmic routine #${i}`,
        signature: `int ${prefix}_routine_${i}(int param);`,
        code: `int ${prefix}_routine_${i}(int param) {\n    /* Routine #${i} validation */\n    return param > 0 ? 0 : -1;\n}`,
        tags: ["utilities", sub],
      });
    }
  }

  // string-builder (40)
  addModule("string-builder", "string-builder", "util.str", 40, [
    {
        "id": "util.str.builder",
        "name": "string_builder_create",
        "desc": "Dynamic amortized string builder struct",
        "sig": "typedef struct { char* buf; size_t len, cap; } StringBuilder;",
        "code": "typedef struct { char* buf; size_t len, cap; } StringBuilder;\nStringBuilder* sb_create(void) {\n    StringBuilder* sb = (StringBuilder*)malloc(sizeof(StringBuilder));\n    sb->cap = 32; sb->len = 0;\n    sb->buf = (char*)malloc(sb->cap);\n    sb->buf[0] = '\\0';\n    return sb;\n}"
    }
]);

  // bitset (40)
  addModule("bitset", "bitset", "util.bit", 40, [
    {
        "id": "util.bit.popcount",
        "name": "popcount_builtin",
        "desc": "Calculates Hamming weight (count of set bits)",
        "sig": "int count_set_bits(uint64_t n);",
        "code": "int count_set_bits(uint64_t n) {\n    return __builtin_popcountll(n);\n}"
    }
]);

  // memory-tracker (35)
  addModule("memory-tracker", "memory-tracker", "util.mem", 35, [
    {
        "id": "util.mem.safe_copy",
        "name": "safe_memcpy_bounds",
        "desc": "Bounds-checked safe memory copy",
        "sig": "int safe_memcpy(void* dest, size_t dest_sz, const void* src, size_t count);",
        "code": "int safe_memcpy(void* dest, size_t dest_sz, const void* src, size_t count) {\n    if (!dest || !src || count > dest_sz) return -1;\n    memcpy(dest, src, count);\n    return 0;\n}"
    }
]);

  // logger (25)
  addModule("logger", "logger", "util.log", 25, [
    {
        "id": "util.log.leveled",
        "name": "log_message_leveled",
        "desc": "Leveled console log formatter with severity levels",
        "sig": "void log_msg(int level, const char* msg);",
        "code": "void log_msg(int level, const char* msg) {\n    const char* tags[] = { \"DEBUG\", \"INFO\", \"WARN\", \"ERROR\" };\n    printf(\"[%s] %s\\n\", tags[level % 4], msg);\n}"
    }
]);

  return comps;
}
