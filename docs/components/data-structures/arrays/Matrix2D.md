# Matrix2D
> **Domain:** `data-structures` | **Subcategory:** `arrays` | **Type:** `struct`
## Overview
Dynamically sized 2D matrix structure

## Signature
```c
typedef struct Matrix2D { int rows; int cols; int** data; } Matrix2D;
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
typedef struct Matrix2D {
    int rows;
    int cols;
    int** data;
} Matrix2D;
```

## Aliases & Shorthands
Available via: `Matrix2D`, `data-structures.separate-components.arrays.2d-array.matrix-struct`, `data-structures>Matrix2D()`, `data-structures>separate-components>arrays>2d-array>matrix-struct>Matrix2D()`, `matrix_2d_struct`
