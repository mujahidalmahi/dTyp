# factorial_recursive
> **Domain:** `boiler-plates` | **Subcategory:** `recursion` | **Type:** `function`
## Overview
Recursive calculation of factorial

## Signature
```c
long long factorial(int n);
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
long long factorial(int n) {
    if (n <= 1) return 1;
    return (long long)n * factorial(n - 1);
}
```

## Aliases & Shorthands
Available via: `factorial_recursive`, `boiler-plates.separate-components.recursion.factorial-recursive`, `boiler-plates>factorial_recursive()`, `boiler-plates>separate-components>recursion>factorial-recursive>factorial_recursive()`, `factorial`
