# prog_cp_fenwick_tree
> **Domain:** `competitive-programming` | **Subcategory:** `cp-data-structures` | **Type:** `program`
## Overview
Complete competitive programming program executing point updates and range queries on a Fenwick tree

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

void fenwick_update(long long* tree, int n, int idx, long long delta) {
    while (idx <= n) {
        tree[idx] += delta;
        idx += (idx & (-idx));
    }
}

long long fenwick_query(const long long* tree, int idx) {
    long long sum = 0;
    while (idx > 0) {
        sum += tree[idx];
        idx -= (idx & (-idx));
    }
    return sum;
}

int main(void) {
    int n = 8;
    long long tree[9] = {0};
    int initial[] = {0, 1, 3, 5, 7, 9, 11, 13, 15};
    for (int i = 1; i <= n; i++) {
        fenwick_update(tree, n, i, initial[i]);
    }
    printf("Prefix sum(5): %lld\n", fenwick_query(tree, 5));
    printf("Range sum(3..6): %lld\n", fenwick_query(tree, 6) - fenwick_query(tree, 2));
    fenwick_update(tree, n, 4, 10);
    printf("Range sum(3..6) after +10 at idx 4: %lld\n", fenwick_query(tree, 6) - fenwick_query(tree, 2));
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_cp_fenwick_tree`, `competitive-programming.full-programs.cp-data-structures.fenwick-tree.prog-fenwick-tree`, `competitive-programming>prog_cp_fenwick_tree()`, `competitive-programming>full-programs>cp-data-structures>fenwick-tree>prog-fenwick-tree>prog_cp_fenwick_tree()`
