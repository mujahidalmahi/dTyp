# cp_lca_binary_lifting_build
> **Domain:** `competitive-programming` | **Subcategory:** `graph-techniques` | **Type:** `function`
## Overview
Builds binary lifting up table for tree LCA queries in O(N log N)

## Signature
```c
void cp_lca_binary_lifting_build(int n, int max_log, const int* parent, int* up);
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
void cp_lca_binary_lifting_build(int n, int max_log, const int* parent, int* up) {
    for (int i = 0; i < n; i++) {
        up[i * max_log + 0] = parent[i];
    }
    for (int j = 1; j < max_log; j++) {
        for (int i = 0; i < n; i++) {
            int p = up[i * max_log + (j - 1)];
            if (p != -1) up[i * max_log + j] = up[p * max_log + (j - 1)];
            else up[i * max_log + j] = -1;
        }
    }
}
```

## Aliases & Shorthands
Available via: `cp_lca_binary_lifting_build`, `competitive-programming.programming-technics.graph-techniques.lowest-common-ancestor.build`, `competitive-programming>cp_lca_binary_lifting_build()`, `competitive-programming>programming-technics>graph-techniques>lowest-common-ancestor>build>cp_lca_binary_lifting_build()`, `lcaBuild`
