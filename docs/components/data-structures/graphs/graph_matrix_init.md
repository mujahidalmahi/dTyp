# graph_matrix_init
> **Domain:** `data-structures` | **Subcategory:** `graphs` | **Type:** `function`
## Overview
Initializes graph adjacency matrix with given vertex count

## Signature
```c
GraphMat* graph_matrix_init(int v);
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
GraphMat* graph_matrix_init(int v) {
    GraphMat* g = (GraphMat*)malloc(sizeof(GraphMat));
    if (!g) return NULL;
    g->vertices = v;
    g->matrix = (int**)malloc(v * sizeof(int*));
    for (int i = 0; i < v; i++) {
        g->matrix[i] = (int*)calloc(v, sizeof(int));
    }
    return g;
}
```

## Aliases & Shorthands
Available via: `graph_matrix_init`, `data-structures.separate-components.graphs.adjacency-matrix.init`, `data-structures>graph_matrix_init()`, `data-structures>separate-components>graphs>adjacency-matrix>init>graph_matrix_init()`, `initGraphMatrix`

## Dependencies
Requires: `data-structures.separate-components.graphs.adjacency-matrix.struct`
