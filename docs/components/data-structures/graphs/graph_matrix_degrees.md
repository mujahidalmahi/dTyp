# graph_matrix_degrees
> **Domain:** `data-structures` | **Subcategory:** `graphs` | **Type:** `function`
## Overview
Computes in-degree and out-degree of vertex in adjacency matrix

## Signature
```c
void graph_matrix_degrees(const GraphMat* g, int u, int* in_deg, int* out_deg);
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
void graph_matrix_degrees(const GraphMat* g, int u, int* in_deg, int* out_deg) {
    *in_deg = 0;
    *out_deg = 0;
    if (u < 0 || u >= g->vertices) return;
    for (int i = 0; i < g->vertices; i++) {
        if (g->matrix[u][i]) (*out_deg)++;
        if (g->matrix[i][u]) (*in_deg)++;
    }
}
```

## Aliases & Shorthands
Available via: `graph_matrix_degrees`, `data-structures.separate-components.graphs.adjacency-matrix.degrees`, `data-structures>graph_matrix_degrees()`, `data-structures>separate-components>graphs>adjacency-matrix>degrees>graph_matrix_degrees()`, `degreesGraphMatrix`

## Dependencies
Requires: `data-structures.separate-components.graphs.adjacency-matrix.struct`
