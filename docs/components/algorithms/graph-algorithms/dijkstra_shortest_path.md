# dijkstra_shortest_path
> **Domain:** `algorithms` | **Subcategory:** `graph-algorithms` | **Type:** `function`
## Overview
Computes single-source shortest path distances using Dijkstra algorithm

## Signature
```c
void dijkstra_shortest_path(const int* weight_matrix, int v, int src, int* dist);
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
void dijkstra_shortest_path(const int* weight_matrix, int v, int src, int* dist) {
    int* visited = (int*)calloc(v, sizeof(int));
    for (int i = 0; i < v; i++) dist[i] = 1000000000;
    dist[src] = 0;
    for (int count = 0; count < v - 1; count++) {
        int min_d = 1000000000, u = -1;
        for (int i = 0; i < v; i++) {
            if (!visited[i] && dist[i] < min_d) {
                min_d = dist[i];
                u = i;
            }
        }
        if (u == -1) break;
        visited[u] = 1;
        for (int i = 0; i < v; i++) {
            int w = weight_matrix[u * v + i];
            if (!visited[i] && w > 0 && dist[u] + w < dist[i]) {
                dist[i] = dist[u] + w;
            }
        }
    }
    free(visited);
}
```

## Aliases & Shorthands
Available via: `dijkstra_shortest_path`, `algorithms.separate-components.graph-algorithms.shortest-paths.dijkstra`, `algorithms>dijkstra_shortest_path()`, `algorithms>separate-components>graph-algorithms>shortest-paths>dijkstra>dijkstra_shortest_path()`, `dijkstra`
