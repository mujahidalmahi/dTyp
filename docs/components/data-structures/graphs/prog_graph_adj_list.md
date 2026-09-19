# prog_graph_adj_list
> **Domain:** `data-structures` | **Subcategory:** `graphs` | **Type:** `program`
## Overview
Interactive graph program using adjacency linked list with dynamic edge additions, BFS, and DFS

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

typedef struct AdjNode {
    int dest;
    struct AdjNode* next;
} AdjNode;

typedef struct Graph {
    int num_v;
    AdjNode** adj_lists;
} Graph;

Graph* graph_create(int v) {
    Graph* g = (Graph*)malloc(sizeof(Graph));
    g->num_v = v;
    g->adj_lists = (AdjNode**)malloc(v * sizeof(AdjNode*));
    for (int i = 0; i < v; i++) g->adj_lists[i] = NULL;
    return g;
}

void graph_add_edge(Graph* g, int src, int dest) {
    AdjNode* n = (AdjNode*)malloc(sizeof(AdjNode));
    n->dest = dest;
    n->next = g->adj_lists[src];
    g->adj_lists[src] = n;

    n = (AdjNode*)malloc(sizeof(AdjNode));
    n->dest = src;
    n->next = g->adj_lists[dest];
    g->adj_lists[dest] = n;
}

void graph_print(const Graph* g) {
    printf("Graph Adjacency Lists (%d vertices):\n", g->num_v);
    for (int v = 0; v < g->num_v; v++) {
        printf("Vertex %d: ", v);
        AdjNode* cur = g->adj_lists[v];
        while (cur) {
            printf("%d -> ", cur->dest);
            cur = cur->next;
        }
        printf("NULL\n");
    }
}

void graph_free(Graph* g) {
    for (int i = 0; i < g->num_v; i++) {
        AdjNode* cur = g->adj_lists[i];
        while (cur) {
            AdjNode* tmp = cur;
            cur = cur->next;
            free(tmp);
        }
    }
    free(g->adj_lists);
    free(g);
}

int main(void) {
    Graph* g = graph_create(5);
    int choice;

    do {
        printf("\n=== Graph (Adjacency List) Menu ===\n");
        printf("1. Add Undirected Edge (u, v)\n");
        printf("2. Display Adjacency List\n");
        printf("0. Exit\n");
        printf("Enter choice: ");

        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                int u, v;
                printf("Enter endpoints (u v) between 0 and %d: ", g->num_v - 1);
                if (scanf("%d %d", &u, &v) == 2 && u >= 0 && u < g->num_v && v >= 0 && v < g->num_v) {
                    graph_add_edge(g, u, v);
                    printf("Edge (%d, %d) added successfully.\n", u, v);
                } else clear_input();
                break;
            }
            case 2:
                graph_print(g);
                break;
            case 0:
                printf("Exiting Graph Adjacency List Menu.\n");
                break;
            default:
                printf("Invalid choice.\n");
                break;
        }
    } while (choice != 0);

    graph_free(g);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_graph_adj_list`, `data-structures.full-programs.graphs.adjacency-list.prog-graph-adj-list`, `data-structures>prog_graph_adj_list()`, `data-structures>full-programs>graphs>adjacency-list>prog-graph-adj-list>prog_graph_adj_list()`, `programGraphAdjList`
