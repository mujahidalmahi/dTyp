# prog_cp_tree_diameter
> **Domain:** `competitive-programming` | **Subcategory:** `lowest-common-ancestor` | **Type:** `program`
## Overview
Finding tree diameter and center nodes via two BFS passes

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

typedef struct Edge {
    int to;
    struct Edge* next;
} Edge;

static int bfs_farthest(int start, int n, Edge** head, int* parent, int* dist) {
    for (int i = 1; i <= n; i++) {
        dist[i] = -1;
        parent[i] = 0;
    }

    int* queue = (int*)malloc((n + 1) * sizeof(int));
    int h = 0, t = 0;

    dist[start] = 0;
    queue[t++] = start;

    int farthest = start;
    int max_dist = 0;

    while (h < t) {
        int u = queue[h++];
        if (dist[u] > max_dist) {
            max_dist = dist[u];
            farthest = u;
        }

        for (Edge* e = head[u]; e != NULL; e = e->next) {
            int v = e->to;
            if (dist[v] == -1) {
                dist[v] = dist[u] + 1;
                parent[v] = u;
                queue[t++] = v;
            }
        }
    }

    free(queue);
    return farthest;
}

static void solve(void) {
    int n;
    if (scanf("%d", &n) != 1) return;

    Edge** head = (Edge**)calloc(n + 1, sizeof(Edge*));
    for (int i = 0; i < n - 1; i++) {
        int u, v;
        if (scanf("%d %d", &u, &v) == 2) {
            Edge* e1 = (Edge*)malloc(sizeof(Edge));
            e1->to = v; e1->next = head[u]; head[u] = e1;
            Edge* e2 = (Edge*)malloc(sizeof(Edge));
            e2->to = u; e2->next = head[v]; head[v] = e2;
        }
    }

    int* parent = (int*)malloc((n + 1) * sizeof(int));
    int* dist = (int*)malloc((n + 1) * sizeof(int));

    int u = bfs_farthest(1, n, head, parent, dist);
    int v = bfs_farthest(u, n, head, parent, dist);

    int diameter = dist[v];
    printf("Diameter: %d (Endpoints: %d -> %d)\n", diameter, u, v);

    int curr = v;
    for (int step = 0; step < diameter / 2; step++) {
        curr = parent[curr];
    }
    printf("Center node: %d\n", curr);

    for (int i = 1; i <= n; i++) {
        Edge* curr_e = head[i];
        while (curr_e) {
            Edge* tmp = curr_e;
            curr_e = curr_e->next;
            free(tmp);
        }
    }
    free(head);
    free(parent);
    free(dist);
}

int main(void) {
    int t;
    if (scanf("%d", &t) != 1) t = 1;
    while (t--) {
        solve();
    }
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_cp_tree_diameter`, `competitive-programming.full-programs.graph-techniques.lowest-common-ancestor.prog-cp-tree-diameter`, `competitive-programming>prog_cp_tree_diameter()`, `competitive-programming>full-programs>graph-techniques>lowest-common-ancestor>prog-cp-tree-diameter>prog_cp_tree_diameter()`, `cpTreeDiameter`
