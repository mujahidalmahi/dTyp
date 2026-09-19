# graph_dsu_count_sets
> **Domain:** `data-structures` | **Subcategory:** `graphs` | **Type:** `function`
## Overview
Counts total number of disjoint sets currently in DSU

## Signature
```c
int graph_dsu_count_sets(const GraphDSU* dsu);
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
int graph_dsu_count_sets(const GraphDSU* dsu) {
    int cnt = 0;
    for (int i = 0; i < dsu->n; i++) {
        if (dsu->parent[i] == i) cnt++;
    }
    return cnt;
}
```

## Aliases & Shorthands
Available via: `graph_dsu_count_sets`, `data-structures.separate-components.graphs.dsu.count-sets`, `data-structures>graph_dsu_count_sets()`, `data-structures>separate-components>graphs>dsu>count-sets>graph_dsu_count_sets()`, `countSetsDSU`

## Dependencies
Requires: `data-structures.separate-components.graphs.dsu.struct`
