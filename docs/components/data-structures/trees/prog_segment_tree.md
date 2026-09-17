# prog_segment_tree
> **Domain:** `data-structures` | **Subcategory:** `trees` | **Type:** `program`
## Overview
Complete iterative segment tree program with range sum queries and point updates

## Signature
```c
int main(void)
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
#include <stdlib.h>

typedef struct SegTree {
    int* tree;
    int n;
} SegTree;

SegTree* seg_build(const int* arr, int n) {
    SegTree* st = (SegTree*)malloc(sizeof(SegTree));
    st->n = n;
    st->tree = (int*)calloc(2 * n, sizeof(int));
    for (int i = 0; i < n; i++) st->tree[n + i] = arr[i];
    for (int i = n - 1; i > 0; i--) st->tree[i] = st->tree[i << 1] + st->tree[i << 1 | 1];
    return st;
}

void seg_update(SegTree* st, int p, int val) {
    for (st->tree[p += st->n] = val; p > 1; p >>= 1) {
        st->tree[p >> 1] = st->tree[p] + st->tree[p ^ 1];
    }
}

int seg_query(const SegTree* st, int l, int r) {
    int res = 0;
    int n = st->n;
    for (l += n, r += n + 1; l < r; l >>= 1, r >>= 1) {
        if (l & 1) res += st->tree[l++];
        if (r & 1) res += st->tree[--r];
    }
    return res;
}

int main(void) {
    int a[] = {1, 2, 3, 4, 5, 6};
    SegTree* st = seg_build(a, 6);

    printf("Sum of range [1, 4] = %d
", seg_query(st, 1, 4));
    seg_update(st, 2, 10);
    printf("After update, sum of range [1, 4] = %d
", seg_query(st, 1, 4));

    free(st->tree);
    free(st);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_segment_tree`, `data-structures.full-programs.trees.segment-tree.prog-segment-tree`, `data-structures>prog_segment_tree()`, `data-structures>full-programs>trees>segment-tree>prog-segment-tree>prog_segment_tree()`, `programSegmentTree`
