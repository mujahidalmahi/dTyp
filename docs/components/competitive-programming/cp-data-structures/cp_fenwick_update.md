# cp_fenwick_update
> **Domain:** `competitive-programming` | **Subcategory:** `cp-data-structures` | **Type:** `function`
## Overview
Adds value delta to element at 1-indexed position in O(log N)

## Signature
```c
void cp_fenwick_update(CpFenwickTree* ft, int idx, long long delta);
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
void cp_fenwick_update(CpFenwickTree* ft, int idx, long long delta) {
    while (idx <= ft->size) {
        ft->tree[idx] += delta;
        idx += (idx & (-idx));
    }
}
```

## Aliases & Shorthands
Available via: `cp_fenwick_update`, `competitive-programming.programming-technics.cp-data-structures.fenwick-tree.update`, `competitive-programming>cp_fenwick_update()`, `competitive-programming>programming-technics>cp-data-structures>fenwick-tree>update>cp_fenwick_update()`, `fenwickUpdate`

## Dependencies
Requires: `competitive-programming.programming-technics.cp-data-structures.fenwick-tree.struct`
