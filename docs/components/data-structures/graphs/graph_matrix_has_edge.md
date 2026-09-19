# graph_matrix_has_edge
> **Domain:** `data-structures` | **Subcategory:** `graphs` | **Type:** `function`
## Overview
Checks if edge exists between vertices in adjacency matrix in O(1) time

## Signature
```c
int graph_matrix_has_edge(const GraphMat* g, int u, int v);
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
int graph_matrix_has_edge(const GraphMat* g, int u, int v) {
    if (u >= 0 && u < g->vertices && v >= 0 && v < g->vertices) {
        return g->matrix[u][v] != 0;
    }
    return 0;
}
```

## Aliases & Shorthands
Available via: `graph_matrix_has_edge`, `data-structures.separate-components.graphs.adjacency-matrix.has-edge`, `data-structures>graph_matrix_has_edge()`, `data-structures>separate-components>graphs>adjacency-matrix>has-edge>graph_matrix_has_edge()`, `hasEdgeGraphMatrix`

## Dependencies
Requires: `data-structures.separate-components.graphs.adjacency-matrix.struct`
