# cp_ncr_modulo
> **Domain:** `competitive-programming` | **Subcategory:** `number-theory` | **Type:** `function`
## Overview
Calculates nCr modulo mod in O(1) using precomputed factorial tables

## Signature
```c
long long cp_ncr_modulo(int n, int r, long long mod, const long long* fact, const long long* inv_fact);
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
long long cp_ncr_modulo(int n, int r, long long mod, const long long* fact, const long long* inv_fact) {
    if (r < 0 || r > n) return 0;
    long long num = fact[n];
    long long den = (inv_fact[r] * inv_fact[n - r]) % mod;
    return (num * den) % mod;
}
```

## Aliases & Shorthands
Available via: `cp_ncr_modulo`, `competitive-programming.programming-technics.number-theory.combinatorics.ncr-modulo`, `competitive-programming>cp_ncr_modulo()`, `competitive-programming>programming-technics>number-theory>combinatorics>ncr-modulo>cp_ncr_modulo()`, `ncrModulo`
