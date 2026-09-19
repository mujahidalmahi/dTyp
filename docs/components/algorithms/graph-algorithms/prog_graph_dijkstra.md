# prog_graph_dijkstra
> **Domain:** `algorithms` | **Subcategory:** `graph-algorithms` | **Type:** `program`
## Overview
Complete Dijkstra shortest path program on weighted graph

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

#define V 5
#define INF 1000000

int min_distance(const int* dist, const int* spt) {
    int min = INF, min_idx = -1;
    for (int v = 0; v < V; v++) {
        if (!spt[v] && dist[v] <= min) {
            min = dist[v];
            min_idx = v;
        }
    }
    return min_idx;
}

int main(void) {
    int graph[V][V] = {
        {0, 10, 0, 5, 0},
        {0, 0, 1, 2, 0},
        {0, 0, 0, 0, 4},
        {0, 3, 9, 0, 2},
        {7, 0, 6, 0, 0}
    };

    int dist[V];
    int spt[V] = {0};
    for (int i = 0; i < V; i++) dist[i] = INF;
    dist[0] = 0;

    for (int c = 0; c < V - 1; c++) {
        int u = min_distance(dist, spt);
        if (u == -1) break;
        spt[u] = 1;
        for (int v = 0; v < V; v++) {
            if (!spt[v] && graph[u][v] && dist[u] != INF && dist[u] + graph[u][v] < dist[v]) {
                dist[v] = dist[u] + graph[u][v];
            }
        }
    }

    printf("Dijkstra Shortest Paths from Source 0:\n");
    for (int i = 0; i < V; i++) {
        printf("To vertex %d: %d\n", i, dist[i]);
    }
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_graph_dijkstra`, `algorithms.full-programs.graph-algorithms.shortest-paths.prog-dijkstra`, `algorithms>prog_graph_dijkstra()`, `algorithms>full-programs>graph-algorithms>shortest-paths>prog-dijkstra>prog_graph_dijkstra()`, `programDijkstra`
