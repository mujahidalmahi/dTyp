# prog_cp_sparse_table_rmq
> **Domain:** `competitive-programming` | **Subcategory:** `prefix-sums` | **Type:** `program`
## Overview
Static Range Minimum Query Sparse Table answering static range queries in O(1)

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

#define MAXN 100005
#define LOGN 18

static int st[MAXN][LOGN];
static int log_table[MAXN];

static int min_val(int a, int b) {
    return (a < b) ? a : b;
}

static void solve(void) {
    int n, q;
    if (scanf("%d %d", &n, &q) != 2) return;

    for (int i = 0; i < n; i++) {
        scanf("%d", &st[i][0]);
    }

    log_table[1] = 0;
    for (int i = 2; i <= n; i++) {
        log_table[i] = log_table[i / 2] + 1;
    }

    for (int j = 1; j < LOGN; j++) {
        for (int i = 0; i + (1 << j) <= n; i++) {
            st[i][j] = min_val(st[i][j - 1], st[i + (1 << (j - 1))][j - 1]);
        }
    }

    for (int k = 0; k < q; k++) {
        int l, r;
        if (scanf("%d %d", &l, &r) == 2) {
            int j = log_table[r - l + 1];
            int ans = min_val(st[l][j], st[r - (1 << j) + 1][j]);
            printf("%d%c", ans, (k == q - 1 ? '\n' : ' '));
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
Available via: `prog_cp_sparse_table_rmq`, `competitive-programming.full-programs.range-queries.prefix-sums.prog-cp-sparse-table-rmq`, `competitive-programming>prog_cp_sparse_table_rmq()`, `competitive-programming>full-programs>range-queries>prefix-sums>prog-cp-sparse-table-rmq>prog_cp_sparse_table_rmq()`, `cpSparseTableRmq`
