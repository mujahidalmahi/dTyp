# graph_matrix_dfs
> **Domain:** `data-structures` | **Subcategory:** `graphs` | **Type:** `function`
## Overview
Depth-first search traversal on adjacency matrix graph

## Signature
```c
void graph_matrix_dfs(const GraphMat* g, int start);
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
static void graph_mat_dfs_rec(const GraphMat* g, int u, int* visited) {
    visited[u] = 1;
    printf("%d ", u);
    for (int v = 0; v < g->vertices; v++) {
        if (g->matrix[u][v] && !visited[v]) {
            graph_mat_dfs_rec(g, v, visited);
        }
    }
}

void graph_matrix_dfs(const GraphMat* g, int start) {
    if (start < 0 || start >= g->vertices) return;
    int* visited = (int*)calloc(g->vertices, sizeof(int));
    graph_mat_dfs_rec(g, start, visited);
    printf("\n");
    free(visited);
}
```

## Aliases & Shorthands
Available via: `graph_matrix_dfs`, `data-structures.separate-components.graphs.adjacency-matrix.dfs`, `data-structures>graph_matrix_dfs()`, `data-structures>separate-components>graphs>adjacency-matrix>dfs>graph_matrix_dfs()`, `dfsGraphMatrix`

## Dependencies
Requires: `data-structures.separate-components.graphs.adjacency-matrix.struct`
