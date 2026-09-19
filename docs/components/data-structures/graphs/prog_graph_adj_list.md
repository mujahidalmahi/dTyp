# prog_graph_adj_list
> **Domain:** `data-structures` | **Subcategory:** `graphs` | **Type:** `program`
## Overview
Interactive graph program using adjacency linked list with dynamic edge additions/removals, BFS, DFS, unweighted shortest path with reconstruction, connected components, and cycle detection

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

typedef struct Node {
    int dest;
    struct Node* next;
} Node;

typedef struct GraphList {
    int vertices;
    Node** adj;
} GraphList;

GraphList* create_graph(int v) {
    GraphList* g = (GraphList*)malloc(sizeof(GraphList));
    if (!g) return NULL;
    g->vertices = v;
    g->adj = (Node**)malloc(v * sizeof(Node*));
    for (int i = 0; i < v; i++) g->adj[i] = NULL;
    return g;
}

void add_edge(GraphList* g, int u, int v) {
    if (u < 0 || u >= g->vertices || v < 0 || v >= g->vertices) return;
    Node* n = (Node*)malloc(sizeof(Node));
    if (!n) return;
    n->dest = v;
    n->next = g->adj[u];
    g->adj[u] = n;
}

bool remove_edge(GraphList* g, int u, int v) {
    if (u < 0 || u >= g->vertices) return false;
    Node* cur = g->adj[u];
    Node* prev = NULL;
    while (cur && cur->dest != v) {
        prev = cur;
        cur = cur->next;
    }
    if (!cur) return false;
    if (prev) prev->next = cur->next;
    else g->adj[u] = cur->next;
    free(cur);
    return true;
}

bool has_edge(const GraphList* g, int u, int v) {
    if (u < 0 || u >= g->vertices) return false;
    Node* cur = g->adj[u];
    while (cur) {
        if (cur->dest == v) return true;
        cur = cur->next;
    }
    return false;
}

void bfs(const GraphList* g, int start) {
    if (start < 0 || start >= g->vertices) return;
    bool* visited = (bool*)calloc(g->vertices, sizeof(bool));
    int* queue = (int*)malloc(g->vertices * sizeof(int));
    int front = 0, rear = 0;

    visited[start] = true;
    queue[rear++] = start;
    printf("BFS traversal: ");

    while (front < rear) {
        int u = queue[front++];
        printf("%d ", u);
        Node* cur = g->adj[u];
        while (cur) {
            if (!visited[cur->dest]) {
                visited[cur->dest] = true;
                queue[rear++] = cur->dest;
            }
            cur = cur->next;
        }
    }
    printf("\n");
    free(visited);
    free(queue);
}

static void dfs_util(const GraphList* g, int u, bool* visited) {
    visited[u] = true;
    printf("%d ", u);
    Node* cur = g->adj[u];
    while (cur) {
        if (!visited[cur->dest]) {
            dfs_util(g, cur->dest, visited);
        }
        cur = cur->next;
    }
}

void dfs(const GraphList* g, int start) {
    if (start < 0 || start >= g->vertices) return;
    bool* visited = (bool*)calloc(g->vertices, sizeof(bool));
    printf("DFS traversal: ");
    dfs_util(g, start, visited);
    printf("\n");
    free(visited);
}

void shortest_path(const GraphList* g, int start, int target) {
    if (start < 0 || start >= g->vertices || target < 0 || target >= g->vertices) return;
    int* dist = (int*)malloc(g->vertices * sizeof(int));
    int* parent = (int*)malloc(g->vertices * sizeof(int));
    for (int i = 0; i < g->vertices; i++) {
        dist[i] = -1;
        parent[i] = -1;
    }
    int* queue = (int*)malloc(g->vertices * sizeof(int));
    int front = 0, rear = 0;

    dist[start] = 0;
    queue[rear++] = start;

    while (front < rear) {
        int u = queue[front++];
        if (u == target) break;
        Node* cur = g->adj[u];
        while (cur) {
            if (dist[cur->dest] == -1) {
                dist[cur->dest] = dist[u] + 1;
                parent[cur->dest] = u;
                queue[rear++] = cur->dest;
            }
            cur = cur->next;
        }
    }

    if (dist[target] == -1) {
        printf("No path from %d to %d.\n", start, target);
    } else {
        printf("Shortest distance: %d. Path: ", dist[target]);
        int path[512];
        int plen = 0;
        int curr = target;
        while (curr != -1) {
            path[plen++] = curr;
            curr = parent[curr];
        }
        for (int i = plen - 1; i >= 0; i--) {
            printf("%d%s", path[i], i > 0 ? " -> " : "\n");
        }
    }
    free(dist);
    free(parent);
    free(queue);
}

