# graph_list_remove_edge
> **Domain:** `data-structures` | **Subcategory:** `graphs` | **Type:** `function`
## Overview
Removes directed edge from u to v in adjacency list

## Signature
```c
int graph_list_remove_edge(GraphList* g, int u, int v);
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
int graph_list_remove_edge(GraphList* g, int u, int v) {
    if (u < 0 || u >= g->vertices) return 0;
    Node* cur = g->adj[u];
    Node* prev = NULL;
    while (cur && cur->dest != v) {
        prev = cur;
        cur = cur->next;
    }
    if (!cur) return 0;
    if (prev) prev->next = cur->next;
    else g->adj[u] = cur->next;
    free(cur);
    return 1;
}
```

## Aliases & Shorthands
Available via: `graph_list_remove_edge`, `data-structures.separate-components.graphs.adjacency-list.remove-edge`, `data-structures>graph_list_remove_edge()`, `data-structures>separate-components>graphs>adjacency-list>remove-edge>graph_list_remove_edge()`, `removeEdgeGraphList`

## Dependencies
Requires: `data-structures.separate-components.graphs.adjacency-list.struct`, `data-structures.separate-components.graphs.adjacency-list.node`
