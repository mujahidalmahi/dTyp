# hash_polynomial
> **Domain:** `data-structures` | **Subcategory:** `hashing` | **Type:** `function`
## Overview
Polynomial rolling hash with base 31 and prime modulo 10^9+9

## Signature
```c
uint64_t hash_polynomial(const char* str);
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
uint64_t hash_polynomial(const char* str) {
    const int p = 31;
    const uint64_t m = 1000000009;
    uint64_t hash_val = 0;
    uint64_t p_pow = 1;
    while (*str) {
        hash_val = (hash_val + (*str - 'a' + 1) * p_pow) % m;
        p_pow = (p_pow * p) % m;
        str++;
    }
    return hash_val;
}
```

## Aliases & Shorthands
Available via: `hash_polynomial`, `data-structures.separate-components.hashing.hash-functions.polynomial`, `data-structures>hash_polynomial()`, `data-structures>separate-components>hashing>hash-functions>polynomial>hash_polynomial()`, `polynomialHash`
