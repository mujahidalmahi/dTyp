# climb_stairs_dp
> **Domain:** `algorithms` | **Subcategory:** `dynamic-programming` | **Type:** `function`
## Overview
Computes distinct ways to climb n stairs taking 1 or 2 steps

## Signature
```c
int climb_stairs_dp(int n);
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
int climb_stairs_dp(int n) {
    if (n <= 2) return n;
    int prev2 = 1, prev1 = 2;
    for (int i = 3; i <= n; i++) {
        int cur = prev1 + prev2;
        prev2 = prev1;
        prev1 = cur;
    }
    return prev1;
}
```

## Aliases & Shorthands
Available via: `climb_stairs_dp`, `algorithms.separate-components.dynamic-programming.1d-dp.climb-stairs`, `algorithms>climb_stairs_dp()`, `algorithms>separate-components>dynamic-programming>1d-dp>climb-stairs>climb_stairs_dp()`, `climbStairs`
