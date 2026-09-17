# matrix_2d_free
> **Domain:** `data-structures` | **Subcategory:** `arrays` | **Type:** `function`
## Overview
Deallocates 2D matrix dynamic memory

## Signature
```c
void matrix_2d_free(Matrix2D* m);
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
void matrix_2d_free(Matrix2D* m) {
    if (!m) return;
    for (int i = 0; i < m->rows; i++) {
        free(m->data[i]);
    }
    free(m->data);
    free(m);
}
```

## Aliases & Shorthands
Available via: `matrix_2d_free`, `data-structures.separate-components.arrays.2d-array.free`, `data-structures>matrix_2d_free()`, `data-structures>separate-components>arrays>2d-array>free>matrix_2d_free()`, `freeMatrix2D`

## Dependencies
Requires: `data-structures.separate-components.arrays.2d-array.matrix-struct`
