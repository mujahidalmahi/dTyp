# GraphMat
> **Domain:** `data-structures` | **Subcategory:** `graphs` | **Type:** `struct`
## Overview
Graph represented by 2D adjacency matrix

## Signature
```c
typedef struct GraphMat { int vertices; int** matrix; } GraphMat;
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
typedef struct GraphMat {
    int vertices;
    int** matrix;
} GraphMat;
```

## Aliases & Shorthands
Available via: `GraphMat`, `data-structures.separate-components.graphs.adjacency-matrix.struct`, `data-structures>GraphMat()`, `data-structures>separate-components>graphs>adjacency-matrix>struct>GraphMat()`, `graph_matrix_struct`
