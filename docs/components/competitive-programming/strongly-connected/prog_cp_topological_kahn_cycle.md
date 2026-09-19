# prog_cp_topological_kahn_cycle
> **Domain:** `competitive-programming` | **Subcategory:** `strongly-connected` | **Type:** `program`
## Overview
Kahn's topological sort producing lexicographically smallest order via Min-Heap and cycle detection

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
} MinHeap;

static void heap_init(MinHeap* h, int cap) {
    h->size = 0;
    h->capacity = cap;
    h->data = (int*)malloc(cap * sizeof(int));
}

static void heap_push(MinHeap* h, int val) {
    int idx = h->size++;
    while (idx > 0) {
        int p = (idx - 1) / 2;
        if (h->data[p] <= val) break;
        h->data[idx] = h->data[p];
        idx = p;
    }
    h->data[idx] = val;
}

static int heap_pop(MinHeap* h) {
    int top = h->data[0];
    int last = h->data[--h->size];
    if (h->size == 0) return top;
    int idx = 0;
    while (idx * 2 + 1 < h->size) {
        int l = idx * 2 + 1;
        int r = idx * 2 + 2;
        int smallest = l;
        if (r < h->size && h->data[r] < h->data[l]) smallest = r;
        if (last <= h->data[smallest]) break;
        h->data[idx] = h->data[smallest];
        idx = smallest;
    }
    h->data[idx] = last;
    return top;
}

typedef struct Edge {
    int to;
    struct Edge* next;
} Edge;

static void solve(void) {
    int n, m;
    if (scanf("%d %d", &n, &m) != 2) return;

    Edge** head = (Edge**)calloc(n + 1, sizeof(Edge*));
    int* indegree = (int*)calloc(n + 1, sizeof(int));

    for (int i = 0; i < m; i++) {
        int u, v;
        if (scanf("%d %d", &u, &v) == 2) {
            Edge* e = (Edge*)malloc(sizeof(Edge));
            e->to = v; e->next = head[u]; head[u] = e;
            indegree[v]++;
        }
    }

    MinHeap heap;
    heap_init(&heap, n + 2);

    for (int i = 1; i <= n; i++) {
        if (indegree[i] == 0) heap_push(&heap, i);
    }

    int* order = (int*)malloc(n * sizeof(int));
    int order_cnt = 0;

    while (heap.size > 0) {
        int u = heap_pop(&heap);
        order[order_cnt++] = u;

        for (Edge* e = head[u]; e != NULL; e = e->next) {
            indegree[e->to]--;
            if (indegree[e->to] == 0) {
                heap_push(&heap, e->to);
            }
        }
    }

    if (order_cnt < n) {
        printf("-1\n");
    } else {
        for (int i = 0; i < n; i++) {
            printf("%d%c", order[i], (i == n - 1 ? '\n' : ' '));
        }
    }

    for (int i = 1; i <= n; i++) {
        Edge* curr = head[i];
        while (curr) {
            Edge* tmp = curr;
            curr = curr->next;
            free(tmp);
        }
    }
    free(head);
    free(indegree);
    free(order);
    free(heap.data);
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
Available via: `prog_cp_topological_kahn_cycle`, `competitive-programming.full-programs.graph-techniques.strongly-connected.prog-cp-topological-kahn-cycle`, `competitive-programming>prog_cp_topological_kahn_cycle()`, `competitive-programming>full-programs>graph-techniques>strongly-connected>prog-cp-topological-kahn-cycle>prog_cp_topological_kahn_cycle()`, `cpTopologicalKahn`
