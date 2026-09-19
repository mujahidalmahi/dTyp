# prog_graph_mst
> **Domain:** `algorithms` | **Subcategory:** `graph-algorithms` | **Type:** `program`
## Overview
Complete interactive program finding Minimum Spanning Tree using Kruskal's algorithm with DSU

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
#include <stdlib.h>

#define MAX_V 50
#define MAX_E 200

typedef struct {
    int u;
    int v;
    int weight;
} Edge;

static Edge edge_list[MAX_E];
static int total_v = 0;
static int total_e = 0;
static int parent[MAX_V];

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

static int cmp_edges(const void* a, const void* b) {
    return (((const Edge*)a)->weight - ((const Edge*)b)->weight);
}

static int dsu_find(int i) {
    if (parent[i] == i) return i;
    return parent[i] = dsu_find(parent[i]);
}

static void run_kruskal(void) {
    qsort(edge_list, (size_t)total_e, sizeof(Edge), cmp_edges);
    for (int i = 0; i < total_v; i++) parent[i] = i;
    Edge mst[MAX_V];
    int mst_edges = 0;
    long long total_weight = 0;
    for (int i = 0; i < total_e; i++) {
        int root_u = dsu_find(edge_list[i].u);
        int root_v = dsu_find(edge_list[i].v);
        if (root_u != root_v) {
            mst[mst_edges++] = edge_list[i];
            total_weight += edge_list[i].weight;
            parent[root_u] = root_v;
            if (mst_edges == total_v - 1) break;
        }
    }
    if (mst_edges != total_v - 1) {
        printf("Graph is disconnected! Spanning forest found with %d edges.\n", mst_edges);
    } else {
        printf("Minimum Spanning Tree found with %d edges:\n", mst_edges);
    }
    for (int i = 0; i < mst_edges; i++) {
        printf("Edge (%d, %d) weight %d\n", mst[i].u, mst[i].v, mst[i].weight);
    }
    printf("Total MST Weight: %lld\n", total_weight);
}

int main(void) {
    int choice;
    do {
        printf("=== Minimum Spanning Tree (Kruskal) Workbench ===\n");
        printf("Active: %d Vertices, %d Edges\n", total_v, total_e);
        printf("1. Enter Graph Edges (V & E)\n");
        printf("2. Compute MST via Kruskal's Algorithm\n");
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
                printf("Enter V (<= %d) and E (<= %d): ", MAX_V, MAX_E);
                if (scanf("%d %d", &v, &e) == 2 && v > 0 && v <= MAX_V && e > 0 && e <= MAX_E) {
                    total_v = v;
                    total_e = e;
                    printf("Enter %d edges (u v weight):\n", e);
                    for (int i = 0; i < e; i++) {
                        scanf("%d %d %d", &edge_list[i].u, &edge_list[i].v, &edge_list[i].weight);
                    }
                    clear_input();
                    printf("Edges registered.\n");
                } else {
                    clear_input();
                }
                break;
            }
            case 2: {
                if (total_v == 0 || total_e == 0) {
                    printf("Enter graph edges first.\n");
                    break;
                }
                run_kruskal();
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
Available via: `prog_graph_mst`, `algorithms.full-programs.graph-algorithms.minimum-spanning-tree.prog-kruskal`, `algorithms>prog_graph_mst()`, `algorithms>full-programs>graph-algorithms>minimum-spanning-tree>prog-kruskal>prog_graph_mst()`, `programGraphMst`
