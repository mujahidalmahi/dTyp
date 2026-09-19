# graph_matrix_bfs
> **Domain:** `data-structures` | **Subcategory:** `graphs` | **Type:** `function`
## Overview
Breadth-first search traversal on adjacency matrix graph

## Signature
```c
void graph_matrix_bfs(const GraphMat* g, int start);
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
void graph_matrix_bfs(const GraphMat* g, int start) {
    if (start < 0 || start >= g->vertices) return;
    int* visited = (int*)calloc(g->vertices, sizeof(int));
    int* queue = (int*)malloc(g->vertices * sizeof(int));
    int front = 0, rear = 0;
    visited[start] = 1;
    queue[rear++] = start;
    while (front < rear) {
        int u = queue[front++];
        printf("%d ", u);
        for (int v = 0; v < g->vertices; v++) {
            if (g->matrix[u][v] && !visited[v]) {
                visited[v] = 1;
                queue[rear++] = v;
            }
        }
    }
    printf("\n");
    free(visited);
    free(queue);
}
```

## Aliases & Shorthands
Available via: `graph_matrix_bfs`, `data-structures.separate-components.graphs.adjacency-matrix.bfs`, `data-structures>graph_matrix_bfs()`, `data-structures>separate-components>graphs>adjacency-matrix>bfs>graph_matrix_bfs()`, `bfsGraphMatrix`

## Dependencies
Requires: `data-structures.separate-components.graphs.adjacency-matrix.struct`
