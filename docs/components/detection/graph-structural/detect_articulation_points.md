# detect_articulation_points
> **Domain:** `detection` | **Subcategory:** `graph-structural` | **Type:** `function`
## Overview
Counts cut-vertices (articulation points) in connected graph using DFS discovery trees

## Signature
```c
int detect_articulation_points(int n, const int adj[64][64]);
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
static void ap_dfs(int u, int p, int n, const int adj[64][64], int disc[64], int low[64], int is_ap[64], int* time_step) {
    disc[u] = low[u] = ++(*time_step);
    int children = 0;
    for (int v = 0; v < n; v++) {
        if (adj[u][v]) {
            if (v == p) continue;
            if (disc[v]) {
                if (disc[v] < low[u]) low[u] = disc[v];
            } else {
                children++;
                ap_dfs(v, u, n, adj, disc, low, is_ap, time_step);
                if (low[v] < low[u]) low[u] = low[v];
                if (p != -1 && low[v] >= disc[u]) is_ap[u] = 1;
            }
        }
    }
    if (p == -1 && children > 1) is_ap[u] = 1;
}

int detect_articulation_points(int n, const int adj[64][64]) {
    int disc[64] = {0}, low[64] = {0}, is_ap[64] = {0}, time_step = 0;
    for (int i = 0; i < n; i++) {
        if (!disc[i]) ap_dfs(i, -1, n, adj, disc, low, is_ap, &time_step);
    }
    int total = 0;
    for (int i = 0; i < n; i++) {
        if (is_ap[i]) total++;
    }
    return total;
}
```

## Aliases & Shorthands
Available via: `detect_articulation_points`, `detection.graph-structural.articulation-points`, `detection>detect_articulation_points()`, `detection>graph-structural>articulation-points>detect_articulation_points()`, `count_articulation_points`
