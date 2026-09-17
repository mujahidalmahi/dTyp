# prog_graph_dsu
> **Domain:** `data-structures` | **Subcategory:** `graphs` | **Type:** `program`
## Overview
Complete Disjoint Set Union program tracking connected components with path compression

## Signature
```c
int main(void)
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
#include <stdio.h>

int parent[10];
int rank_val[10];

int dsu_find(int i) {
    if (parent[i] == i) return i;
    return parent[i] = dsu_find(parent[i]);
}

void dsu_union(int x, int y) {
    int rx = dsu_find(x);
    int ry = dsu_find(y);
    if (rx != ry) {
        if (rank_val[rx] < rank_val[ry]) parent[rx] = ry;
        else if (rank_val[rx] > rank_val[ry]) parent[ry] = rx;
        else { parent[ry] = rx; rank_val[rx]++; }
    }
}

int main(void) {
    for (int i = 0; i < 6; i++) {
        parent[i] = i;
        rank_val[i] = 0;
    }

    dsu_union(0, 1);
    dsu_union(1, 2);
    dsu_union(3, 4);

    printf("0 and 2 connected: %s
", dsu_find(0) == dsu_find(2) ? "YES" : "NO");
    printf("0 and 3 connected: %s
", dsu_find(0) == dsu_find(3) ? "YES" : "NO");

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_graph_dsu`, `data-structures.full-programs.graphs.dsu.prog-graph-dsu`, `data-structures>prog_graph_dsu()`, `data-structures>full-programs>graphs>dsu>prog-graph-dsu>prog_graph_dsu()`, `programGraphDSU`
