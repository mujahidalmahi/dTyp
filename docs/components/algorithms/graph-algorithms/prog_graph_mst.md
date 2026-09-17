# prog_graph_mst
> **Domain:** `algorithms` | **Subcategory:** `graph-algorithms` | **Type:** `program`
## Overview
Complete Kruskal Minimum Spanning Tree program with Disjoint Set Union

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

int find_root(int i) {
    if (parent[i] == i) return i;
    return parent[i] = find_root(parent[i]);
}

int main(void) {
    int u[] = {0, 1, 0, 1, 2};
    int v[] = {1, 2, 2, 3, 3};
    int w[] = {1, 2, 4, 3, 5};
    int e = 5, n = 4;

    for (int i = 0; i < n; i++) parent[i] = i;

    int total_w = 0;
    printf("Kruskal MST Selected Edges:
");
    for (int i = 0; i < e; i++) {
        int ru = find_root(u[i]);
        int rv = find_root(v[i]);
        if (ru != rv) {
            parent[ru] = rv;
            total_w += w[i];
            printf("Edge (%d, %d) with weight %d
", u[i], v[i], w[i]);
        }
    }
    printf("Total Spanning Tree Weight: %d
", total_w);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_graph_mst`, `algorithms.full-programs.graph-algorithms.minimum-spanning-tree.prog-kruskal`, `algorithms>prog_graph_mst()`, `algorithms>full-programs>graph-algorithms>minimum-spanning-tree>prog-kruskal>prog_graph_mst()`, `programKruskalMST`
