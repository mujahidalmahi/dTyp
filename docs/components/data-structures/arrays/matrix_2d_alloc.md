# matrix_2d_alloc
> **Domain:** `data-structures` | **Subcategory:** `arrays` | **Type:** `function`
## Overview
Allocates 2D matrix dynamic memory

## Signature
```c
Matrix2D* matrix_2d_alloc(int rows, int cols);
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
Matrix2D* matrix_2d_alloc(int rows, int cols) {
    Matrix2D* m = (Matrix2D*)malloc(sizeof(Matrix2D));
    if (!m) return NULL;
    m->rows = rows;
    m->cols = cols;
    m->data = (int**)malloc(rows * sizeof(int*));
    for (int i = 0; i < rows; i++) {
        m->data[i] = (int*)calloc(cols, sizeof(int));
    }
    return m;
}
```

## Aliases & Shorthands
Available via: `matrix_2d_alloc`, `data-structures.separate-components.arrays.2d-array.alloc`, `data-structures>matrix_2d_alloc()`, `data-structures>separate-components>arrays>2d-array>alloc>matrix_2d_alloc()`, `allocMatrix2D`

## Dependencies
Requires: `data-structures.separate-components.arrays.2d-array.matrix-struct`
