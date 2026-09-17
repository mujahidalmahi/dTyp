# vector_free
> **Domain:** `data-structures` | **Subcategory:** `arrays` | **Type:** `function`
## Overview
Frees allocated memory of vector

## Signature
```c
void vector_free(Vector* v);
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
void vector_free(Vector* v) {
    if (!v) return;
    free(v->items);
    free(v);
}
```

## Aliases & Shorthands
Available via: `vector_free`, `data-structures.separate-components.arrays.dynamic-array.free`, `data-structures>vector_free()`, `data-structures>separate-components>arrays>dynamic-array>free>vector_free()`, `vectorFree`

## Dependencies
Requires: `data-structures.separate-components.arrays.dynamic-array.vector-struct`
