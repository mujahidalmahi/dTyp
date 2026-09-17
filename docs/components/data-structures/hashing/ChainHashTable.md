# ChainHashTable
> **Domain:** `data-structures` | **Subcategory:** `hashing` | **Type:** `struct`
## Overview
Hash table structure with linked list separate chaining

## Signature
```c
typedef struct ChainHashTable { Node** buckets; int size; } ChainHashTable;
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
typedef struct ChainHashTable {
    Node** buckets;
    int size;
} ChainHashTable;
```

## Aliases & Shorthands
Available via: `ChainHashTable`, `data-structures.separate-components.hashing.chaining.struct`, `data-structures>ChainHashTable()`, `data-structures>separate-components>hashing>chaining>struct>ChainHashTable()`, `chain_table_struct`

## Dependencies
Requires: `data-structures.separate-components.hashing.chaining.node`
