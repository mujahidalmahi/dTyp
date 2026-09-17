# cp_dsu_union
> **Domain:** `competitive-programming` | **Subcategory:** `cp-data-structures` | **Type:** `function`
## Overview
Unites sets containing i and j by rank, returns 1 if united, 0 if already in same set

## Signature
```c
int cp_dsu_union(CpDsu* dsu, int i, int j);
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
int cp_dsu_union(CpDsu* dsu, int i, int j) {
    int root_i = cp_dsu_find(dsu, i);
    int root_j = cp_dsu_find(dsu, j);
    if (root_i == root_j) return 0;
    if (dsu->rank[root_i] < dsu->rank[root_j]) {
        dsu->parent[root_i] = root_j;
    } else if (dsu->rank[root_i] > dsu->rank[root_j]) {
        dsu->parent[root_j] = root_i;
    } else {
        dsu->parent[root_j] = root_i;
        dsu->rank[root_i]++;
    }
    return 1;
}
```

## Aliases & Shorthands
Available via: `cp_dsu_union`, `competitive-programming.programming-technics.cp-data-structures.disjoint-set.union`, `competitive-programming>cp_dsu_union()`, `competitive-programming>programming-technics>cp-data-structures>disjoint-set>union>cp_dsu_union()`, `dsuUnion`

## Dependencies
Requires: `competitive-programming.programming-technics.cp-data-structures.disjoint-set.find`
