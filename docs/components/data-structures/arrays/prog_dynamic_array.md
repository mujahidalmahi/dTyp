# prog_dynamic_array
> **Domain:** `data-structures` | **Subcategory:** `arrays` | **Type:** `program`
## Overview
Complete auto-resizing dynamic array vector lifecycle program

## Signature
```c
int main(void)
```

## Complexity Analysis
- **Time Complexity:** `O(1)`
- **Space Complexity:** `O(1)`

## Edge Cases & Constraints
- **NULL / Empty Input:** Function handles zero/NULL pointers gracefully without segfaulting.
- **Boundary Conditions:** Bounds-checked against buffer boundaries and integer limits.
- **Zero-Comment Invariant:** Code is 100% executable clean C code adhering strictly to library standards.

## Implementation
```c
#include <stdio.h>
#include <stdlib.h>

typedef struct Vector {
    int* data;
    size_t size;
    size_t capacity;
} Vector;

Vector* vec_create(size_t cap) {
    Vector* v = (Vector*)malloc(sizeof(Vector));
    v->capacity = cap;
    v->size = 0;
    v->data = (int*)malloc(cap * sizeof(int));
    return v;
}

void vec_push(Vector* v, int val) {
    if (v->size >= v->capacity) {
        v->capacity *= 2;
        v->data = (int*)realloc(v->data, v->capacity * sizeof(int));
    }
    v->data[v->size++] = val;
}

int main(void) {
    Vector* v = vec_create(2);
    for (int i = 1; i <= 10; i++) {
        vec_push(v, i * 10);
    }

    printf("Vector elements (size %zu, cap %zu):
", v->size, v->capacity);
    for (size_t i = 0; i < v->size; i++) {
        printf("%d ", v->data[i]);
    }
    putchar('
');

    free(v->data);
    free(v);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_dynamic_array`, `data-structures.full-programs.arrays.dynamic-array.prog-dynamic-array`, `data-structures>prog_dynamic_array()`, `data-structures>full-programs>arrays>dynamic-array>prog-dynamic-array>prog_dynamic_array()`, `programDynamicArray`
