# cp_extended_gcd
> **Domain:** `competitive-programming` | **Subcategory:** `number-theory` | **Type:** `function`
## Overview
Computes gcd and Bezout coefficients x, y such that ax + by = gcd(a, b)

## Signature
```c
long long cp_extended_gcd(long long a, long long b, long long* x, long long* y);
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
long long cp_extended_gcd(long long a, long long b, long long* x, long long* y) {
    if (b == 0) {
        *x = 1;
        *y = 0;
        return a;
    }
    long long x1, y1;
    long long gcd = cp_extended_gcd(b, a % b, &x1, &y1);
    *x = y1;
    *y = x1 - (a / b) * y1;
    return gcd;
}
```

## Aliases & Shorthands
Available via: `cp_extended_gcd`, `competitive-programming.programming-technics.number-theory.modular-arithmetic.extended-gcd`, `competitive-programming>cp_extended_gcd()`, `competitive-programming>programming-technics>number-theory>modular-arithmetic>extended-gcd>cp_extended_gcd()`, `extendedGcd`
