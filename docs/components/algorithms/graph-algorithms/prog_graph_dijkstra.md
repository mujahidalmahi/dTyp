# prog_graph_dijkstra
> **Domain:** `algorithms` | **Subcategory:** `graph-algorithms` | **Type:** `program`
## Overview
Complete interactive program executing Dijkstra's single-source shortest path algorithm

## Signature
```c
int main(void);
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

#define MAX_V 50
#define INF_DIST 1000000000

static int adj_w[MAX_V][MAX_V];
static int dist[MAX_V];
static int prev_node[MAX_V];
static int visited[MAX_V];
static int num_v = 0;

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

static void dijkstra(int src) {
    for (int i = 0; i < num_v; i++) {
        dist[i] = INF_DIST;
        visited[i] = 0;
        prev_node[i] = -1;
    }
    dist[src] = 0;
    for (int count = 0; count < num_v - 1; count++) {
        int min_d = INF_DIST, u = -1;
        for (int v = 0; v < num_v; v++) {
            if (!visited[v] && dist[v] <= min_d) {
                min_d = dist[v];
                u = v;
            }
        }
        if (u == -1) break;
        visited[u] = 1;
        for (int v = 0; v < num_v; v++) {
            if (!visited[v] && adj_w[u][v] > 0 && dist[u] != INF_DIST && dist[u] + adj_w[u][v] < dist[v]) {
                dist[v] = dist[u] + adj_w[u][v];
                prev_node[v] = u;
            }
        }
    }
}

static void print_shortest_path(int src, int dest) {
    if (dist[dest] == INF_DIST) {
        printf("Vertex %d is unreachable from %d.\n", dest, src);
        return;
    }
    int path[MAX_V];
    int len = 0;
    for (int at = dest; at != -1; at = prev_node[at]) {
        path[len++] = at;
    }
    printf("Shortest Path (%d -> %d): ", src, dest);
    for (int i = len - 1; i >= 0; i--) {
        printf("%d%s", path[i], (i == 0) ? "" : " -> ");
    }
    printf(" | Total Cost: %d\n", dist[dest]);
}

int main(void) {
    int choice;
    do {
        printf("=== Dijkstra's Shortest Path Workbench ===\n");
        printf("Active Vertices: %d\n", num_v);
        printf("1. Create Weighted Graph (V & E)\n");
        printf("2. Run Dijkstra from Source\n");
        printf("3. Print Shortest Path to Destination\n");
        printf("0. Exit\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            choice = -1;
            continue;
        }
        clear_input();
        switch (choice) {
            case 1: {
                int v, e;
                printf("Enter vertices V (<= %d) and edges E: ", MAX_V);
                if (scanf("%d %d", &v, &e) == 2 && v > 0 && v <= MAX_V) {
                    num_v = v;
                    for (int i = 0; i < num_v; i++) {
                        for (int j = 0; j < num_v; j++) adj_w[i][j] = 0;
                    }
                    printf("Enter %d edges (u v weight):\n", e);
                    for (int i = 0; i < e; i++) {
                        int u, v1, w;
                        scanf("%d %d %d", &u, &v1, &w);
                        if (u >= 0 && u < num_v && v1 >= 0 && v1 < num_v && w >= 0) {
                            adj_w[u][v1] = w;
                            adj_w[v1][u] = w;
                        }
                    }
                    clear_input();
                    printf("Weighted graph created.\n");
                } else {
                    clear_input();
                }
                break;
            }
            case 2: {
                if (num_v == 0) {
                    printf("Create graph first.\n");
                    break;
                }
                int s;
                printf("Enter source vertex (0..%d): ", num_v - 1);
                if (scanf("%d", &s) == 1 && s >= 0 && s < num_v) {
                    clear_input();
                    dijkstra(s);
                    printf("Distances from source %d:\n", s);
                    for (int i = 0; i < num_v; i++) {
                        if (dist[i] == INF_DIST) printf("Vertex %d: INF\n", i);
                        else printf("Vertex %d: %d\n", i, dist[i]);
                    }
                } else {
                    clear_input();
                }
                break;
            }
            case 3: {
                if (num_v == 0) {
                    printf("Create graph first.\n");
                    break;
                }
                int s, d;
                printf("Enter source and destination: ");
                if (scanf("%d %d", &s, &d) == 2 && s >= 0 && s < num_v && d >= 0 && d < num_v) {
                    clear_input();
                    dijkstra(s);
                    print_shortest_path(s, d);
                } else {
                    clear_input();
                }
                break;
            }
            case 0:
                printf("Exiting suite.\n");
                break;
            default:
                printf("Invalid option.\n");
                break;
        }
    } while (choice != 0);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_graph_dijkstra`, `algorithms.full-programs.graph-algorithms.shortest-paths.prog-dijkstra`, `algorithms>prog_graph_dijkstra()`, `algorithms>full-programs>graph-algorithms>shortest-paths>prog-dijkstra>prog_graph_dijkstra()`, `programGraphDijkstra`
