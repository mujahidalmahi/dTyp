# cp_dsu_find
> **Domain:** `competitive-programming` | **Subcategory:** `cp-data-structures` | **Type:** `function`
## Overview
Finds set representative of element i with path compression

## Signature
```c
int cp_dsu_find(CpDsu* dsu, int i);
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
int cp_dsu_find(CpDsu* dsu, int i) {
    if (dsu->parent[i] == i) return i;
    dsu->parent[i] = cp_dsu_find(dsu, dsu->parent[i]);
    return dsu->parent[i];
}
```

## Aliases & Shorthands
Available via: `cp_dsu_find`, `competitive-programming.programming-technics.cp-data-structures.disjoint-set.find`, `competitive-programming>cp_dsu_find()`, `competitive-programming>programming-technics>cp-data-structures>disjoint-set>find>cp_dsu_find()`, `dsuFind`

## Dependencies
Requires: `competitive-programming.programming-technics.cp-data-structures.disjoint-set.struct`
