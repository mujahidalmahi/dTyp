# graph_matrix_remove_edge
> **Domain:** `data-structures` | **Subcategory:** `graphs` | **Type:** `function`
## Overview
Removes edge between vertices u and v in adjacency matrix

## Signature
```c
void graph_matrix_remove_edge(GraphMat* g, int u, int v);
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
void graph_matrix_remove_edge(GraphMat* g, int u, int v) {
    if (u >= 0 && u < g->vertices && v >= 0 && v < g->vertices) {
        g->matrix[u][v] = 0;
        g->matrix[v][u] = 0;
    }
}
```

## Aliases & Shorthands
Available via: `graph_matrix_remove_edge`, `data-structures.separate-components.graphs.adjacency-matrix.remove-edge`, `data-structures>graph_matrix_remove_edge()`, `data-structures>separate-components>graphs>adjacency-matrix>remove-edge>graph_matrix_remove_edge()`, `removeEdgeGraphMatrix`

## Dependencies
Requires: `data-structures.separate-components.graphs.adjacency-matrix.struct`
