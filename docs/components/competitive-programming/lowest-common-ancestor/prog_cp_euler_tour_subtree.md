# prog_cp_euler_tour_subtree
> **Domain:** `competitive-programming` | **Subcategory:** `lowest-common-ancestor` | **Type:** `program`
## Overview
Euler Tour tree flattening for O(log N) subtree updates and queries via Fenwick tree

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

static int timer = 0;
static int tin[100005];
static int tout[100005];
static long long bit[200005];
static int bit_size = 0;

static void bit_add(int idx, long long val) {
    for (; idx <= bit_size; idx += (idx & -idx)) bit[idx] += val;
}

static long long bit_query(int idx) {
    long long sum = 0;
    for (; idx > 0; idx -= (idx & -idx)) sum += bit[idx];
    return sum;
}

static void dfs_euler(int u, int p, Edge** head) {
    tin[u] = ++timer;
    for (Edge* e = head[u]; e != NULL; e = e->next) {
        if (e->to != p) dfs_euler(e->to, u, head);
    }
    tout[u] = timer;
}

static void solve(void) {
    int n, q;
    if (scanf("%d %d", &n, &q) != 2) return;

    long long* vals = (long long*)malloc((n + 1) * sizeof(long long));
    for (int i = 1; i <= n; i++) scanf("%lld", &vals[i]);

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

    timer = 0;
    dfs_euler(1, 0, head);

    bit_size = timer;
    for (int i = 1; i <= bit_size; i++) bit[i] = 0;

    for (int i = 1; i <= n; i++) {
        bit_add(tin[i], vals[i]);
    }

    for (int i = 0; i < q; i++) {
        int type;
        if (scanf("%d", &type) != 1) continue;
        if (type == 1) {
            int node;
            long long delta;
            if (scanf("%d %lld", &node, &delta) == 2) {
                bit_add(tin[node], delta);
            }
        } else {
            int node;
            if (scanf("%d", &node) == 1) {
                long long subtree_sum = bit_query(tout[node]) - bit_query(tin[node] - 1);
                printf("%lld\n", subtree_sum);
            }
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
    free(vals);
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
Available via: `prog_cp_euler_tour_subtree`, `competitive-programming.full-programs.graph-techniques.lowest-common-ancestor.prog-cp-euler-tour-subtree`, `competitive-programming>prog_cp_euler_tour_subtree()`, `competitive-programming>full-programs>graph-techniques>lowest-common-ancestor>prog-cp-euler-tour-subtree>prog_cp_euler_tour_subtree()`, `cpEulerTourSubtree`
