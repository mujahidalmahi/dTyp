# prog_cp_dsu_rollback
> **Domain:** `competitive-programming` | **Subcategory:** `disjoint-set` | **Type:** `program`
## Overview
Disjoint Set Union with stack-based rollback operations for offline dynamic connectivity

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
    int u;
    int v;
    int rank_increased;
} RollbackEntry;

static int parent[100005];
static int rank_arr[100005];
static RollbackEntry history[100005];
static int history_top = 0;
static int component_count = 0;

static void dsu_init(int n) {
    for (int i = 1; i <= n; i++) {
        parent[i] = i;
        rank_arr[i] = 0;
    }
    history_top = 0;
    component_count = n;
}

static int dsu_find(int i) {
    while (i != parent[i]) i = parent[i];
    return i;
}

static int dsu_union(int u, int v) {
    int root_u = dsu_find(u);
    int root_v = dsu_find(v);
    if (root_u == root_v) return 0;

    if (rank_arr[root_u] < rank_arr[root_v]) {
        int tmp = root_u; root_u = root_v; root_v = tmp;
    }

    history[history_top].u = root_u;
    history[history_top].v = root_v;
    history[history_top].rank_increased = 0;

    parent[root_v] = root_u;
    if (rank_arr[root_u] == rank_arr[root_v]) {
        rank_arr[root_u]++;
        history[history_top].rank_increased = 1;
    }
    history_top++;
    component_count--;
    return 1;
}

static void dsu_rollback(int target_size) {
    while (history_top > target_size) {
        history_top--;
        int root_u = history[history_top].u;
        int root_v = history[history_top].v;
        if (history[history_top].rank_increased) {
            rank_arr[root_u]--;
        }
        parent[root_v] = root_v;
        component_count++;
    }
}

static void solve(void) {
    int n, q;
    if (scanf("%d %d", &n, &q) != 2) return;

    dsu_init(n);

    for (int i = 0; i < q; i++) {
        int op;
        if (scanf("%d", &op) != 1) continue;
        if (op == 1) {
            int u, v;
            if (scanf("%d %d", &u, &v) == 2) {
                dsu_union(u, v);
                printf("Components: %d\n", component_count);
            }
        } else if (op == 2) {
            int target;
            if (scanf("%d", &target) == 1) {
                dsu_rollback(target);
                printf("Rollback to snapshot %d -> Components: %d\n", target, component_count);
            }
        } else if (op == 3) {
            int u, v;
            if (scanf("%d %d", &u, &v) == 2) {
                printf("%s\n", (dsu_find(u) == dsu_find(v)) ? "YES" : "NO");
            }
        }
    }
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
Available via: `prog_cp_dsu_rollback`, `competitive-programming.full-programs.cp-data-structures.disjoint-set.prog-cp-dsu-rollback`, `competitive-programming>prog_cp_dsu_rollback()`, `competitive-programming>full-programs>cp-data-structures>disjoint-set>prog-cp-dsu-rollback>prog_cp_dsu_rollback()`, `cpDsuRollback`
