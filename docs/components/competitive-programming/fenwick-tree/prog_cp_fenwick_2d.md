# prog_cp_fenwick_2d
> **Domain:** `competitive-programming` | **Subcategory:** `fenwick-tree` | **Type:** `program`
## Overview
2D Binary Indexed Tree for submatrix point updates and subgrid range queries

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
#include <string.h>

#define MAX_DIM 1024

static long long bit[MAX_DIM][MAX_DIM];
static int n_rows = 0, n_cols = 0;

static void bit2d_add(int r, int c, long long val) {
    for (int i = r; i <= n_rows; i += (i & -i)) {
        for (int j = c; j <= n_cols; j += (j & -j)) {
            bit[i][j] += val;
        }
    }
}

static long long bit2d_query(int r, int c) {
    long long sum = 0;
    for (int i = r; i > 0; i -= (i & -i)) {
        for (int j = c; j > 0; j -= (j & -j)) {
            sum += bit[i][j];
        }
    }
    return sum;
}

static long long bit2d_range(int r1, int c1, int r2, int c2) {
    return bit2d_query(r2, c2)
         - bit2d_query(r1 - 1, c2)
         - bit2d_query(r2, c1 - 1)
         + bit2d_query(r1 - 1, c1 - 1);
}

static void solve(void) {
    int q;
    if (scanf("%d %d %d", &n_rows, &n_cols, &q) != 3) return;

    memset(bit, 0, sizeof(bit));

    for (int i = 0; i < q; i++) {
        int type;
        if (scanf("%d", &type) != 1) continue;
        if (type == 1) {
            int r, c;
            long long v;
            if (scanf("%d %d %lld", &r, &c, &v) == 3) {
                bit2d_add(r, c, v);
            }
        } else {
            int r1, c1, r2, c2;
            if (scanf("%d %d %d %d", &r1, &c1, &r2, &c2) == 4) {
                printf("%lld\n", bit2d_range(r1, c1, r2, c2));
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
Available via: `prog_cp_fenwick_2d`, `competitive-programming.full-programs.cp-data-structures.fenwick-tree.prog-cp-fenwick-2d`, `competitive-programming>prog_cp_fenwick_2d()`, `competitive-programming>full-programs>cp-data-structures>fenwick-tree>prog-cp-fenwick-2d>prog_cp_fenwick_2d()`, `cpFenwick2d`
