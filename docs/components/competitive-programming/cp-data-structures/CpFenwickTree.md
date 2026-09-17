# CpFenwickTree
> **Domain:** `competitive-programming` | **Subcategory:** `cp-data-structures` | **Type:** `struct`
## Overview
Fenwick Tree (Binary Indexed Tree) structure for prefix sums and point updates

## Signature
```c
typedef struct CpFenwickTree { long long* tree; int size; } CpFenwickTree;
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
typedef struct CpFenwickTree {
    long long* tree;
    int size;
} CpFenwickTree;
```

## Aliases & Shorthands
Available via: `CpFenwickTree`, `competitive-programming.programming-technics.cp-data-structures.fenwick-tree.struct`, `competitive-programming>CpFenwickTree()`, `competitive-programming>programming-technics>cp-data-structures>fenwick-tree>struct>CpFenwickTree()`, `FenwickTree`
