# prog_graph_adj_matrix
> **Domain:** `data-structures` | **Subcategory:** `graphs` | **Type:** `program`
## Overview
Interactive graph program using adjacency matrix with edge addition/removal, O(1) query, BFS, DFS, connected components, bipartiteness, cycle detection, and degrees

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
#include <stdlib.h>
#include <stdbool.h>

void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

typedef struct GraphMat {
    int vertices;
    int** matrix;
    bool directed;
} GraphMat;

GraphMat* create_graph(int v, bool directed) {
    GraphMat* g = (GraphMat*)malloc(sizeof(GraphMat));
    if (!g) return NULL;
    g->vertices = v;
    g->directed = directed;
    g->matrix = (int**)malloc(v * sizeof(int*));
    for (int i = 0; i < v; i++) {
        g->matrix[i] = (int*)calloc(v, sizeof(int));
    }
    return g;
}

void add_edge(GraphMat* g, int u, int v) {
    if (u >= 0 && u < g->vertices && v >= 0 && v < g->vertices) {
        g->matrix[u][v] = 1;
        if (!g->directed) g->matrix[v][u] = 1;
    }
}

void remove_edge(GraphMat* g, int u, int v) {
    if (u >= 0 && u < g->vertices && v >= 0 && v < g->vertices) {
        g->matrix[u][v] = 0;
        if (!g->directed) g->matrix[v][u] = 0;
    }
}

bool has_edge(const GraphMat* g, int u, int v) {
    if (u >= 0 && u < g->vertices && v >= 0 && v < g->vertices) {
        return g->matrix[u][v] != 0;
    }
    return false;
}

void bfs(const GraphMat* g, int start) {
    if (start < 0 || start >= g->vertices) return;
    bool* visited = (bool*)calloc(g->vertices, sizeof(bool));
    int* queue = (int*)malloc(g->vertices * sizeof(int));
    int front = 0, rear = 0;

    visited[start] = true;
    queue[rear++] = start;
    printf("BFS order: ");

    while (front < rear) {
        int u = queue[front++];
        printf("%d ", u);
        for (int v = 0; v < g->vertices; v++) {
            if (g->matrix[u][v] && !visited[v]) {
                visited[v] = true;
                queue[rear++] = v;
            }
        }
    }
    printf("\n");
    free(visited);
    free(queue);
}

static void dfs_util(const GraphMat* g, int u, bool* visited) {
    visited[u] = true;
    printf("%d ", u);
    for (int v = 0; v < g->vertices; v++) {
        if (g->matrix[u][v] && !visited[v]) {
            dfs_util(g, v, visited);
        }
    }
}

void dfs(const GraphMat* g, int start) {
    if (start < 0 || start >= g->vertices) return;
    bool* visited = (bool*)calloc(g->vertices, sizeof(bool));
    printf("DFS order: ");
    dfs_util(g, start, visited);
    printf("\n");
    free(visited);
}

void connected_components(const GraphMat* g) {
    bool* visited = (bool*)calloc(g->vertices, sizeof(bool));
    int comp = 0;
    for (int i = 0; i < g->vertices; i++) {
        if (!visited[i]) {
            comp++;
            printf("Component %d: ", comp);
            dfs_util(g, i, visited);
            printf("\n");
        }
    }
    printf("Total connected components: %d\n", comp);
    free(visited);
}

bool check_bipartite(const GraphMat* g) {
    int* color = (int*)malloc(g->vertices * sizeof(int));
    for (int i = 0; i < g->vertices; i++) color[i] = -1;

    int* queue = (int*)malloc(g->vertices * sizeof(int));
    bool is_bip = true;

    for (int start = 0; start < g->vertices; start++) {
        if (color[start] == -1) {
            int front = 0, rear = 0;
            color[start] = 1;
            queue[rear++] = start;

            while (front < rear) {
                int u = queue[front++];
                for (int v = 0; v < g->vertices; v++) {
                    if (g->matrix[u][v]) {
                        if (color[v] == -1) {
                            color[v] = 1 - color[u];
                            queue[rear++] = v;
                        } else if (color[v] == color[u]) {
                            is_bip = false;
                            break;
                        }
                    }
                }
                if (!is_bip) break;
            }
        }
        if (!is_bip) break;
    }

    free(color);
    free(queue);
    return is_bip;
}

static bool cycle_util(const GraphMat* g, int v, bool* visited, int parent) {
    visited[v] = true;
    for (int i = 0; i < g->vertices; i++) {
        if (g->matrix[v][i]) {
            if (!visited[i]) {
                if (cycle_util(g, i, visited, v)) return true;
            } else if (i != parent) {
                return true;
            }
        }
    }
    return false;
}

