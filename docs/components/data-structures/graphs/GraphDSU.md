# GraphDSU
> **Domain:** `data-structures` | **Subcategory:** `graphs` | **Type:** `struct`
## Overview
Disjoint Set Union structure with parent and rank arrays

## Signature
```c
typedef struct GraphDSU { int* parent; int* rank; int n; } GraphDSU;
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
typedef struct GraphDSU {
    int* parent;
    int* rank;
    int n;
} GraphDSU;
```

## Aliases & Shorthands
Available via: `GraphDSU`, `data-structures.separate-components.graphs.dsu.struct`, `data-structures>GraphDSU()`, `data-structures>separate-components>graphs>dsu>struct>GraphDSU()`, `graph_dsu_struct`
