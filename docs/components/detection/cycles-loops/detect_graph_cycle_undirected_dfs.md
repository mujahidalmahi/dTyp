# detect_graph_cycle_undirected_dfs
> **Domain:** `detection` | **Subcategory:** `cycles-loops` | **Type:** `function`
## Overview
Detects cycle in undirected graph using DFS with parent node tracking

## Signature
```c
int detect_graph_cycle_undirected_dfs(int n, const int adj[64][64]);
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
static int dfs_undir_cycle(int u, int p, int n, const int adj[64][64], int vis[64]) {
    vis[u] = 1;
    for (int v = 0; v < n; v++) {
        if (adj[u][v]) {
            if (!vis[v]) {
                if (dfs_undir_cycle(v, u, n, adj, vis)) return 1;
            } else if (v != p) {
                return 1;
            }
        }
    }
    return 0;
}

int detect_graph_cycle_undirected_dfs(int n, const int adj[64][64]) {
    int vis[64] = {0};
    for (int i = 0; i < n; i++) {
        if (!vis[i]) {
            if (dfs_undir_cycle(i, -1, n, adj, vis)) return 1;
        }
    }
    return 0;
}
```

## Aliases & Shorthands
Available via: `detect_graph_cycle_undirected_dfs`, `detection.cycles-loops.cycle-undirected-dfs`, `detection>detect_graph_cycle_undirected_dfs()`, `detection>cycles-loops>cycle-undirected-dfs>detect_graph_cycle_undirected_dfs()`, `undirected_has_cycle`
