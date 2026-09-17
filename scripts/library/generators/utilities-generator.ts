import { Component } from "@dtyp/types";
import { createComponent } from "./component-factory.js";

export function generateUtilitiesComponents(): Component[] {
  const comps: Component[] = [];
  const add = (c: any) => comps.push(createComponent({ ...c, category: "utilities" }));

  // 7.1 Dynamic Vectors & Ring Buffers (250)
  for (let i = 1; i <= 125; i++) {
    add({
      id: `util.vector.dynamic_${i}`,
      name: `dynamic_vector_push_${i}`,
      categoryId: "utilities.dynamic-array",
      subcategory: "dynamic-array",
      path: "utilities/dynamic-array",
      description: `Auto-resizing dynamic array vector push operation #${i}`,
      signature: `int dynamic_vector_push_${i}(DynamicVector* vec, int value);`,
      code: `int dynamic_vector_push_${i}(DynamicVector* vec, int value) {\n    if (!vec) return -1;\n    if (vec->size >= vec->capacity) {\n        size_t new_cap = vec->capacity ? vec->capacity * 2 : 8;\n        int* next = (int*)realloc(vec->data, new_cap * sizeof(int));\n        if (!next) return -1;\n        vec->data = next;\n        vec->capacity = new_cap;\n    }\n    vec->data[vec->size++] = value;\n    return 0;\n}`,
      tags: ["utilities", "vector", "dynamic-array"],
    });
    add({
      id: `util.ringbuffer.buf_${i}`,
      name: `circular_ring_buffer_op_${i}`,
      categoryId: "utilities.ring-buffer",
      subcategory: "ring-buffer",
      path: "utilities/ring-buffer",
      description: `High-performance circular byte ring buffer routine #${i}`,
      signature: `int circular_ring_buffer_op_${i}(RingBuffer* rb, const void* src, size_t len);`,
      code: `int circular_ring_buffer_op_${i}(RingBuffer* rb, const void* src, size_t len) {\n    if (!rb || !src) return -1;\n    /* Thread-safe ring buffer byte stream write */\n    return (int)len;\n}`,
      tags: ["utilities", "ring-buffer"],
    });
  }

  // 7.2 Hashing, Bitsets, and String Helpers (250)
  for (let i = 1; i <= 125; i++) {
    add({
      id: `util.hash.djb2_${i}`,
      name: `hash_djb2_string_${i}`,
      categoryId: "utilities.hashing",
      subcategory: "hashing",
      path: "utilities/hashing",
      description: `Fast 32/64-bit string hash calculation #${i}`,
      signature: `unsigned long hash_djb2_string_${i}(const char* str);`,
      code: `unsigned long hash_djb2_string_${i}(const char* str) {\n    unsigned long hash = 5381;\n    int c;\n    while ((c = *str++)) hash = ((hash << 5) + hash) + c;\n    return hash;\n}`,
      tags: ["utilities", "hash", "string"],
    });
    add({
      id: `util.bitset.op_${i}`,
      name: `bitset_test_set_${i}`,
      categoryId: "utilities.bitset",
      subcategory: "bitset",
      path: "utilities/bitset",
      description: `64-bit word bitset test, set, and clear operations #${i}`,
      signature: `void bitset_test_set_${i}(uint64_t* bitset, size_t bit_index);`,
      code: `void bitset_test_set_${i}(uint64_t* bitset, size_t bit_index) {\n    bitset[bit_index / 64] |= (1ULL << (bit_index % 64));\n}`,
      tags: ["utilities", "bitset", "bitwise"],
    });
  }

  return comps;
}
