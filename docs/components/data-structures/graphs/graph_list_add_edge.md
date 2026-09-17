# graph_list_add_edge
> **Domain:** `data-structures` | **Subcategory:** `graphs` | **Type:** `function`
## Overview
Adds directed edge from u to v in graph adjacency list

## Signature
```c
void graph_list_add_edge(GraphList* g, int u, int v);
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
void graph_list_add_edge(GraphList* g, int u, int v) {
    if (u < 0 || u >= g->vertices) return;
    Node* n = (Node*)malloc(sizeof(Node));
    if (!n) return;
    n->dest = v;
    n->next = g->adj[u];
    g->adj[u] = n;
}
```

## Aliases & Shorthands
Available via: `graph_list_add_edge`, `data-structures.separate-components.graphs.adjacency-list.add-edge`, `data-structures>graph_list_add_edge()`, `data-structures>separate-components>graphs>adjacency-list>add-edge>graph_list_add_edge()`, `addEdgeGraphList`

## Dependencies
Requires: `data-structures.separate-components.graphs.adjacency-list.struct`, `data-structures.separate-components.graphs.adjacency-list.node`
