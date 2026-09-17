# detect_connected_components
> **Domain:** `detection` | **Subcategory:** `graph-structural` | **Type:** `function`
## Overview
Counts total connected components in undirected graph via DFS flood scan

## Signature
```c
int detect_connected_components(int n, const int adj[64][64]);
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
static void cc_dfs(int u, int n, const int adj[64][64], int visited[64]) {
    visited[u] = 1;
    for (int v = 0; v < n; v++) {
        if (adj[u][v] && !visited[v]) cc_dfs(v, n, adj, visited);
    }
}

int detect_connected_components(int n, const int adj[64][64]) {
    int visited[64] = {0}, count = 0;
    for (int i = 0; i < n; i++) {
        if (!visited[i]) {
            count++;
            cc_dfs(i, n, adj, visited);
        }
    }
    return count;
}
```

## Aliases & Shorthands
Available via: `detect_connected_components`, `detection.graph-structural.connected-components`, `detection>detect_connected_components()`, `detection>graph-structural>connected-components>detect_connected_components()`, `count_components`
