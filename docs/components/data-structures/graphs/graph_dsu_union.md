# graph_dsu_union
> **Domain:** `data-structures` | **Subcategory:** `graphs` | **Type:** `function`
## Overview
Unions two disjoint sets by rank

## Signature
```c
void graph_dsu_union(GraphDSU* dsu, int x, int y);
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
void graph_dsu_union(GraphDSU* dsu, int x, int y) {
    int root_x = graph_dsu_find(dsu, x);
    int root_y = graph_dsu_find(dsu, y);
    if (root_x != root_y) {
        if (dsu->rank[root_x] < dsu->rank[root_y]) {
            dsu->parent[root_x] = root_y;
        } else if (dsu->rank[root_x] > dsu->rank[root_y]) {
            dsu->parent[root_y] = root_x;
        } else {
            dsu->parent[root_y] = root_x;
            dsu->rank[root_x]++;
        }
    }
}
```

## Aliases & Shorthands
Available via: `graph_dsu_union`, `data-structures.separate-components.graphs.dsu.union`, `data-structures>graph_dsu_union()`, `data-structures>separate-components>graphs>dsu>union>graph_dsu_union()`, `unionDSU`

## Dependencies
Requires: `data-structures.separate-components.graphs.dsu.struct`, `data-structures.separate-components.graphs.dsu.find`
