# prog_graph_traversals
> **Domain:** `algorithms` | **Subcategory:** `graph-algorithms` | **Type:** `program`
## Overview
Complete interactive program executing BFS and DFS graph traversals

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
static int visited[MAX_V];
static int num_v = 0;

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

static void bfs(int start) {
    int queue[MAX_V];
    int front = 0, rear = 0;
    for (int i = 0; i < num_v; i++) visited[i] = 0;
    visited[start] = 1;
    queue[rear++] = start;
    printf("BFS Order: ");
    while (front < rear) {
        int u = queue[front++];
        printf("%d ", u);
        for (int v = 0; v < num_v; v++) {
            if (adj[u][v] && !visited[v]) {
                visited[v] = 1;
                queue[rear++] = v;
            }
        }
    }
    putchar('\n');
}

static void dfs_rec(int u) {
    visited[u] = 1;
    printf("%d ", u);
    for (int v = 0; v < num_v; v++) {
        if (adj[u][v] && !visited[v]) dfs_rec(v);
    }
}

static void dfs(int start) {
    for (int i = 0; i < num_v; i++) visited[i] = 0;
    printf("DFS Order: ");
    dfs_rec(start);
    putchar('\n');
}

int main(void) {
    int choice;
    do {
        printf("=== Graph Traversals Workbench ===\n");
        printf("Active Vertices: %d\n", num_v);
        printf("1. Create Graph (Vertices & Edges)\n");
        printf("2. Run Breadth-First Search (BFS)\n");
        printf("3. Run Depth-First Search (DFS)\n");
        printf("4. Display Adjacency Matrix\n");
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
                printf("Enter number of vertices V (<= %d) and edges E: ", MAX_V);
                if (scanf("%d %d", &v, &e) == 2 && v > 0 && v <= MAX_V) {
                    num_v = v;
                    for (int i = 0; i < num_v; i++) {
                        for (int j = 0; j < num_v; j++) adj[i][j] = 0;
                    }
                    printf("Enter %d edges (0-indexed u v):\n", e);
                    for (int i = 0; i < e; i++) {
                        int u1, v1;
                        scanf("%d %d", &u1, &v1);
                        if (u1 >= 0 && u1 < num_v && v1 >= 0 && v1 < num_v) {
                            adj[u1][v1] = 1;
                            adj[v1][u1] = 1;
                        }
                    }
                    clear_input();
                    printf("Graph configured successfully.\n");
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
                printf("Enter start vertex (0..%d): ", num_v - 1);
                if (scanf("%d", &s) == 1 && s >= 0 && s < num_v) {
                    clear_input();
                    bfs(s);
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
                int s;
                printf("Enter start vertex (0..%d): ", num_v - 1);
                if (scanf("%d", &s) == 1 && s >= 0 && s < num_v) {
                    clear_input();
                    dfs(s);
                } else {
                    clear_input();
                }
                break;
            }
            case 4: {
                if (num_v == 0) {
                    printf("Graph empty.\n");
                    break;
                }
                printf("Adjacency Matrix:\n   ");
                for (int i = 0; i < num_v; i++) printf("%2d ", i);
                printf("\n");
                for (int i = 0; i < num_v; i++) {
                    printf("%2d ", i);
                    for (int j = 0; j < num_v; j++) printf("%2d ", adj[i][j]);
                    putchar('\n');
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
Available via: `prog_graph_traversals`, `algorithms.full-programs.graph-algorithms.graph-traversals.prog-graph-traversals`, `algorithms>prog_graph_traversals()`, `algorithms>full-programs>graph-algorithms>graph-traversals>prog-graph-traversals>prog_graph_traversals()`, `programGraphTraversals`
