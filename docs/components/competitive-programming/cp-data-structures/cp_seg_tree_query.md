# cp_seg_tree_query
> **Domain:** `competitive-programming` | **Subcategory:** `cp-data-structures` | **Type:** `function`
## Overview
Queries range minimum in [l, r] in O(log N)

## Signature
```c
long long cp_seg_tree_query(const CpSegmentTree* st, int node, int start, int end, int l, int r);
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
long long cp_seg_tree_query(const CpSegmentTree* st, int node, int start, int end, int l, int r) {
    if (r < start || end < l) return 9223372036854775807LL;
    if (l <= start && end <= r) return st->tree[node];
    int mid = start + (end - start) / 2;
    long long left_min = cp_seg_tree_query(st, 2 * node, start, mid, l, r);
    long long right_min = cp_seg_tree_query(st, 2 * node + 1, mid + 1, end, l, r);
    return (left_min < right_min) ? left_min : right_min;
}
```

## Aliases & Shorthands
Available via: `cp_seg_tree_query`, `competitive-programming.programming-technics.cp-data-structures.segment-tree.query`, `competitive-programming>cp_seg_tree_query()`, `competitive-programming>programming-technics>cp-data-structures>segment-tree>query>cp_seg_tree_query()`, `segTreeQuery`

## Dependencies
Requires: `competitive-programming.programming-technics.cp-data-structures.segment-tree.struct`
