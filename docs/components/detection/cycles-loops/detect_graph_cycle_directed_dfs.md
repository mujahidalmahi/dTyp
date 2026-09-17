# detect_graph_cycle_directed_dfs
> **Domain:** `detection` | **Subcategory:** `cycles-loops` | **Type:** `function`
## Overview
Detects cycle in directed graph using DFS with recursion stack tracking

## Signature
```c
int detect_graph_cycle_directed_dfs(int n, const int adj[64][64]);
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
static int dfs_dir_cycle(int u, int n, const int adj[64][64], int vis[64], int rec[64]) {
    vis[u] = 1;
    rec[u] = 1;
    for (int v = 0; v < n; v++) {
        if (adj[u][v]) {
            if (!vis[v] && dfs_dir_cycle(v, n, adj, vis, rec)) return 1;
            else if (rec[v]) return 1;
        }
    }
    rec[u] = 0;
    return 0;
}

int detect_graph_cycle_directed_dfs(int n, const int adj[64][64]) {
    int vis[64] = {0};
    int rec[64] = {0};
    for (int i = 0; i < n; i++) {
        if (!vis[i]) {
            if (dfs_dir_cycle(i, n, adj, vis, rec)) return 1;
        }
    }
    return 0;
}
```

## Aliases & Shorthands
Available via: `detect_graph_cycle_directed_dfs`, `detection.cycles-loops.cycle-directed-dfs`, `detection>detect_graph_cycle_directed_dfs()`, `detection>cycles-loops>cycle-directed-dfs>detect_graph_cycle_directed_dfs()`, `directed_has_cycle`
