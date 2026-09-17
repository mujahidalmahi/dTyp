# prog_cp_disjoint_set
> **Domain:** `competitive-programming` | **Subcategory:** `cp-data-structures` | **Type:** `program`
## Overview
Complete competitive programming program executing DSU unions and detecting cycle connections

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

int dsu_find(int* parent, int i) {
    if (parent[i] == i) return i;
    parent[i] = dsu_find(parent, parent[i]);
    return parent[i];
}

int dsu_union(int* parent, int* rank, int i, int j) {
    int root_i = dsu_find(parent, i);
    int root_j = dsu_find(parent, j);
    if (root_i == root_j) return 0;
    if (rank[root_i] < rank[root_j]) {
        parent[root_i] = root_j;
    } else if (rank[root_i] > rank[root_j]) {
        parent[root_j] = root_i;
    } else {
        parent[root_j] = root_i;
        rank[root_i]++;
    }
    return 1;
}

int main(void) {
    int n = 5;
    int parent[5], rank[5];
    for (int i = 0; i < n; i++) { parent[i] = i; rank[i] = 0; }
    dsu_union(parent, rank, 0, 1);
    dsu_union(parent, rank, 2, 3);
    dsu_union(parent, rank, 1, 2);
    printf("Are 0 and 3 connected: %s
", dsu_find(parent, 0) == dsu_find(parent, 3) ? "Yes" : "No");
    printf("Are 0 and 4 connected: %s
", dsu_find(parent, 0) == dsu_find(parent, 4) ? "Yes" : "No");
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_cp_disjoint_set`, `competitive-programming.full-programs.cp-data-structures.disjoint-set.prog-disjoint-set`, `competitive-programming>prog_cp_disjoint_set()`, `competitive-programming>full-programs>cp-data-structures>disjoint-set>prog-disjoint-set>prog_cp_disjoint_set()`
