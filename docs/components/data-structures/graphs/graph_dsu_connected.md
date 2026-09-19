# graph_dsu_connected
> **Domain:** `data-structures` | **Subcategory:** `graphs` | **Type:** `function`
## Overview
Checks if two elements belong to the same disjoint set

## Signature
```c
int graph_dsu_connected(GraphDSU* dsu, int x, int y);
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
int graph_dsu_connected(GraphDSU* dsu, int x, int y) {
    return graph_dsu_find(dsu, x) == graph_dsu_find(dsu, y);
}
```

## Aliases & Shorthands
Available via: `graph_dsu_connected`, `data-structures.separate-components.graphs.dsu.connected`, `data-structures>graph_dsu_connected()`, `data-structures>separate-components>graphs>dsu>connected>graph_dsu_connected()`, `connectedDSU`

## Dependencies
Requires: `data-structures.separate-components.graphs.dsu.struct`, `data-structures.separate-components.graphs.dsu.find`
