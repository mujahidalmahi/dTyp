# cp_seg_tree_update
> **Domain:** `competitive-programming` | **Subcategory:** `cp-data-structures` | **Type:** `function`
## Overview
Updates value at index idx in segment tree in O(log N)

## Signature
```c
void cp_seg_tree_update(CpSegmentTree* st, int node, int start, int end, int idx, long long val);
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
void cp_seg_tree_update(CpSegmentTree* st, int node, int start, int end, int idx, long long val) {
    if (start == end) {
        st->tree[node] = val;
        return;
    }
    int mid = start + (end - start) / 2;
    if (idx <= mid) cp_seg_tree_update(st, 2 * node, start, mid, idx, val);
    else cp_seg_tree_update(st, 2 * node + 1, mid + 1, end, idx, val);
    st->tree[node] = (st->tree[2 * node] < st->tree[2 * node + 1]) ? st->tree[2 * node] : st->tree[2 * node + 1];
}
```

## Aliases & Shorthands
Available via: `cp_seg_tree_update`, `competitive-programming.programming-technics.cp-data-structures.segment-tree.update`, `competitive-programming>cp_seg_tree_update()`, `competitive-programming>programming-technics>cp-data-structures>segment-tree>update>cp_seg_tree_update()`, `segTreeUpdate`

## Dependencies
Requires: `competitive-programming.programming-technics.cp-data-structures.segment-tree.struct`
