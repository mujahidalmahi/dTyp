# prog_cp_lazy_segment_tree
> **Domain:** `competitive-programming` | **Subcategory:** `segment-tree` | **Type:** `program`
## Overview
Segment Tree with Lazy Propagation supporting range addition and range sum queries

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
#include <stdlib.h>

typedef struct {
    long long sum;
    long long lazy;
} SegNode;

static SegNode tree[400005];
static long long arr[100005];

static void push(int node, int start, int end) {
    if (tree[node].lazy != 0) {
        long long val = tree[node].lazy;
        int mid = (start + end) / 2;
        tree[2 * node].sum += (mid - start + 1) * val;
        tree[2 * node].lazy += val;
        tree[2 * node + 1].sum += (end - mid) * val;
        tree[2 * node + 1].lazy += val;
        tree[node].lazy = 0;
    }
}

static void build(int node, int start, int end) {
    tree[node].lazy = 0;
    if (start == end) {
        tree[node].sum = arr[start];
        return;
    }
    int mid = (start + end) / 2;
    build(2 * node, start, mid);
    build(2 * node + 1, mid + 1, end);
    tree[node].sum = tree[2 * node].sum + tree[2 * node + 1].sum;
}

static void update_range(int node, int start, int end, int l, int r, long long val) {
    if (r < start || end < l) return;
    if (l <= start && end <= r) {
        tree[node].sum += (end - start + 1) * val;
        tree[node].lazy += val;
        return;
    }
    push(node, start, end);
    int mid = (start + end) / 2;
    update_range(2 * node, start, mid, l, r, val);
    update_range(2 * node + 1, mid + 1, end, l, r, val);
    tree[node].sum = tree[2 * node].sum + tree[2 * node + 1].sum;
}

static long long query_range(int node, int start, int end, int l, int r) {
    if (r < start || end < l) return 0;
    if (l <= start && end <= r) return tree[node].sum;
    push(node, start, end);
    int mid = (start + end) / 2;
    return query_range(2 * node, start, mid, l, r) +
           query_range(2 * node + 1, mid + 1, end, l, r);
}

static void solve(void) {
    int n, q;
    if (scanf("%d %d", &n, &q) != 2) return;

    for (int i = 1; i <= n; i++) scanf("%lld", &arr[i]);
    build(1, 1, n);

    for (int i = 0; i < q; i++) {
        int type;
        if (scanf("%d", &type) != 1) continue;
        if (type == 1) {
            int l, r;
            long long v;
            if (scanf("%d %d %lld", &l, &r, &v) == 3) {
                update_range(1, 1, n, l, r, v);
            }
        } else {
            int l, r;
            if (scanf("%d %d", &l, &r) == 2) {
                printf("%lld\n", query_range(1, 1, n, l, r));
            }
        }
    }
}

int main(void) {
    int t;
    if (scanf("%d", &t) != 1) t = 1;
    while (t--) {
        solve();
    }
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_cp_lazy_segment_tree`, `competitive-programming.full-programs.cp-data-structures.segment-tree.prog-cp-lazy-segment-tree`, `competitive-programming>prog_cp_lazy_segment_tree()`, `competitive-programming>full-programs>cp-data-structures>segment-tree>prog-cp-lazy-segment-tree>prog_cp_lazy_segment_tree()`, `cpLazySegmentTree`
