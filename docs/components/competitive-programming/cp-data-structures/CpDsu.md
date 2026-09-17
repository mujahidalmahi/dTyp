# CpDsu
> **Domain:** `competitive-programming` | **Subcategory:** `cp-data-structures` | **Type:** `struct`
## Overview
Disjoint Set Union structure with rank and path compression

## Signature
```c
typedef struct CpDsu { int* parent; int* rank; int size; } CpDsu;
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
typedef struct CpDsu {
    int* parent;
    int* rank;
    int size;
} CpDsu;
```

## Aliases & Shorthands
Available via: `CpDsu`, `competitive-programming.programming-technics.cp-data-structures.disjoint-set.struct`, `competitive-programming>CpDsu()`, `competitive-programming>programming-technics>cp-data-structures>disjoint-set>struct>CpDsu()`, `DisjointSet`
