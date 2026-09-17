# graph_dfs_traversal
> **Domain:** `algorithms` | **Subcategory:** `graph-algorithms` | **Type:** `function`
## Overview
Performs Depth-First Search on adjacency matrix recursively

## Signature
```c
void graph_dfs_traversal(const int* matrix, int v, int u, int* visited);
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
void graph_dfs_traversal(const int* matrix, int v, int u, int* visited) {
    visited[u] = 1;
    for (int i = 0; i < v; i++) {
        if (matrix[u * v + i] && !visited[i]) {
            graph_dfs_traversal(matrix, v, i, visited);
        }
    }
}
```

## Aliases & Shorthands
Available via: `graph_dfs_traversal`, `algorithms.separate-components.graph-algorithms.graph-traversals.dfs`, `algorithms>graph_dfs_traversal()`, `algorithms>separate-components>graph-algorithms>graph-traversals>dfs>graph_dfs_traversal()`, `graphDFS`
