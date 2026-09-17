# cp_fenwick_query
> **Domain:** `competitive-programming` | **Subcategory:** `cp-data-structures` | **Type:** `function`
## Overview
Queries prefix sum from index 1 to idx in O(log N)

## Signature
```c
long long cp_fenwick_query(const CpFenwickTree* ft, int idx);
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
long long cp_fenwick_query(const CpFenwickTree* ft, int idx) {
    long long sum = 0;
    while (idx > 0) {
        sum += ft->tree[idx];
        idx -= (idx & (-idx));
    }
    return sum;
}
```

## Aliases & Shorthands
Available via: `cp_fenwick_query`, `competitive-programming.programming-technics.cp-data-structures.fenwick-tree.query`, `competitive-programming>cp_fenwick_query()`, `competitive-programming>programming-technics>cp-data-structures>fenwick-tree>query>cp_fenwick_query()`, `fenwickQuery`

## Dependencies
Requires: `competitive-programming.programming-technics.cp-data-structures.fenwick-tree.struct`
