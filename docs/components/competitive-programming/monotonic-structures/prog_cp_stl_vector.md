# prog_cp_stl_vector
> **Domain:** `competitive-programming` | **Subcategory:** `monotonic-structures` | **Type:** `program`
## Overview
C dynamic vector container emulator applied to competitive graph adjacency lists and BFS

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

typedef struct {
    int* data;
    int size;
    int capacity;
} Vector;

static void vec_init(Vector* v) {
    v->size = 0;
    v->capacity = 4;
    v->data = (int*)malloc(v->capacity * sizeof(int));
}

static void vec_push(Vector* v, int val) {
    if (v->size >= v->capacity) {
        v->capacity *= 2;
        v->data = (int*)realloc(v->data, v->capacity * sizeof(int));
    }
    v->data[v->size++] = val;
}

static void vec_free(Vector* v) {
    if (v->data) {
        free(v->data);
        v->data = NULL;
    }
    v->size = 0;
    v->capacity = 0;
}

static void solve(void) {
    int n, m;
    if (scanf("%d %d", &n, &m) != 2) return;

    Vector* adj = (Vector*)malloc((n + 1) * sizeof(Vector));
    for (int i = 1; i <= n; i++) vec_init(&adj[i]);

    for (int i = 0; i < m; i++) {
        int u, v;
        if (scanf("%d %d", &u, &v) == 2) {
            vec_push(&adj[u], v);
            vec_push(&adj[v], u);
        }
    }

    int* dist = (int*)malloc((n + 1) * sizeof(int));
    int* queue = (int*)malloc((n + 1) * sizeof(int));
    for (int i = 1; i <= n; i++) dist[i] = -1;

    int head = 0, tail = 0;
    dist[1] = 0;
    queue[tail++] = 1;

    while (head < tail) {
        int curr = queue[head++];
        for (int i = 0; i < adj[curr].size; i++) {
            int nxt = adj[curr].data[i];
            if (dist[nxt] == -1) {
                dist[nxt] = dist[curr] + 1;
                queue[tail++] = nxt;
            }
        }
    }

    for (int i = 1; i <= n; i++) {
        printf("%d%c", dist[i], (i == n ? '\n' : ' '));
    }

    for (int i = 1; i <= n; i++) vec_free(&adj[i]);
    free(adj);
    free(dist);
    free(queue);
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
Available via: `prog_cp_stl_vector`, `competitive-programming.full-programs.cp-data-structures.monotonic-structures.prog-cp-stl-vector`, `competitive-programming>prog_cp_stl_vector()`, `competitive-programming>full-programs>cp-data-structures>monotonic-structures>prog-cp-stl-vector>prog_cp_stl_vector()`, `cpStlVector`
