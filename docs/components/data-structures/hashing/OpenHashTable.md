# OpenHashTable
> **Domain:** `data-structures` | **Subcategory:** `hashing` | **Type:** `struct`
## Overview
Open addressing hash table with linear probing

## Signature
```c
typedef struct OpenEntry { char key[32]; int value; bool occupied; } OpenEntry; typedef struct OpenHashTable { OpenEntry* entries; int capacity; int count; } OpenHashTable;
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
typedef struct OpenEntry {
    char key[32];
    int value;
    bool occupied;
} OpenEntry;

typedef struct OpenHashTable {
    OpenEntry* entries;
    int capacity;
    int count;
} OpenHashTable;
```

## Aliases & Shorthands
Available via: `OpenHashTable`, `data-structures.separate-components.hashing.open-addressing.struct`, `data-structures>OpenHashTable()`, `data-structures>separate-components>hashing>open-addressing>struct>OpenHashTable()`, `open_hash_table_struct`
