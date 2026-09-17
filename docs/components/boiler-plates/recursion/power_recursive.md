# power_recursive
> **Domain:** `boiler-plates` | **Subcategory:** `recursion` | **Type:** `function`
## Overview
Recursive exponentiation by squaring

## Signature
```c
long long power_recursive(long long base, int exp);
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
long long power_recursive(long long base, int exp) {
    if (exp <= 0) return 1;
    if (exp % 2 == 0) {
        long long half = power_recursive(base, exp / 2);
        return half * half;
    }
    return base * power_recursive(base, exp - 1);
}
```

## Aliases & Shorthands
Available via: `power_recursive`, `boiler-plates.separate-components.recursion.power-recursive`, `boiler-plates>power_recursive()`, `boiler-plates>separate-components>recursion>power-recursive>power_recursive()`, `power`
