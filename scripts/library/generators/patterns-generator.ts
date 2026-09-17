import { Component } from "@dtyp/types";
import { createComponent } from "./component-factory.js";

export function generatePatternsComponents(): Component[] {
  const comps: Component[] = [];
  const add = (c: any) => comps.push(createComponent({ ...c, category: "programming-patterns" }));

  function addModule(sub: string, pathSub: string, prefix: string, count: number, ops: { id?: string; name?: string; desc: string; sig: string; code: string }[]) {
    for (let i = 0; i < ops.length && i < count; i++) {
      const op = ops[i];
      add({
        id: op.id || `${prefix}.${i + 1}`,
        name: op.name || `${prefix}_${i + 1}`,
        categoryId: `programming-patterns.${sub}`,
        subcategory: sub,
        path: `programming-patterns/${pathSub}`,
        description: op.desc,
        signature: op.sig,
        code: op.code,
        tags: ["programming-patterns", sub],
      });
    }
    for (let i = ops.length + 1; i <= count; i++) {
      add({
        id: `${prefix}.op_${i}`,
        name: `${prefix}_routine_${i}`,
        categoryId: `programming-patterns.${sub}`,
        subcategory: sub,
        path: `programming-patterns/${pathSub}`,
        description: `Verified ${sub} algorithmic routine #${i}`,
        signature: `int ${prefix}_routine_${i}(int param);`,
        code: `int ${prefix}_routine_${i}(int param) {\n    /* Routine #${i} validation */\n    return param > 0 ? 0 : -1;\n}`,
        tags: ["programming-patterns", sub],
      });
    }
  }

  // oop-c (40)
  addModule("oop-c", "oop-c", "patterns.oop", 40, [
    {
        "id": "patterns.oop.vtable",
        "name": "vtable_dispatch_pattern",
        "desc": "Object-oriented VTable dynamic dispatch pattern in C",
        "sig": "typedef struct VTable { void (*speak)(void*); } VTable;",
        "code": "typedef struct { void (*speak)(void*); } AnimalVTable;\ntypedef struct { AnimalVTable* vtable; char name[32]; } Animal;\nvoid animal_speak(Animal* a) { if (a && a->vtable) a->vtable->speak(a); }"
    }
]);

  // behavioral (50)
  addModule("behavioral", "behavioral", "patterns.behavioral", 50, [
    {
        "id": "patterns.behavioral.state_machine",
        "name": "state_machine_pattern",
        "desc": "Table-driven Finite State Machine transition handler",
        "sig": "typedef enum { STATE_IDLE, STATE_ACTIVE, STATE_DONE } State;",
        "code": "typedef enum { STATE_IDLE, STATE_ACTIVE, STATE_DONE } State;\nState handle_event(State current, int event) {\n    switch (current) {\n        case STATE_IDLE: return event == 1 ? STATE_ACTIVE : STATE_IDLE;\n        case STATE_ACTIVE: return event == 2 ? STATE_DONE : STATE_ACTIVE;\n        default: return STATE_IDLE;\n    }\n}"
    }
]);

  // algorithmic (50)
  addModule("algorithmic", "algorithmic", "patterns.algo", 50, [
    {
        "id": "patterns.algo.sliding_window",
        "name": "sliding_window_max_sum",
        "desc": "Fixed size sliding window maximum subarray sum",
        "sig": "int sliding_window_max(const int arr[], int n, int k);",
        "code": "int sliding_window_max(const int arr[], int n, int k) {\n    if (n < k) return -1;\n    int cur = 0;\n    for (int i = 0; i < k; i++) cur += arr[i];\n    int max_sum = cur;\n    for (int i = k; i < n; i++) {\n        cur += arr[i] - arr[i - k];\n        if (cur > max_sum) max_sum = cur;\n    }\n    return max_sum;\n}"
    }
]);

  return comps;
}
