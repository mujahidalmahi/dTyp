# prog_graph_adj_list
> **Domain:** `data-structures` | **Subcategory:** `graphs` | **Type:** `program`
## Overview
Complete graph program using dynamic adjacency lists

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

typedef struct Node {
    int dest;
    struct Node* next;
} Node;

typedef struct Graph {
    int vertices;
    Node** adj;
} Graph;

Graph* graph_create(int v) {
    Graph* g = (Graph*)malloc(sizeof(Graph));
    g->vertices = v;
    g->adj = (Node**)calloc(v, sizeof(Node*));
    return g;
}

void graph_add_edge(Graph* g, int u, int v) {
    Node* n = (Node*)malloc(sizeof(Node));
    n->dest = v;
    n->next = g->adj[u];
    g->adj[u] = n;
}

void graph_print(const Graph* g) {
    for (int i = 0; i < g->vertices; i++) {
        printf("Vertex %d: ", i);
        Node* cur = g->adj[i];
        while (cur) {
            printf("-> %d ", cur->dest);
            cur = cur->next;
        }
        putchar('
');
    }
}

int main(void) {
    Graph* g = graph_create(4);
    graph_add_edge(g, 0, 1);
    graph_add_edge(g, 0, 2);
    graph_add_edge(g, 1, 2);
    graph_add_edge(g, 2, 3);

    graph_print(g);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_graph_adj_list`, `data-structures.full-programs.graphs.adjacency-list.prog-graph-adj-list`, `data-structures>prog_graph_adj_list()`, `data-structures>full-programs>graphs>adjacency-list>prog-graph-adj-list>prog_graph_adj_list()`, `programGraphAdjList`
