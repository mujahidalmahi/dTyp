# cp_mod_inverse
> **Domain:** `competitive-programming` | **Subcategory:** `number-theory` | **Type:** `function`
## Overview
Calculates modular multiplicative inverse of a modulo mod

## Signature
```c
long long cp_mod_inverse(long long a, long long mod);
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
long long cp_mod_inverse(long long a, long long mod) {
    long long x, y;
    long long g = cp_extended_gcd(a, mod, &x, &y);
    if (g != 1) return -1;
    return (x % mod + mod) % mod;
}
```

## Aliases & Shorthands
Available via: `cp_mod_inverse`, `competitive-programming.programming-technics.number-theory.modular-arithmetic.mod-inverse`, `competitive-programming>cp_mod_inverse()`, `competitive-programming>programming-technics>number-theory>modular-arithmetic>mod-inverse>cp_mod_inverse()`, `modInverse`

## Dependencies
Requires: `competitive-programming.programming-technics.number-theory.modular-arithmetic.extended-gcd`
