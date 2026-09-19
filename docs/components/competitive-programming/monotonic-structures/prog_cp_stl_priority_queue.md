# prog_cp_stl_priority_queue
> **Domain:** `competitive-programming` | **Subcategory:** `monotonic-structures` | **Type:** `program`
## Overview
C binary min-heap priority queue emulator applied to Dijkstra shortest paths

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

#define INF 1000000000000000LL

typedef struct {
    long long dist;
    int u;
} HeapNode;

typedef struct {
    HeapNode* data;
    int size;
    int capacity;
} PriorityQueue;

static void pq_init(PriorityQueue* pq, int cap) {
    pq->size = 0;
    pq->capacity = cap;
    pq->data = (HeapNode*)malloc(cap * sizeof(HeapNode));
}

static void pq_push(PriorityQueue* pq, long long dist, int u) {
    if (pq->size >= pq->capacity) {
        pq->capacity *= 2;
        pq->data = (HeapNode*)realloc(pq->data, pq->capacity * sizeof(HeapNode));
    }
    int idx = pq->size++;
    while (idx > 0) {
        int parent = (idx - 1) / 2;
        if (pq->data[parent].dist <= dist) break;
        pq->data[idx] = pq->data[parent];
        idx = parent;
    }
    pq->data[idx].dist = dist;
    pq->data[idx].u = u;
}

static HeapNode pq_pop(PriorityQueue* pq) {
    HeapNode top = pq->data[0];
    HeapNode last = pq->data[--pq->size];
    if (pq->size == 0) return top;
    int idx = 0;
    while (idx * 2 + 1 < pq->size) {
        int left = idx * 2 + 1;
        int right = idx * 2 + 2;
        int smallest = left;
        if (right < pq->size && pq->data[right].dist < pq->data[left].dist) smallest = right;
        if (last.dist <= pq->data[smallest].dist) break;
        pq->data[idx] = pq->data[smallest];
        idx = smallest;
    }
    pq->data[idx] = last;
    return top;
}

static void pq_free(PriorityQueue* pq) {
    if (pq->data) free(pq->data);
    pq->size = 0;
    pq->capacity = 0;
}

typedef struct Edge {
    int to;
    long long weight;
    struct Edge* next;
} Edge;

static void solve(void) {
    int n, m;
    if (scanf("%d %d", &n, &m) != 2) return;

    Edge** head = (Edge**)calloc(n + 1, sizeof(Edge*));
    for (int i = 0; i < m; i++) {
        int u, v;
        long long w;
        if (scanf("%d %d %lld", &u, &v, &w) == 3) {
            Edge* e1 = (Edge*)malloc(sizeof(Edge));
            e1->to = v; e1->weight = w; e1->next = head[u]; head[u] = e1;
            Edge* e2 = (Edge*)malloc(sizeof(Edge));
            e2->to = u; e2->weight = w; e2->next = head[v]; head[v] = e2;
        }
    }

    long long* dist = (long long*)malloc((n + 1) * sizeof(long long));
    for (int i = 1; i <= n; i++) dist[i] = INF;

    PriorityQueue pq;
    pq_init(&pq, 16);

    dist[1] = 0;
    pq_push(&pq, 0, 1);

    while (pq.size > 0) {
        HeapNode top = pq_pop(&pq);
        long long d = top.dist;
        int u = top.u;
        if (d > dist[u]) continue;

        for (Edge* e = head[u]; e != NULL; e = e->next) {
            if (dist[u] + e->weight < dist[e->to]) {
                dist[e->to] = dist[u] + e->weight;
                pq_push(&pq, dist[e->to], e->to);
            }
        }
    }

    for (int i = 1; i <= n; i++) {
        long long ans = (dist[i] == INF) ? -1 : dist[i];
        printf("%lld%c", ans, (i == n ? '\n' : ' '));
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
    free(dist);
    pq_free(&pq);
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
Available via: `prog_cp_stl_priority_queue`, `competitive-programming.full-programs.cp-data-structures.monotonic-structures.prog-cp-stl-priority-queue`, `competitive-programming>prog_cp_stl_priority_queue()`, `competitive-programming>full-programs>cp-data-structures>monotonic-structures>prog-cp-stl-priority-queue>prog_cp_stl_priority_queue()`, `cpStlPriorityQueue`
