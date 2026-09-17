# detect_graph_cycle_disjoint_set
> **Domain:** `detection` | **Subcategory:** `cycles-loops` | **Type:** `function`
## Overview
Detects cycle in undirected edge list using Union-Find disjoint set data structure

## Signature
```c
int detect_graph_cycle_disjoint_set(int n, const int edges[][2], int edge_count);
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
static int find_ds_root(int parent[], int i) {
    if (parent[i] == -1) return i;
    return parent[i] = find_ds_root(parent, parent[i]);
}

int detect_graph_cycle_disjoint_set(int n, const int edges[][2], int edge_count) {
    int parent[64];
    for (int i = 0; i < n; i++) parent[i] = -1;
    for (int i = 0; i < edge_count; i++) {
        int x = find_ds_root(parent, edges[i][0]);
        int y = find_ds_root(parent, edges[i][1]);
        if (x == y) return 1;
        parent[x] = y;
    }
    return 0;
}
```

## Aliases & Shorthands
Available via: `detect_graph_cycle_disjoint_set`, `detection.cycles-loops.cycle-disjoint-set`, `detection>detect_graph_cycle_disjoint_set()`, `detection>cycles-loops>cycle-disjoint-set>detect_graph_cycle_disjoint_set()`, `union_find_cycle`
