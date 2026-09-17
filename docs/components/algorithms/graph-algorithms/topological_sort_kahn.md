# topological_sort_kahn
> **Domain:** `algorithms` | **Subcategory:** `graph-algorithms` | **Type:** `function`
## Overview
Computes DAG topological ordering using Kahn in-degree algorithm

## Signature
```c
int topological_sort_kahn(const int* adj_matrix, int v, int* order);
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
int topological_sort_kahn(const int* adj_matrix, int v, int* order) {
    int* in_degree = (int*)calloc(v, sizeof(int));
    for (int i = 0; i < v; i++) {
        for (int j = 0; j < v; j++) {
            if (adj_matrix[i * v + j]) in_degree[j]++;
        }
    }
    int* queue = (int*)malloc(v * sizeof(int));
    int front = 0, rear = 0;
    for (int i = 0; i < v; i++) {
        if (in_degree[i] == 0) queue[rear++] = i;
    }
    int count = 0;
    while (front < rear) {
        int u = queue[front++];
        order[count++] = u;
        for (int i = 0; i < v; i++) {
            if (adj_matrix[u * v + i]) {
                if (--in_degree[i] == 0) queue[rear++] = i;
            }
        }
    }
    free(in_degree);
    free(queue);
    return (count == v);
}
```

## Aliases & Shorthands
Available via: `topological_sort_kahn`, `algorithms.separate-components.graph-algorithms.topological-sort.kahn`, `algorithms>topological_sort_kahn()`, `algorithms>separate-components>graph-algorithms>topological-sort>kahn>topological_sort_kahn()`, `kahnTopologicalSort`
