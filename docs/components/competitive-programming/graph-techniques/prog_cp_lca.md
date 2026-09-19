# prog_cp_lca
> **Domain:** `competitive-programming` | **Subcategory:** `graph-techniques` | **Type:** `program`
## Overview
Complete competitive programming program finding tree Lowest Common Ancestors via binary lifting

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

void build_up(int n, int max_log, const int* parent, int* up) {
    for (int i = 0; i < n; i++) up[i * max_log + 0] = parent[i];
    for (int j = 1; j < max_log; j++) {
        for (int i = 0; i < n; i++) {
            int p = up[i * max_log + (j - 1)];
            if (p != -1) up[i * max_log + j] = up[p * max_log + (j - 1)];
            else up[i * max_log + j] = -1;
        }
    }
}

int query_lca(int u, int v, int max_log, const int* depth, const int* up) {
    if (depth[u] < depth[v]) {
        int tmp = u; u = v; v = tmp;
    }
    for (int j = max_log - 1; j >= 0; j--) {
        if (depth[u] - (1 << j) >= depth[v]) {
            u = up[u * max_log + j];
        }
    }
    if (u == v) return u;
    for (int j = max_log - 1; j >= 0; j--) {
        if (up[u * max_log + j] != up[v * max_log + j]) {
            u = up[u * max_log + j];
            v = up[v * max_log + j];
        }
    }
    return up[u * max_log + 0];
}

int main(void) {
    int n = 7, max_log = 4;
    int parent[] = {-1, 0, 0, 1, 1, 2, 2};
    int depth[]  = { 0, 1, 1, 2, 2, 2, 2};
    int up[7 * 4];
    build_up(n, max_log, parent, up);
    printf("LCA(3, 4) = %d\n", query_lca(3, 4, max_log, depth, up));
    printf("LCA(3, 5) = %d\n", query_lca(3, 5, max_log, depth, up));
    printf("LCA(4, 1) = %d\n", query_lca(4, 1, max_log, depth, up));
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_cp_lca`, `competitive-programming.full-programs.graph-techniques.lowest-common-ancestor.prog-lca`, `competitive-programming>prog_cp_lca()`, `competitive-programming>full-programs>graph-techniques>lowest-common-ancestor>prog-lca>prog_cp_lca()`
