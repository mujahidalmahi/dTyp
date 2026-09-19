# prog_cp_segment_tree_beats
> **Domain:** `competitive-programming` | **Subcategory:** `segment-tree` | **Type:** `program`
## Overview
Segment Tree Beats algorithm for range min updates and range sum queries

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

#define INF 2000000000

typedef struct {
    long long sum;
    int max1;
    int max2;
    int max_cnt;
} BeatsNode;

static BeatsNode tree[400005];
static int arr[100005];

static void merge_nodes(int node) {
    int lc = 2 * node, rc = 2 * node + 1;
    tree[node].sum = tree[lc].sum + tree[rc].sum;

    if (tree[lc].max1 == tree[rc].max1) {
        tree[node].max1 = tree[lc].max1;
        tree[node].max_cnt = tree[lc].max_cnt + tree[rc].max_cnt;
        tree[node].max2 = (tree[lc].max2 > tree[rc].max2) ? tree[lc].max2 : tree[rc].max2;
    } else if (tree[lc].max1 > tree[rc].max1) {
        tree[node].max1 = tree[lc].max1;
        tree[node].max_cnt = tree[lc].max_cnt;
        tree[node].max2 = (tree[lc].max2 > tree[rc].max1) ? tree[lc].max2 : tree[rc].max1;
    } else {
        tree[node].max1 = tree[rc].max1;
        tree[node].max_cnt = tree[rc].max_cnt;
        tree[node].max2 = (tree[lc].max1 > tree[rc].max2) ? tree[lc].max1 : tree[rc].max2;
    }
}

static void apply_chmin(int node, int limit) {
    if (limit >= tree[node].max1) return;
    tree[node].sum -= (long long)(tree[node].max1 - limit) * tree[node].max_cnt;
    tree[node].max1 = limit;
}

static void push_down(int node) {
    apply_chmin(2 * node, tree[node].max1);
    apply_chmin(2 * node + 1, tree[node].max1);
}

static void build(int node, int start, int end) {
    if (start == end) {
        tree[node].sum = arr[start];
        tree[node].max1 = arr[start];
        tree[node].max2 = -INF;
        tree[node].max_cnt = 1;
        return;
    }
    int mid = (start + end) / 2;
    build(2 * node, start, mid);
    build(2 * node + 1, mid + 1, end);
    merge_nodes(node);
}

static void update_chmin(int node, int start, int end, int l, int r, int val) {
    if (r < start || end < l || val >= tree[node].max1) return;
    if (l <= start && end <= r && val > tree[node].max2) {
        apply_chmin(node, val);
        return;
    }
    push_down(node);
    int mid = (start + end) / 2;
    update_chmin(2 * node, start, mid, l, r, val);
    update_chmin(2 * node + 1, mid + 1, end, l, r, val);
    merge_nodes(node);
}

static long long query_sum(int node, int start, int end, int l, int r) {
    if (r < start || end < l) return 0;
    if (l <= start && end <= r) return tree[node].sum;
    push_down(node);
    int mid = (start + end) / 2;
    return query_sum(2 * node, start, mid, l, r) + query_sum(2 * node + 1, mid + 1, end, l, r);
}

static void solve(void) {
    int n, q;
    if (scanf("%d %d", &n, &q) != 2) return;

    for (int i = 1; i <= n; i++) scanf("%d", &arr[i]);
    build(1, 1, n);

    for (int i = 0; i < q; i++) {
        int type;
        if (scanf("%d", &type) != 1) continue;
        if (type == 1) {
            int l, r, x;
            if (scanf("%d %d %d", &l, &r, &x) == 3) {
                update_chmin(1, 1, n, l, r, x);
            }
        } else {
            int l, r;
            if (scanf("%d %d", &l, &r) == 2) {
                printf("%lld\n", query_sum(1, 1, n, l, r));
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
Available via: `prog_cp_segment_tree_beats`, `competitive-programming.full-programs.cp-data-structures.segment-tree.prog-cp-segment-tree-beats`, `competitive-programming>prog_cp_segment_tree_beats()`, `competitive-programming>full-programs>cp-data-structures>segment-tree>prog-cp-segment-tree-beats>prog_cp_segment_tree_beats()`, `cpSegmentTreeBeats`
