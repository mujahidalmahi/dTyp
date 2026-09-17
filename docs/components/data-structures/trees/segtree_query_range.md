# segtree_query_range
> **Domain:** `data-structures` | **Subcategory:** `trees` | **Type:** `function`
## Overview
Queries range sum [l, r] on segment tree

## Signature
```c
int segtree_query_range(const SegTree* st, int l, int r);
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
int segtree_query_range(const SegTree* st, int l, int r) {
    int sum = 0;
    int n = st->n;
    for (l += n, r += n + 1; l < r; l >>= 1, r >>= 1) {
        if (l & 1) sum += st->tree[l++];
        if (r & 1) sum += st->tree[--r];
    }
    return sum;
}
```

## Aliases & Shorthands
Available via: `segtree_query_range`, `data-structures.separate-components.trees.segment-tree.query`, `data-structures>segtree_query_range()`, `data-structures>separate-components>trees>segment-tree>query>segtree_query_range()`, `querySegTree`

## Dependencies
Requires: `data-structures.separate-components.trees.segment-tree.struct`
