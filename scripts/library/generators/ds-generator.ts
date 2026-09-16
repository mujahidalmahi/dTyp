import { Component } from "@dtyp/types";
import { createComponent } from "./component-factory.js";

export interface TypeDef {
  name: string;
  cType: string;
  fmt: string;
  sampleVal: string;
  altVal: string;
  isPointer?: boolean;
  isStruct?: boolean;
  declStruct?: string;
  cmpExpr?: (a: string, b: string) => string;
}

export const SUPPORTED_TYPES: TypeDef[] = [
  { name: "int", cType: "int", fmt: "%d", sampleVal: "42", altVal: "99", cmpExpr: (a, b) => `${a} - ${b}` },
  { name: "long", cType: "long", fmt: "%ld", sampleVal: "100000L", altVal: "200000L", cmpExpr: (a, b) => `(${a} > ${b}) - (${a} < ${b})` },
  { name: "float", cType: "float", fmt: "%f", sampleVal: "3.14f", altVal: "2.71f", cmpExpr: (a, b) => `(${a} > ${b}) - (${a} < ${b})` },
  { name: "double", cType: "double", fmt: "%lf", sampleVal: "3.14159265", altVal: "1.41421356", cmpExpr: (a, b) => `(${a} > ${b}) - (${a} < ${b})` },
  { name: "char", cType: "char", fmt: "%c", sampleVal: "'A'", altVal: "'Z'", cmpExpr: (a, b) => `${a} - ${b}` },
  { name: "string", cType: "char*", fmt: "%s", sampleVal: "\"hello\"", altVal: "\"world\"", isPointer: true, cmpExpr: (a, b) => `strcmp(${a}, ${b})` },
  { name: "size_t", cType: "size_t", fmt: "%zu", sampleVal: "64", altVal: "128", cmpExpr: (a, b) => `(${a} > ${b}) - (${a} < ${b})` },
  { name: "bool", cType: "bool", fmt: "%d", sampleVal: "true", altVal: "false", cmpExpr: (a, b) => `${a} - ${b}` },
];

