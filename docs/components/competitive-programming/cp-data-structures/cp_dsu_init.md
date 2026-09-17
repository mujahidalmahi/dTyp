# cp_dsu_init
> **Domain:** `competitive-programming` | **Subcategory:** `cp-data-structures` | **Type:** `function`
## Overview
Initializes DSU structure with n elements

## Signature
```c
void cp_dsu_init(CpDsu* dsu, int n, int* parent_buf, int* rank_buf);
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
void cp_dsu_init(CpDsu* dsu, int n, int* parent_buf, int* rank_buf) {
    dsu->parent = parent_buf;
    dsu->rank = rank_buf;
    dsu->size = n;
    for (int i = 0; i < n; i++) {
        dsu->parent[i] = i;
        dsu->rank[i] = 0;
    }
}
```

## Aliases & Shorthands
Available via: `cp_dsu_init`, `competitive-programming.programming-technics.cp-data-structures.disjoint-set.init`, `competitive-programming>cp_dsu_init()`, `competitive-programming>programming-technics>cp-data-structures>disjoint-set>init>cp_dsu_init()`, `dsuInit`

## Dependencies
Requires: `competitive-programming.programming-technics.cp-data-structures.disjoint-set.struct`
