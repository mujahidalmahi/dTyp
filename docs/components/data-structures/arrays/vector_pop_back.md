# vector_pop_back
> **Domain:** `data-structures` | **Subcategory:** `arrays` | **Type:** `function`
## Overview
Removes and returns last element from vector

## Signature
```c
int vector_pop_back(Vector* v);
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
int vector_pop_back(Vector* v) {
    if (v->size == 0) return 0;
    return v->items[--v->size];
}
```

## Aliases & Shorthands
Available via: `vector_pop_back`, `data-structures.separate-components.arrays.dynamic-array.pop-back`, `data-structures>vector_pop_back()`, `data-structures>separate-components>arrays>dynamic-array>pop-back>vector_pop_back()`, `vectorPopBack`

## Dependencies
Requires: `data-structures.separate-components.arrays.dynamic-array.vector-struct`
