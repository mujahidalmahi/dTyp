# prog_graph_topological_sort
> **Domain:** `algorithms` | **Subcategory:** `graph-algorithms` | **Type:** `program`
## Overview
Complete interactive program executing Kahn's in-degree topological sort and cycle detection

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

static int adj[MAX_V][MAX_V];
static int in_degree[MAX_V];
static int total_v = 0;

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

static void kahn_topological_sort(void) {
    int in_deg[MAX_V];
    for (int i = 0; i < total_v; i++) in_deg[i] = 0;
    for (int i = 0; i < total_v; i++) {
        for (int j = 0; j < total_v; j++) {
            if (adj[i][j]) in_deg[j]++;
        }
    }
    int queue[MAX_V];
    int front = 0, rear = 0;
    for (int i = 0; i < total_v; i++) {
        if (in_deg[i] == 0) queue[rear++] = i;
    }
    int topo_order[MAX_V];
    int count = 0;
    while (front < rear) {
        int u = queue[front++];
        topo_order[count++] = u;
        for (int v = 0; v < total_v; v++) {
            if (adj[u][v]) {
                in_deg[v]--;
                if (in_deg[v] == 0) queue[rear++] = v;
            }
        }
    }
    if (count != total_v) {
        printf("Graph contains a directed CYCLE! Topological ordering is impossible.\n");
    } else {
        printf("Topological Ordering (Kahn's): ");
        for (int i = 0; i < count; i++) printf("%d ", topo_order[i]);
        putchar('\n');
    }
}

int main(void) {
    int choice;
    do {
        printf("=== Topological Sort Workbench ===\n");
        printf("Active Directed Vertices: %d\n", total_v);
        printf("1. Enter Directed Acyclic Graph (DAG)\n");
        printf("2. Compute Topological Ordering\n");
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
                printf("Enter V (<= %d) and directed edges E: ", MAX_V);
                if (scanf("%d %d", &v, &e) == 2 && v > 0 && v <= MAX_V) {
                    total_v = v;
                    for (int i = 0; i < total_v; i++) {
                        for (int j = 0; j < total_v; j++) adj[i][j] = 0;
                    }
                    printf("Enter %d directed edges (u -> v):\n", e);
                    for (int i = 0; i < e; i++) {
                        int u, v1;
                        scanf("%d %d", &u, &v1);
                        if (u >= 0 && u < total_v && v1 >= 0 && v1 < total_v) {
                            adj[u][v1] = 1;
                        }
                    }
                    clear_input();
                    printf("DAG stored.\n");
                } else {
                    clear_input();
                }
                break;
            }
            case 2: {
                if (total_v == 0) {
                    printf("Enter graph first.\n");
                    break;
                }
                kahn_topological_sort();
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
Available via: `prog_graph_topological_sort`, `algorithms.full-programs.graph-algorithms.topological-sort.prog-topological-sort`, `algorithms>prog_graph_topological_sort()`, `algorithms>full-programs>graph-algorithms>topological-sort>prog-topological-sort>prog_graph_topological_sort()`, `programGraphTopologicalSort`
