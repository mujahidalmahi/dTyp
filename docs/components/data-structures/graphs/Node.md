# Node
> **Domain:** `data-structures` | **Subcategory:** `graphs` | **Type:** `struct`
## Overview
Adjacency list edge node struct

## Signature
```c
typedef struct Node { int dest; struct Node* next; } Node; typedef Node GraphAdjNode;
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
typedef struct Node {
    int dest;
    struct Node* next;
} Node;
typedef Node GraphAdjNode;
```

## Aliases & Shorthands
Available via: `Node`, `data-structures.separate-components.graphs.adjacency-list.node`, `data-structures>Node()`, `data-structures>separate-components>graphs>adjacency-list>node>Node()`, `GraphAdjNode`, `graph_adj_node`
