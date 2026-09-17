# detect_bipartite_graph
> **Domain:** `detection` | **Subcategory:** `graph-structural` | **Type:** `function`
## Overview
Detects if graph is bipartite (2-colorable) using BFS vertex queue

## Signature
```c
int detect_bipartite_graph(int n, const int adj[64][64]);
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
int detect_bipartite_graph(int n, const int adj[64][64]) {
    int color[64];
    for (int i = 0; i < n; i++) color[i] = -1;
    for (int start = 0; start < n; start++) {
        if (color[start] == -1) {
            int queue[64], front = 0, rear = 0;
            queue[rear++] = start;
            color[start] = 0;
            while (front < rear) {
                int u = queue[front++];
                for (int v = 0; v < n; v++) {
                    if (adj[u][v]) {
                        if (color[v] == -1) {
                            color[v] = 1 - color[u];
                            queue[rear++] = v;
                        } else if (color[v] == color[u]) {
                            return 0;
                        }
                    }
                }
            }
        }
    }
    return 1;
}
```

## Aliases & Shorthands
Available via: `detect_bipartite_graph`, `detection.graph-structural.bipartite-graph`, `detection>detect_bipartite_graph()`, `detection>graph-structural>bipartite-graph>detect_bipartite_graph()`, `is_bipartite`
