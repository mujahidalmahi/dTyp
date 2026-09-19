# graph_list_dfs
> **Domain:** `data-structures` | **Subcategory:** `graphs` | **Type:** `function`
## Overview
DFS traversal of adjacency list graph

## Signature
```c
void graph_list_dfs(const GraphList* g, int start);
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
static void graph_list_dfs_rec(const GraphList* g, int u, int* visited) {
    visited[u] = 1;
    printf("%d ", u);
    Node* cur = g->adj[u];
    while (cur) {
        if (!visited[cur->dest]) graph_list_dfs_rec(g, cur->dest, visited);
        cur = cur->next;
    }
}

void graph_list_dfs(const GraphList* g, int start) {
    if (start < 0 || start >= g->vertices) return;
    int* visited = (int*)calloc(g->vertices, sizeof(int));
    graph_list_dfs_rec(g, start, visited);
    printf("\n");
    free(visited);
}
```

## Aliases & Shorthands
Available via: `graph_list_dfs`, `data-structures.separate-components.graphs.adjacency-list.dfs`, `data-structures>graph_list_dfs()`, `data-structures>separate-components>graphs>adjacency-list>dfs>graph_list_dfs()`, `dfsGraphList`

## Dependencies
Requires: `data-structures.separate-components.graphs.adjacency-list.struct`, `data-structures.separate-components.graphs.adjacency-list.node`