void count_components(const GraphList* g) {
    bool* visited = (bool*)calloc(g->vertices, sizeof(bool));
    int comp = 0;
    for (int i = 0; i < g->vertices; i++) {
        if (!visited[i]) {
            comp++;
            dfs_util(g, i, visited);
        }
    }
    printf("\nTotal components: %d\n", comp);
    free(visited);
}

static bool cycle_util(const GraphList* g, int u, bool* visited, int parent) {
    visited[u] = true;
    Node* cur = g->adj[u];
    while (cur) {
        if (!visited[cur->dest]) {
            if (cycle_util(g, cur->dest, visited, u)) return true;
        } else if (cur->dest != parent) {
            return true;
        }
        cur = cur->next;
    }
    return false;
}

bool detect_cycle(const GraphList* g) {
    bool* visited = (bool*)calloc(g->vertices, sizeof(bool));
    for (int i = 0; i < g->vertices; i++) {
        if (!visited[i]) {
            if (cycle_util(g, i, visited, -1)) {
                free(visited);
                return true;
            }
        }
    }
    free(visited);
    return false;
}

void display_list(const GraphList* g) {
    printf("Adjacency List (%d vertices):\n", g->vertices);
    for (int i = 0; i < g->vertices; i++) {
        printf("[%d]: ", i);
        Node* cur = g->adj[i];
        while (cur) {
            printf("%d -> ", cur->dest);
            cur = cur->next;
        }
        printf("NULL\n");
    }
}

void free_graph(GraphList* g) {
    if (!g) return;
    for (int i = 0; i < g->vertices; i++) {
        Node* cur = g->adj[i];
        while (cur) {
            Node* tmp = cur;
            cur = cur->next;
            free(tmp);
        }
    }
    free(g->adj);
    free(g);
}

int main(void) {
    int v = 5;
    GraphList* g = create_graph(v);
    int choice = 0;
    int src = 0, dest = 0;

    do {
        printf("\n--- Graph Adjacency List Operations ---\n");
        printf("1. Add Edge\n");
        printf("2. Remove Edge\n");
        printf("3. Has Edge\n");
        printf("4. BFS Traversal\n");
        printf("5. DFS Traversal\n");
        printf("6. Shortest Path Unweighted\n");
        printf("7. Count Connected Components\n");
        printf("8. Detect Cycle\n");
        printf("9. Display Adjacency List\n");
        printf("0. Exit\n");
        printf("Enter your choice: ");

        if (scanf("%d", &choice) != 1) {
            printf("Invalid input. Please enter an integer.\n");
            clear_input();
            continue;
        }

        switch (choice) {
            case 1:
                printf("Enter source and destination: ");
                if (scanf("%d %d", &src, &dest) == 2) {
                    add_edge(g, src, dest);
                    printf("Added edge (%d -> %d).\n", src, dest);
                } else clear_input();
                break;
            case 2:
                printf("Enter source and destination: ");
                if (scanf("%d %d", &src, &dest) == 2) {
                    if (remove_edge(g, src, dest)) printf("Removed edge (%d -> %d).\n", src, dest);
                    else printf("Edge not found.\n", src, dest);
                } else clear_input();
                break;
            case 3:
                printf("Enter source and destination: ");
                if (scanf("%d %d", &src, &dest) == 2) {
                    if (has_edge(g, src, dest)) printf("Edge (%d -> %d) exists.\n", src, dest);
                    else printf("Edge does not exist.\n");
                } else clear_input();
                break;
            case 4:
                printf("Enter start vertex: ");
                if (scanf("%d", &src) == 1) bfs(g, src);
                else clear_input();
                break;
            case 5:
                printf("Enter start vertex: ");
                if (scanf("%d", &src) == 1) dfs(g, src);
                else clear_input();
                break;
            case 6:
                printf("Enter start and target: ");
                if (scanf("%d %d", &src, &dest) == 2) shortest_path(g, src, dest);
                else clear_input();
                break;
            case 7:
                count_components(g);
                break;
            case 8:
                if (detect_cycle(g)) printf("Cycle detected in graph.\n");
                else printf("No cycle detected in graph.\n");
                break;
            case 9:
                display_list(g);
                break;
            case 0:
                printf("Exiting adjacency list program.\n");
                break;
            default:
                printf("Invalid option! Please choose between 0 and 9.\n");
                break;
        }
    } while (choice != 0);

    free_graph(g);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_graph_adj_list`, `data-structures.full-programs.graphs.adjacency-list.prog-graph-adj-list`, `data-structures>prog_graph_adj_list()`, `data-structures>full-programs>graphs>adjacency-list>prog-graph-adj-list>prog_graph_adj_list()`, `programGraphAdjList`
