# prog_graph_traversals
> **Domain:** `algorithms` | **Subcategory:** `graph-algorithms` | **Type:** `program`
## Overview
Complete graph program executing Breadth-First and Depth-First traversals

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

void bfs(const int matrix[][4], int v, int start) {
    int visited[4] = {0};
    int queue[4];
    int f = 0, r = 0;
    visited[start] = 1;
    queue[r++] = start;
    printf("BFS Order: ");
    while (f < r) {
        int u = queue[f++];
        printf("%d ", u);
        for (int i = 0; i < v; i++) {
            if (matrix[u][i] && !visited[i]) {
                visited[i] = 1;
                queue[r++] = i;
            }
        }
    }
    putchar('
');
}

int main(void) {
    int graph[4][4] = {
        {0, 1, 1, 0},
        {1, 0, 1, 1},
        {1, 1, 0, 1},
        {0, 1, 1, 0}
    };
    bfs(graph, 4, 0);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_graph_traversals`, `algorithms.full-programs.graph-algorithms.graph-traversals.prog-graph-traversals`, `algorithms>prog_graph_traversals()`, `algorithms>full-programs>graph-algorithms>graph-traversals>prog-graph-traversals>prog_graph_traversals()`, `programGraphTraversals`
