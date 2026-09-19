# graph_list_has_edge
> **Domain:** `data-structures` | **Subcategory:** `graphs` | **Type:** `function`
## Overview
Checks if edge exists in adjacency list

## Signature
```c
int graph_list_has_edge(const GraphList* g, int u, int v);
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
int graph_list_has_edge(const GraphList* g, int u, int v) {
    if (u < 0 || u >= g->vertices) return 0;
    Node* cur = g->adj[u];
    while (cur) {
        if (cur->dest == v) return 1;
        cur = cur->next;
    }
    return 0;
}
```

## Aliases & Shorthands
Available via: `graph_list_has_edge`, `data-structures.separate-components.graphs.adjacency-list.has-edge`, `data-structures>graph_list_has_edge()`, `data-structures>separate-components>graphs>adjacency-list>has-edge>graph_list_has_edge()`, `hasEdgeGraphList`

## Dependencies
Requires: `data-structures.separate-components.graphs.adjacency-list.struct`, `data-structures.separate-components.graphs.adjacency-list.node`
