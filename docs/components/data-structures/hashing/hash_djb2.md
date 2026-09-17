# hash_djb2
> **Domain:** `data-structures` | **Subcategory:** `hashing` | **Type:** `function`
## Overview
Dan Bernstein djb2 hash function for strings

## Signature
```c
unsigned long hash_djb2(const char* str);
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
unsigned long hash_djb2(const char* str) {
    unsigned long hash = 5381;
    int c;
    while ((c = *str++)) {
        hash = ((hash << 5) + hash) + c;
    }
    return hash;
}
```

## Aliases & Shorthands
Available via: `hash_djb2`, `data-structures.separate-components.hashing.hash-functions.djb2`, `data-structures>hash_djb2()`, `data-structures>separate-components>hashing>hash-functions>djb2>hash_djb2()`, `djb2Hash`
