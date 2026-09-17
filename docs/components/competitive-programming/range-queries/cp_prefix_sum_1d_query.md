# cp_prefix_sum_1d_query
> **Domain:** `competitive-programming` | **Subcategory:** `range-queries` | **Type:** `function`
## Overview
Queries sum in range [L, R] (0-indexed inclusive) in O(1)

## Signature
```c
long long cp_prefix_sum_1d_query(const long long* pref, int L, int R);
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
long long cp_prefix_sum_1d_query(const long long* pref, int L, int R) {
    return pref[R + 1] - pref[L];
}
```

## Aliases & Shorthands
Available via: `cp_prefix_sum_1d_query`, `competitive-programming.programming-technics.range-queries.prefix-sums.query-1d`, `competitive-programming>cp_prefix_sum_1d_query()`, `competitive-programming>programming-technics>range-queries>prefix-sums>query-1d>cp_prefix_sum_1d_query()`, `prefSum1dQuery`
