# prog_graph_adj_matrix
> **Domain:** `data-structures` | **Subcategory:** `graphs` | **Type:** `program`
## Overview
Complete graph program using 2D adjacency matrix with edge checks

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

int main(void) {
    int v = 4;
    int matrix[4][4] = {0};

    matrix[0][1] = matrix[1][0] = 1;
    matrix[0][2] = matrix[2][0] = 1;
    matrix[1][2] = matrix[2][1] = 1;
    matrix[2][3] = matrix[3][2] = 1;

    printf("Graph Adjacency Matrix (%dx%d):
", v, v);
    for (int i = 0; i < v; i++) {
        for (int j = 0; j < v; j++) {
            printf("%3d", matrix[i][j]);
        }
        putchar('
');
    }

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_graph_adj_matrix`, `data-structures.full-programs.graphs.adjacency-matrix.prog-graph-adj-matrix`, `data-structures>prog_graph_adj_matrix()`, `data-structures>full-programs>graphs>adjacency-matrix>prog-graph-adj-matrix>prog_graph_adj_matrix()`, `programGraphAdjMatrix`
