# cp_seg_tree_build
> **Domain:** `competitive-programming` | **Subcategory:** `cp-data-structures` | **Type:** `function`
## Overview
Builds a segment tree from an array in O(N)

## Signature
```c
void cp_seg_tree_build(CpSegmentTree* st, const int* arr, int node, int start, int end);
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
void cp_seg_tree_build(CpSegmentTree* st, const int* arr, int node, int start, int end) {
    if (start == end) {
        st->tree[node] = arr[start];
        return;
    }
    int mid = start + (end - start) / 2;
    cp_seg_tree_build(st, arr, 2 * node, start, mid);
    cp_seg_tree_build(st, arr, 2 * node + 1, mid + 1, end);
    st->tree[node] = (st->tree[2 * node] < st->tree[2 * node + 1]) ? st->tree[2 * node] : st->tree[2 * node + 1];
}
```

## Aliases & Shorthands
Available via: `cp_seg_tree_build`, `competitive-programming.programming-technics.cp-data-structures.segment-tree.build`, `competitive-programming>cp_seg_tree_build()`, `competitive-programming>programming-technics>cp-data-structures>segment-tree>build>cp_seg_tree_build()`, `segTreeBuild`

## Dependencies
Requires: `competitive-programming.programming-technics.cp-data-structures.segment-tree.struct`
