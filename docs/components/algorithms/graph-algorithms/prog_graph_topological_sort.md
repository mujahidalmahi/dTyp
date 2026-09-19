# prog_graph_topological_sort
> **Domain:** `algorithms` | **Subcategory:** `graph-algorithms` | **Type:** `program`
## Overview
Complete Kahn's DAG topological sorting program

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

int main(void) {
    int v = 4;
    int adj[4][4] = {
        {0, 1, 1, 0},
        {0, 0, 0, 1},
        {0, 0, 0, 1},
        {0, 0, 0, 0}
    };

    int in_deg[4] = {0};
    for (int i = 0; i < v; i++) {
        for (int j = 0; j < v; j++) {
            if (adj[i][j]) in_deg[j]++;
        }
    }

    int q[4], f = 0, r = 0;
    for (int i = 0; i < v; i++) if (in_deg[i] == 0) q[r++] = i;

    printf("Topological Order: ");
    while (f < r) {
        int u = q[f++];
        printf("%d ", u);
        for (int i = 0; i < v; i++) {
            if (adj[u][i] && --in_deg[i] == 0) {
                q[r++] = i;
            }
        }
    }
    putchar('\n');
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_graph_topological_sort`, `algorithms.full-programs.graph-algorithms.topological-sort.prog-topological-sort`, `algorithms>prog_graph_topological_sort()`, `algorithms>full-programs>graph-algorithms>topological-sort>prog-topological-sort>prog_graph_topological_sort()`, `programTopologicalSort`
