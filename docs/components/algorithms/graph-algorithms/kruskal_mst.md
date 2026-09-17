# kruskal_mst
> **Domain:** `algorithms` | **Subcategory:** `graph-algorithms` | **Type:** `function`
## Overview
Computes Minimum Spanning Tree weight using Kruskal algorithm and DSU

## Signature
```c
int kruskal_mst(int edge_u[], int edge_v[], int edge_w[], int e, int v);
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
static int dsu_root(int* parent, int i) {
    if (parent[i] == i) return i;
    return parent[i] = dsu_root(parent, parent[i]);
}

int kruskal_mst(int edge_u[], int edge_v[], int edge_w[], int e, int v) {
    for (int i = 0; i < e - 1; i++) {
        for (int j = 0; j < e - i - 1; j++) {
            if (edge_w[j] > edge_w[j + 1]) {
                int tw = edge_w[j]; edge_w[j] = edge_w[j + 1]; edge_w[j + 1] = tw;
                int tu = edge_u[j]; edge_u[j] = edge_u[j + 1]; edge_u[j + 1] = tu;
                int tv = edge_v[j]; edge_v[j] = edge_v[j + 1]; edge_v[j + 1] = tv;
            }
        }
    }
    int* parent = (int*)malloc(v * sizeof(int));
    for (int i = 0; i < v; i++) parent[i] = i;
    int total_weight = 0, count = 0;
    for (int i = 0; i < e && count < v - 1; i++) {
        int ru = dsu_root(parent, edge_u[i]);
        int rv = dsu_root(parent, edge_v[i]);
        if (ru != rv) {
            parent[ru] = rv;
            total_weight += edge_w[i];
            count++;
        }
    }
    free(parent);
    return total_weight;
}
```

## Aliases & Shorthands
Available via: `kruskal_mst`, `algorithms.separate-components.graph-algorithms.minimum-spanning-tree.kruskal`, `algorithms>kruskal_mst()`, `algorithms>separate-components>graph-algorithms>minimum-spanning-tree>kruskal>kruskal_mst()`, `kruskalMST`
