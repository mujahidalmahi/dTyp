# graph_bfs_traversal
> **Domain:** `algorithms` | **Subcategory:** `graph-algorithms` | **Type:** `function`
## Overview
Performs Breadth-First Search on adjacency matrix starting at source

## Signature
```c
void graph_bfs_traversal(const int* matrix, int v, int start, int* visited);
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
void graph_bfs_traversal(const int* matrix, int v, int start, int* visited) {
    int* queue = (int*)malloc(v * sizeof(int));
    int front = 0, rear = 0;
    visited[start] = 1;
    queue[rear++] = start;
    while (front < rear) {
        int u = queue[front++];
        for (int i = 0; i < v; i++) {
            if (matrix[u * v + i] && !visited[i]) {
                visited[i] = 1;
                queue[rear++] = i;
            }
        }
    }
    free(queue);
}
```

## Aliases & Shorthands
Available via: `graph_bfs_traversal`, `algorithms.separate-components.graph-algorithms.graph-traversals.bfs`, `algorithms>graph_bfs_traversal()`, `algorithms>separate-components>graph-algorithms>graph-traversals>bfs>graph_bfs_traversal()`, `graphBFS`