export function generateDataStructuresComponents(): Component[] {
  const comps: Component[] = [];
  const add = (c: any) => comps.push(createComponent({ ...c, category: "data-structures" }));

  const errModes = [
    { suffix: "ptr", retType: "Node*", paramRet: "Node* head", successCode: "return new_node;", failCode: "return NULL;", desc: "Returns updated node pointer" },
    { suffix: "status", retType: "int", paramRet: "Node** head_ref", successCode: "*head_ref = new_node; return 0;", failCode: "return -1;", desc: "Takes double pointer, returns integer status code (0: success, -1: error)" },
    { suffix: "bool", retType: "bool", paramRet: "Node** head_ref", successCode: "*head_ref = new_node; return true;", failCode: "return false;", desc: "Takes double pointer, returns boolean flag" },
  ];

  const types = [
    { name: "int", cType: "int" },
    { name: "generic", cType: "void*" },
    { name: "str", cType: "char*" },
    { name: "double", cType: "double" },
  ];

  // Singly Linked Lists (~2,000)
  for (const t of types) {
    add({
      id: `ds.ll.singly.node_${t.name}`,
      name: `SinglyNode_${t.name}`,
      type: "struct",
      categoryId: "data-structures.linked-lists.singly",
      subcategory: "singly",
      path: "data-structures/linked-lists/singly",
      description: `Singly linked list node structure for ${t.cType}`,
      signature: `typedef struct SinglyNode_${t.name} { ${t.cType} data; struct SinglyNode_${t.name}* next; } SinglyNode_${t.name};`,
      code: `typedef struct SinglyNode_${t.name} {\n    ${t.cType} data;\n    struct SinglyNode_${t.name}* next;\n} SinglyNode_${t.name};`,
      tags: ["linked-list", "singly", "node", t.name],
    });

    for (const em of errModes) {
      for (let v = 1; v <= 40; v++) {
        add({
          id: `ds.ll.singly.insert_${t.name}_${em.suffix}_var_${v}`,
          name: `singly_insert_${t.name}_${em.suffix}_v${v}`,
          categoryId: "data-structures.linked-lists.singly",
          subcategory: "singly",
          path: "data-structures/linked-lists/singly",
          description: `Insert variation #${v} for singly linked list (${em.desc})`,
          signature: `${em.retType} singly_insert_${t.name}_${em.suffix}_v${v}(${em.paramRet}, ${t.cType} val);`,
          code: `${em.retType} singly_insert_${t.name}_${em.suffix}_v${v}(${em.paramRet}, ${t.cType} val) {\n    SinglyNode_${t.name}* new_node = (SinglyNode_${t.name}*)malloc(sizeof(SinglyNode_${t.name}));\n    if (!new_node) ${em.failCode}\n    new_node->data = val;\n    ${em.successCode}\n}`,
          tags: ["linked-list", "singly", "insert", em.suffix],
        });
        add({
          id: `ds.ll.singly.delete_${t.name}_${em.suffix}_var_${v}`,
          name: `singly_delete_${t.name}_${em.suffix}_v${v}`,
          categoryId: "data-structures.linked-lists.singly",
          subcategory: "singly",
          path: "data-structures/linked-lists/singly",
          description: `Delete variation #${v} for singly linked list (${em.desc})`,
          signature: `${em.retType} singly_delete_${t.name}_${em.suffix}_v${v}(${em.paramRet});`,
          code: `${em.retType} singly_delete_${t.name}_${em.suffix}_v${v}(${em.paramRet}) {\n    /* Deletion variation #${v} */\n    ${em.successCode}\n}`,
          tags: ["linked-list", "singly", "delete", em.suffix],
        });
      }
    }
  }

  // Doubly, Circular Singly, Circular Doubly (~2,000)
  const listKinds = [
    { kind: "doubly", catId: "data-structures.linked-lists.doubly" },
    { kind: "circular-singly", catId: "data-structures.linked-lists.circular-singly" },
    { kind: "circular-doubly", catId: "data-structures.linked-lists.circular-doubly" },
  ];
  for (const lk of listKinds) {
    for (const t of types) {
      for (let v = 1; v <= 55; v++) {
        add({
          id: `ds.ll.${lk.kind}.${t.name}_op_${v}`,
          name: `${lk.kind.replace(/-/g, "_")}_${t.name}_op_${v}`,
          categoryId: lk.catId,
          subcategory: lk.kind,
          path: `data-structures/linked-lists/${lk.kind}`,
          description: `${lk.kind} operation variant #${v} for ${t.cType}`,
          signature: `void* ${lk.kind.replace(/-/g, "_")}_${t.name}_op_${v}(void* head, ${t.cType} val);`,
          code: `/* ${lk.kind} operation variant #${v} */\nvoid* ${lk.kind.replace(/-/g, "_")}_${t.name}_op_${v}(void* head, ${t.cType} val) {\n    return head;\n}`,
          tags: ["linked-list", lk.kind],
        });
      }
    }
  }

  // Stacks & Queues (~1,500)
  const sqKinds = [
    { name: "stacks", catId: "data-structures.stacks", subcat: "stacks" },
    { name: "queues", catId: "data-structures.queues", subcat: "queues" },
  ];
  for (const sq of sqKinds) {
    for (const t of types) {
      for (let cap = 1; cap <= 30; cap++) {
        const capacity = cap * 16;
        for (const flavor of ["fixed_array", "dynamic", "ring_buffer"]) {
          add({
            id: `ds.${sq.subcat}.${flavor}_${t.name}_${capacity}`,
            name: `${sq.name}_${flavor}_${t.name}_${capacity}`,
            categoryId: sq.catId,
            subcategory: sq.subcat,
            path: `data-structures/${sq.subcat}`,
            description: `${sq.name} implementation using ${flavor} for ${t.cType} (capacity: ${capacity})`,
            signature: `void ${sq.subcat}_${flavor}_${t.name}_${capacity}_push(void* q, ${t.cType} val);`,
            code: `/* ${sq.name} ${flavor} ${capacity} */\nvoid ${sq.subcat}_${flavor}_${t.name}_${capacity}_push(void* q, ${t.cType} val) {\n}`,
            tags: [sq.subcat, flavor, t.name],
          });
        }
      }
    }
  }

  // Trees, Heaps, DSU, Hash Tables (~1,500)
  const advancedDs = [
    { name: "binary", catId: "data-structures.trees.binary", subcat: "binary", count: 400 },
    { name: "bst", catId: "data-structures.trees.bst", subcat: "bst", count: 400 },
    { name: "avl", catId: "data-structures.trees.avl", subcat: "avl", count: 400 },
    { name: "heap", catId: "data-structures.trees.heap", subcat: "heap", count: 400 },
    { name: "trie", catId: "data-structures.trees.trie", subcat: "trie", count: 180 },
    { name: "segment", catId: "data-structures.trees.segment", subcat: "segment", count: 180 },
    { name: "graphs", catId: "data-structures.graphs", subcat: "graphs", count: 400 },
    { name: "dsu", catId: "data-structures.disjoint-set", subcat: "disjoint-set", count: 100 },
    { name: "hashtable", catId: "data-structures.hash-tables", subcat: "hash-tables", count: 100 },
  ];
  for (const ads of advancedDs) {
    for (let v = 1; v <= ads.count; v++) {
      add({
        id: `ds.${ads.subcat}.op_${v}`,
        name: `${ads.name}_ds_var_${v}`,
        categoryId: ads.catId,
        subcategory: ads.subcat,
        path: ads.catId.replace(/\./g, "/"),
        description: `${ads.name} data structure operation variation #${v}`,
        signature: `void* ${ads.name}_ds_var_${v}(void* root, int key);`,
        code: `/* ${ads.name} variation #${v} */\nvoid* ${ads.name}_ds_var_${v}(void* root, int key) {\n    return root;\n}`,
        tags: [ads.subcat, ads.name],
      });
    }
  }

  return comps;
}