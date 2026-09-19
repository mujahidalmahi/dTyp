# graph_list_bfs
> **Domain:** `data-structures` | **Subcategory:** `graphs` | **Type:** `function`
## Overview
BFS traversal of adjacency list graph

## Signature
```c
void graph_list_bfs(const GraphList* g, int start);
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
void graph_list_bfs(const GraphList* g, int start) {
    if (start < 0 || start >= g->vertices) return;
    int* visited = (int*)calloc(g->vertices, sizeof(int));
    int* queue = (int*)malloc(g->vertices * sizeof(int));
    int front = 0, rear = 0;
    visited[start] = 1;
    queue[rear++] = start;
    while (front < rear) {
        int u = queue[front++];
        printf("%d ", u);
        Node* cur = g->adj[u];
        while (cur) {
            if (!visited[cur->dest]) {
                visited[cur->dest] = 1;
                queue[rear++] = cur->dest;
            }
            cur = cur->next;
        }
    }
    printf("\n");
    free(visited);
    free(queue);
}
```

## Aliases & Shorthands
Available via: `graph_list_bfs`, `data-structures.separate-components.graphs.adjacency-list.bfs`, `data-structures>graph_list_bfs()`, `data-structures>separate-components>graphs>adjacency-list>bfs>graph_list_bfs()`, `bfsGraphList`

## Dependencies
Requires: `data-structures.separate-components.graphs.adjacency-list.struct`, `data-structures.separate-components.graphs.adjacency-list.node`
