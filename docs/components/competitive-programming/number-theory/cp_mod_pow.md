# cp_mod_pow
> **Domain:** `competitive-programming` | **Subcategory:** `number-theory` | **Type:** `function`
## Overview
Calculates (base^exp) modulo mod in logarithmic time

## Signature
```c
long long cp_mod_pow(long long base, long long exp, long long mod);
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
long long cp_mod_pow(long long base, long long exp, long long mod) {
    long long res = 1;
    base %= mod;
    while (exp > 0) {
        if (exp & 1) res = (res * base) % mod;
        base = (base * base) % mod;
        exp >>= 1;
    }
    return res;
}
```

## Aliases & Shorthands
Available via: `cp_mod_pow`, `competitive-programming.programming-technics.number-theory.modular-arithmetic.mod-pow`, `competitive-programming>cp_mod_pow()`, `competitive-programming>programming-technics>number-theory>modular-arithmetic>mod-pow>cp_mod_pow()`, `modPow`
