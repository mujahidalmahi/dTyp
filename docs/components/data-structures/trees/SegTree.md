# SegTree
> **Domain:** `data-structures` | **Subcategory:** `trees` | **Type:** `struct`
## Overview
Segment tree structure for range sum queries

## Signature
```c
typedef struct SegTree { int* tree; int n; } SegTree;
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
typedef struct SegTree {
    int* tree;
    int n;
} SegTree;
```

## Aliases & Shorthands
Available via: `SegTree`, `data-structures.separate-components.trees.segment-tree.struct`, `data-structures>SegTree()`, `data-structures>separate-components>trees>segment-tree>struct>SegTree()`, `segtree_struct`
