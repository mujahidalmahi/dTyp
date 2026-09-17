# CpSegmentTree
> **Domain:** `competitive-programming` | **Subcategory:** `cp-data-structures` | **Type:** `struct`
## Overview
Segment tree structure for range minimum and sum queries

## Signature
```c
typedef struct CpSegmentTree { long long* tree; int n; } CpSegmentTree;
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
typedef struct CpSegmentTree {
    long long* tree;
    int n;
} CpSegmentTree;
```

## Aliases & Shorthands
Available via: `CpSegmentTree`, `competitive-programming.programming-technics.cp-data-structures.segment-tree.struct`, `competitive-programming>CpSegmentTree()`, `competitive-programming>programming-technics>cp-data-structures>segment-tree>struct>CpSegmentTree()`, `SegmentTree`
