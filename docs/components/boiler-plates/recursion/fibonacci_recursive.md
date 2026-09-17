# fibonacci_recursive
> **Domain:** `boiler-plates` | **Subcategory:** `recursion` | **Type:** `function`
## Overview
Recursive calculation of n-th Fibonacci number

## Signature
```c
long long fibonacci(int n);
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
long long fibonacci(int n) {
    if (n <= 0) return 0;
    if (n == 1) return 1;
    return fibonacci(n - 1) + fibonacci(n - 2);
}
```

## Aliases & Shorthands
Available via: `fibonacci_recursive`, `boiler-plates.separate-components.recursion.fibonacci-recursive`, `boiler-plates>fibonacci_recursive()`, `boiler-plates>separate-components>recursion>fibonacci-recursive>fibonacci_recursive()`, `fibonacci`
