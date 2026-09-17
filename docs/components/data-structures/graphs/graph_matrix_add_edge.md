# graph_matrix_add_edge
> **Domain:** `data-structures` | **Subcategory:** `graphs` | **Type:** `function`
## Overview
Adds undirected edge to graph adjacency matrix

## Signature
```c
void graph_matrix_add_edge(GraphMat* g, int u, int v);
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
void graph_matrix_add_edge(GraphMat* g, int u, int v) {
    if (u >= 0 && u < g->vertices && v >= 0 && v < g->vertices) {
        g->matrix[u][v] = 1;
        g->matrix[v][u] = 1;
    }
}
```

## Aliases & Shorthands
Available via: `graph_matrix_add_edge`, `data-structures.separate-components.graphs.adjacency-matrix.add-edge`, `data-structures>graph_matrix_add_edge()`, `data-structures>separate-components>graphs>adjacency-matrix>add-edge>graph_matrix_add_edge()`, `addEdgeGraphMatrix`

## Dependencies
Requires: `data-structures.separate-components.graphs.adjacency-matrix.struct`
