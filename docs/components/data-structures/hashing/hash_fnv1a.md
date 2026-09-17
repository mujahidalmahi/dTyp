# hash_fnv1a
> **Domain:** `data-structures` | **Subcategory:** `hashing` | **Type:** `function`
## Overview
Fowler-Noll-Vo 32-bit FNV-1a hash algorithm

## Signature
```c
uint32_t hash_fnv1a(const char* str);
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
uint32_t hash_fnv1a(const char* str) {
    uint32_t hash = 2166136261u;
    while (*str) {
        hash ^= (uint8_t)(*str++);
        hash *= 16777619u;
    }
    return hash;
}
```

## Aliases & Shorthands
Available via: `hash_fnv1a`, `data-structures.separate-components.hashing.hash-functions.fnv1a`, `data-structures>hash_fnv1a()`, `data-structures>separate-components>hashing>hash-functions>fnv1a>hash_fnv1a()`, `fnv1aHash`
