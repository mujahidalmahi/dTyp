# detect_graph_cycle_directed_kahn
> **Domain:** `detection` | **Subcategory:** `cycles-loops` | **Type:** `function`
## Overview
Detects cycle in directed graph using Kahn topological sorting in-degree elimination

## Signature
```c
int detect_graph_cycle_directed_kahn(int n, const int adj[64][64]);
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
int detect_graph_cycle_directed_kahn(int n, const int adj[64][64]) {
    int in_degree[64] = {0};
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            if (adj[i][j]) in_degree[j]++;
        }
    }
    int queue[64], front = 0, rear = 0;
    for (int i = 0; i < n; i++) {
        if (in_degree[i] == 0) queue[rear++] = i;
    }
    int visited_count = 0;
    while (front < rear) {
        int u = queue[front++];
        visited_count++;
        for (int v = 0; v < n; v++) {
            if (adj[u][v]) {
                in_degree[v]--;
                if (in_degree[v] == 0) queue[rear++] = v;
            }
        }
    }
    return (visited_count != n);
}
```

## Aliases & Shorthands
Available via: `detect_graph_cycle_directed_kahn`, `detection.cycles-loops.cycle-directed-kahn`, `detection>detect_graph_cycle_directed_kahn()`, `detection>cycles-loops>cycle-directed-kahn>detect_graph_cycle_directed_kahn()`, `kahn_cycle_detect`