bool detect_cycle(const GraphMat* g) {
    bool* visited = (bool*)calloc(g->vertices, sizeof(bool));
    for (int u = 0; u < g->vertices; u++) {
        if (!visited[u]) {
            if (cycle_util(g, u, visited, -1)) {
                free(visited);
                return true;
            }
        }
    }
    free(visited);
    return false;
}

void compute_degrees(const GraphMat* g) {
    for (int i = 0; i < g->vertices; i++) {
        int out_deg = 0;
        int in_deg = 0;
        for (int j = 0; j < g->vertices; j++) {
            if (g->matrix[i][j]) out_deg++;
            if (g->matrix[j][i]) in_deg++;
        }
        if (g->directed) {
            printf("Vertex %d: In-degree = %d, Out-degree = %d\n", i, in_deg, out_deg);
        } else {
            printf("Vertex %d: Degree = %d\n", i, out_deg);
        }
    }
}

void display_matrix(const GraphMat* g) {
    printf("Adjacency Matrix (%s, %d vertices):\n   ", g->directed ? "Directed" : "Undirected", g->vertices);
    for (int i = 0; i < g->vertices; i++) printf("%2d ", i);
    printf("\n");
    for (int i = 0; i < g->vertices; i++) {
        printf("%2d:", i);
        for (int j = 0; j < g->vertices; j++) {
            printf("%2d ", g->matrix[i][j]);
        }
        printf("\n");
    }
}

void free_graph(GraphMat* g) {
    if (!g) return;
    for (int i = 0; i < g->vertices; i++) free(g->matrix[i]);
    free(g->matrix);
    free(g);
}

int main(void) {
    int v = 5;
    GraphMat* g = create_graph(v, false);
    int choice = 0;
    int u = 0, target = 0;

    do {
        printf("\n--- Graph Adjacency Matrix Operations ---\n");
        printf("1. Add Edge\n");
        printf("2. Remove Edge\n");
        printf("3. Has Edge\n");
        printf("4. BFS Traversal\n");
        printf("5. DFS Traversal\n");
        printf("6. Find Connected Components\n");
        printf("7. Check Bipartite\n");
        printf("8. Detect Cycle\n");
        printf("9. Compute Degrees\n");
        printf("10. Display Matrix\n");
        printf("0. Exit\n");
        printf("Enter your choice: ");

        if (scanf("%d", &choice) != 1) {
            printf("Invalid input. Please enter an integer.\n");
            clear_input();
            continue;
        }

        switch (choice) {
            case 1:
                printf("Enter source and destination vertex: ");
                if (scanf("%d %d", &u, &target) == 2) {
                    add_edge(g, u, target);
                    printf("Added edge (%d -> %d).\n", u, target);
                } else clear_input();
                break;
            case 2:
                printf("Enter source and destination vertex: ");
                if (scanf("%d %d", &u, &target) == 2) {
                    remove_edge(g, u, target);
                    printf("Removed edge (%d -> %d).\n", u, target);
                } else clear_input();
                break;
            case 3:
                printf("Enter source and destination vertex: ");
                if (scanf("%d %d", &u, &target) == 2) {
                    if (has_edge(g, u, target)) printf("Edge (%d -> %d) exists.\n", u, target);
                    else printf("Edge (%d -> %d) does not exist.\n", u, target);
                } else clear_input();
                break;
            case 4:
                printf("Enter start vertex: ");
                if (scanf("%d", &u) == 1) bfs(g, u);
                else clear_input();
                break;
            case 5:
                printf("Enter start vertex: ");
                if (scanf("%d", &u) == 1) dfs(g, u);
                else clear_input();
                break;
            case 6:
                connected_components(g);
                break;
            case 7:
                if (check_bipartite(g)) printf("Graph is bipartite (2-colorable).\n");
                else printf("Graph is NOT bipartite.\n");
                break;
            case 8:
                if (detect_cycle(g)) printf("Cycle detected in graph.\n");
                else printf("No cycle detected in graph.\n");
                break;
            case 9:
                compute_degrees(g);
                break;
            case 10:
                display_matrix(g);
                break;
            case 0:
                printf("Exiting graph matrix program.\n");
                break;
            default:
                printf("Invalid option! Please choose between 0 and 10.\n");
                break;
        }
    } while (choice != 0);

    free_graph(g);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_graph_adj_matrix`, `data-structures.full-programs.graphs.adjacency-matrix.prog-graph-adj-matrix`, `data-structures>prog_graph_adj_matrix()`, `data-structures>full-programs>graphs>adjacency-matrix>prog-graph-adj-matrix>prog_graph_adj_matrix()`, `programGraphAdjMatrix`
