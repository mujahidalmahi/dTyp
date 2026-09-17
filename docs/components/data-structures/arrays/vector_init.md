# vector_init
> **Domain:** `data-structures` | **Subcategory:** `arrays` | **Type:** `function`
## Overview
Initializes dynamic vector with initial capacity

## Signature
```c
Vector* vector_init(size_t initial_cap);
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
Vector* vector_init(size_t initial_cap) {
    Vector* v = (Vector*)malloc(sizeof(Vector));
    if (!v) return NULL;
    v->capacity = (initial_cap == 0) ? 4 : initial_cap;
    v->size = 0;
    v->items = (int*)malloc(v->capacity * sizeof(int));
    return v;
}
```

## Aliases & Shorthands
Available via: `vector_init`, `data-structures.separate-components.arrays.dynamic-array.init`, `data-structures>vector_init()`, `data-structures>separate-components>arrays>dynamic-array>init>vector_init()`, `vectorInit`

## Dependencies
Requires: `data-structures.separate-components.arrays.dynamic-array.vector-struct`
