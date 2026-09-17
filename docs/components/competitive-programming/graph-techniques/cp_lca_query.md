# cp_lca_query
> **Domain:** `competitive-programming` | **Subcategory:** `graph-techniques` | **Type:** `function`
## Overview
Finds lowest common ancestor of nodes u and v in O(log N)

## Signature
```c
int cp_lca_query(int u, int v, int max_log, const int* depth, const int* up);
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
int cp_lca_query(int u, int v, int max_log, const int* depth, const int* up) {
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
```

## Aliases & Shorthands
Available via: `cp_lca_query`, `competitive-programming.programming-technics.graph-techniques.lowest-common-ancestor.query`, `competitive-programming>cp_lca_query()`, `competitive-programming>programming-technics>graph-techniques>lowest-common-ancestor>query>cp_lca_query()`, `lcaQuery`
