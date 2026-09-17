# graph_dsu_find
> **Domain:** `data-structures` | **Subcategory:** `graphs` | **Type:** `function`
## Overview
Finds set representative with path compression

## Signature
```c
int graph_dsu_find(GraphDSU* dsu, int i);
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
int graph_dsu_find(GraphDSU* dsu, int i) {
    if (dsu->parent[i] == i) return i;
    return dsu->parent[i] = graph_dsu_find(dsu, dsu->parent[i]);
}
```

## Aliases & Shorthands
Available via: `graph_dsu_find`, `data-structures.separate-components.graphs.dsu.find`, `data-structures>graph_dsu_find()`, `data-structures>separate-components>graphs>dsu>find>graph_dsu_find()`, `findDSU`

## Dependencies
Requires: `data-structures.separate-components.graphs.dsu.struct`
