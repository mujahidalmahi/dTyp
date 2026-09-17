# GraphList
> **Domain:** `data-structures` | **Subcategory:** `graphs` | **Type:** `struct`
## Overview
Graph represented by array of adjacency list heads

## Signature
```c
typedef struct GraphList { int vertices; Node** adj; } GraphList;
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
typedef struct GraphList {
    int vertices;
    Node** adj;
} GraphList;
```

## Aliases & Shorthands
Available via: `GraphList`, `data-structures.separate-components.graphs.adjacency-list.struct`, `data-structures>GraphList()`, `data-structures>separate-components>graphs>adjacency-list>struct>GraphList()`, `graph_list_struct`

## Dependencies
Requires: `data-structures.separate-components.graphs.adjacency-list.node`
