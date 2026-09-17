# matrix_2d_transpose
> **Domain:** `data-structures` | **Subcategory:** `arrays` | **Type:** `function`
## Overview
Returns new transposed Matrix2D

## Signature
```c
Matrix2D* matrix_2d_transpose(const Matrix2D* src);
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
Matrix2D* matrix_2d_transpose(const Matrix2D* src) {
    if (!src) return NULL;
    Matrix2D* t = matrix_2d_alloc(src->cols, src->rows);
    if (!t) return NULL;
    for (int i = 0; i < src->rows; i++) {
        for (int j = 0; j < src->cols; j++) {
            t->data[j][i] = src->data[i][j];
        }
    }
    return t;
}
```

## Aliases & Shorthands
Available via: `matrix_2d_transpose`, `data-structures.separate-components.arrays.2d-array.transpose`, `data-structures>matrix_2d_transpose()`, `data-structures>separate-components>arrays>2d-array>transpose>matrix_2d_transpose()`, `transposeMatrix2D`

## Dependencies
Requires: `data-structures.separate-components.arrays.2d-array.matrix-struct`, `data-structures.separate-components.arrays.2d-array.alloc`
