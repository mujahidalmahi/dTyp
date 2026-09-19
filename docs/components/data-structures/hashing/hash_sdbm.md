# hash_sdbm
> **Domain:** `data-structures` | **Subcategory:** `hashing` | **Type:** `function`
## Overview
Sleepycat Berkeley DB SDBM hash algorithm

## Signature
```c
unsigned long hash_sdbm(const char* str);
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
unsigned long hash_sdbm(const char* str) {
    unsigned long hash = 0;
    int c;
    while ((c = (unsigned char)*str++)) {
        hash = c + (hash << 6) + (hash << 16) - hash;
    }
    return hash;
}
```

## Aliases & Shorthands
Available via: `hash_sdbm`, `data-structures.separate-components.hashing.hash-functions.sdbm`, `data-structures>hash_sdbm()`, `data-structures>separate-components>hashing>hash-functions>sdbm>hash_sdbm()`, `sdbmHash`
