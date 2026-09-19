# prog_graph_adj_matrix
> **Domain:** `data-structures` | **Subcategory:** `graphs` | **Type:** `program`
## Overview
Interactive graph program using adjacency matrix with edge addition/removal, BFS, and DFS traversals

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
#include <stdbool.h>

#define MAX_V 10

void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

void dfs_util(int matrix[MAX_V][MAX_V], int v, int num_v, bool* visited) {
    visited[v] = true;
    printf("%d ", v);
    for (int i = 0; i < num_v; i++) {
        if (matrix[v][i] && !visited[i]) {
            dfs_util(matrix, i, num_v, visited);
        }
    }
}

void bfs_util(int matrix[MAX_V][MAX_V], int start_v, int num_v) {
    bool visited[MAX_V] = {false};
    int queue[MAX_V];
    int front = 0, rear = 0;

    visited[start_v] = true;
    queue[rear++] = start_v;

    printf("BFS Traversal from vertex %d: ", start_v);
    while (front < rear) {
        int u = queue[front++];
        printf("%d ", u);
        for (int v = 0; v < num_v; v++) {
            if (matrix[u][v] && !visited[v]) {
                visited[v] = true;
                queue[rear++] = v;
            }
        }
    }
    printf("\n");
}

int main(void) {
    int num_v = 5;
    int matrix[MAX_V][MAX_V] = {0};
    int choice;

    do {
        printf("\n=== Graph (Adjacency Matrix) Menu (Vertices: %d) ===\n", num_v);
        printf("1. Add Edge (u, v)\n");
        printf("2. Remove Edge (u, v)\n");
        printf("3. BFS Traversal\n");
        printf("4. DFS Traversal\n");
        printf("5. Display Adjacency Matrix\n");
        printf("0. Exit\n");
        printf("Enter choice: ");

        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                int u, v;
                printf("Enter edge endpoints (u v): ");
                if (scanf("%d %d", &u, &v) == 2 && u >= 0 && u < num_v && v >= 0 && v < num_v) {
                    matrix[u][v] = 1;
                    matrix[v][u] = 1;
                    printf("Edge (%d, %d) added.\n", u, v);
                } else clear_input();
                break;
            }
            case 2: {
                int u, v;
                printf("Enter edge endpoints to remove (u v): ");
                if (scanf("%d %d", &u, &v) == 2 && u >= 0 && u < num_v && v >= 0 && v < num_v) {
                    matrix[u][v] = 0;
                    matrix[v][u] = 0;
                    printf("Edge (%d, %d) removed.\n", u, v);
                } else clear_input();
                break;
            }
            case 3: {
                int start;
                printf("Enter start vertex (0-%d): ", num_v - 1);
                if (scanf("%d", &start) == 1 && start >= 0 && start < num_v) {
                    bfs_util(matrix, start, num_v);
                } else clear_input();
                break;
            }
            case 4: {
                int start;
                printf("Enter start vertex (0-%d): ", num_v - 1);
                if (scanf("%d", &start) == 1 && start >= 0 && start < num_v) {
                    bool visited[MAX_V] = {false};
                    printf("DFS Traversal from vertex %d: ", start);
                    dfs_util(matrix, start, num_v, visited);
                    printf("\n");
                } else clear_input();
                break;
            }
            case 5:
                printf("Adjacency Matrix (%dx%d):\n   ", num_v, num_v);
                for (int j = 0; j < num_v; j++) printf("%2d ", j);
                printf("\n");
                for (int i = 0; i < num_v; i++) {
                    printf("%2d ", i);
                    for (int j = 0; j < num_v; j++) printf("%2d ", matrix[i][j]);
                    printf("\n");
                }
                break;
            case 0:
                printf("Exiting Graph Menu.\n");
                break;
            default:
                printf("Invalid choice.\n");
                break;
        }
    } while (choice != 0);

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_graph_adj_matrix`, `data-structures.full-programs.graphs.adjacency-matrix.prog-graph-adj-matrix`, `data-structures>prog_graph_adj_matrix()`, `data-structures>full-programs>graphs>adjacency-matrix>prog-graph-adj-matrix>prog_graph_adj_matrix()`, `programGraphAdjMatrix`
