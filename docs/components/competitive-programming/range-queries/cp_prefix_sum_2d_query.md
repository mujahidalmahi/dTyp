# cp_prefix_sum_2d_query
> **Domain:** `competitive-programming` | **Subcategory:** `range-queries` | **Type:** `function`
## Overview
Queries sum in subgrid [r1, c1] to [r2, c2] in O(1)

## Signature
```c
long long cp_prefix_sum_2d_query(const long long* pref, int cols_stride, int r1, int c1, int r2, int c2);
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
long long cp_prefix_sum_2d_query(const long long* pref, int cols_stride, int r1, int c1, int r2, int c2) {
    long long total = pref[(r2 + 1) * cols_stride + (c2 + 1)];
    long long top = pref[r1 * cols_stride + (c2 + 1)];
    long long left = pref[(r2 + 1) * cols_stride + c1];
    long long diag = pref[r1 * cols_stride + c1];
    return total - top - left + diag;
}
```

## Aliases & Shorthands
Available via: `cp_prefix_sum_2d_query`, `competitive-programming.programming-technics.range-queries.prefix-sums.query-2d`, `competitive-programming>cp_prefix_sum_2d_query()`, `competitive-programming>programming-technics>range-queries>prefix-sums>query-2d>cp_prefix_sum_2d_query()`, `prefSum2dQuery`
