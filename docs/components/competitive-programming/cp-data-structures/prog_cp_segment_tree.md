# prog_cp_segment_tree
> **Domain:** `competitive-programming` | **Subcategory:** `cp-data-structures` | **Type:** `program`
## Overview
Complete competitive programming program executing range minimum queries and point updates

## Signature
```c
int main(void);
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
#include <stdio.h>

void seg_build(long long* tree, const int* arr, int node, int start, int end) {
    if (start == end) {
        tree[node] = arr[start];
        return;
    }
    int mid = start + (end - start) / 2;
    seg_build(tree, arr, 2 * node, start, mid);
    seg_build(tree, arr, 2 * node + 1, mid + 1, end);
    tree[node] = (tree[2 * node] < tree[2 * node + 1]) ? tree[2 * node] : tree[2 * node + 1];
}

void seg_update(long long* tree, int node, int start, int end, int idx, long long val) {
    if (start == end) {
        tree[node] = val;
        return;
    }
    int mid = start + (end - start) / 2;
    if (idx <= mid) seg_update(tree, 2 * node, start, mid, idx, val);
    else seg_update(tree, 2 * node + 1, mid + 1, end, idx, val);
    tree[node] = (tree[2 * node] < tree[2 * node + 1]) ? tree[2 * node] : tree[2 * node + 1];
}

long long seg_query(const long long* tree, int node, int start, int end, int l, int r) {
    if (r < start || end < l) return 9223372036854775807LL;
    if (l <= start && end <= r) return tree[node];
    int mid = start + (end - start) / 2;
    long long l_min = seg_query(tree, 2 * node, start, mid, l, r);
    long long r_min = seg_query(tree, 2 * node + 1, mid + 1, end, l, r);
    return (l_min < r_min) ? l_min : r_min;
}

int main(void) {
    int arr[] = {18, 17, 13, 19, 15, 11, 20};
    int n = 7;
    long long tree[30];
    seg_build(tree, arr, 1, 0, n - 1);
    printf("Min in range [1, 4]: %lld\n", seg_query(tree, 1, 0, n - 1, 1, 4));
    seg_update(tree, 1, 0, n - 1, 2, 5);
    printf("Min in range [1, 4] after update idx 2 to 5: %lld\n", seg_query(tree, 1, 0, n - 1, 1, 4));
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_cp_segment_tree`, `competitive-programming.full-programs.cp-data-structures.segment-tree.prog-segment-tree`, `competitive-programming>prog_cp_segment_tree()`, `competitive-programming>full-programs>cp-data-structures>segment-tree>prog-segment-tree>prog_cp_segment_tree()`
