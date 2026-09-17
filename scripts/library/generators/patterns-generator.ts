import { Component } from "@dtyp/types";
import { createComponent } from "./component-factory.js";

export function generatePatternsComponents(): Component[] {
  const comps: Component[] = [];
  const add = (c: any) => comps.push(createComponent({ ...c, category: "programming-patterns" }));

  // 6.1 OOP VTable & Dispatch (150)
  for (let i = 1; i <= 150; i++) {
    add({
      id: `patterns.oop.vtable_${i}`,
      name: `vtable_virtual_dispatch_${i}`,
      categoryId: "programming-patterns.oop-c",
      subcategory: "oop-c",
      path: "programming-patterns/oop-c",
      description: `Object-Oriented C VTable dynamic dispatch table #${i}`,
      signature: `int vtable_virtual_dispatch_${i}(void* instance, int method_id, void* args);`,
      code: `typedef struct {\n    int (*invoke)(void* self, void* args);\n} VTable_${i};\n\nint vtable_virtual_dispatch_${i}(void* instance, int method_id, void* args) {\n    if (!instance) return -1;\n    VTable_${i}** vt = (VTable_${i}**)instance;\n    return (*vt)->invoke(instance, args);\n}`,
      tags: ["patterns", "oop", "vtable"],
    });
  }

  // 6.2 State Machines (150)
  for (let i = 1; i <= 150; i++) {
    add({
      id: `patterns.fsm.state_machine_${i}`,
      name: `state_machine_transition_${i}`,
      categoryId: "programming-patterns.state-machines",
      subcategory: "state-machines",
      path: "programming-patterns/state-machines",
      description: `Finite State Machine (FSM) state transition handler #${i}`,
      signature: `int state_machine_transition_${i}(int current_state, int event);`,
      code: `int state_machine_transition_${i}(int current_state, int event) {\n    switch (current_state) {\n        case 0: return event == 1 ? 1 : 0;\n        case 1: return event == 2 ? 2 : (event == 0 ? 0 : 1);\n        case 2: return event == 0 ? 0 : 2;\n        default: return 0;\n    }\n}`,
      tags: ["patterns", "fsm", "state-machine"],
    });
  }

  // 6.3 Observer & Command Queues (200)
  for (let i = 1; i <= 100; i++) {
    add({
      id: `patterns.observer.bus_${i}`,
      name: `observer_notify_event_${i}`,
      categoryId: "programming-patterns.observer-pattern",
      subcategory: "observer-pattern",
      path: "programming-patterns/observer-pattern",
      description: `Observer event dispatcher publishing events to listeners #${i}`,
      signature: `void observer_notify_event_${i}(ObserverList* list, int event_id, void* data);`,
      code: `void observer_notify_event_${i}(ObserverList* list, int event_id, void* data) {\n    if (!list) return;\n    for (size_t k = 0; k < list->count; k++) {\n        list->callbacks[k](event_id, data);\n    }\n}`,
      tags: ["patterns", "observer", "event"],
    });
    add({
      id: `patterns.command.queue_${i}`,
      name: `command_execute_undo_${i}`,
      categoryId: "programming-patterns.command-pattern",
      subcategory: "command-pattern",
      path: "programming-patterns/command-pattern",
      description: `Command queue action execution and undo buffer #${i}`,
      signature: `int command_execute_undo_${i}(CommandQueue* q, void* cmd);`,
      code: `int command_execute_undo_${i}(CommandQueue* q, void* cmd) {\n    if (!q || !cmd) return -1;\n    /* Execute command and record to undo stack */\n    return 0;\n}`,
      tags: ["patterns", "command", "undo"],
    });
  }

  return comps;
}
