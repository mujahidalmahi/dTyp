# cp_prefix_sum_1d_build
> **Domain:** `competitive-programming` | **Subcategory:** `range-queries` | **Type:** `function`
## Overview
Builds a 1-indexed 1D prefix sum array

## Signature
```c
void cp_prefix_sum_1d_build(const int* arr, int n, long long* pref);
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
void cp_prefix_sum_1d_build(const int* arr, int n, long long* pref) {
    pref[0] = 0;
    for (int i = 0; i < n; i++) {
        pref[i + 1] = pref[i] + arr[i];
    }
}
```

## Aliases & Shorthands
Available via: `cp_prefix_sum_1d_build`, `competitive-programming.programming-technics.range-queries.prefix-sums.build-1d`, `competitive-programming>cp_prefix_sum_1d_build()`, `competitive-programming>programming-technics>range-queries>prefix-sums>build-1d>cp_prefix_sum_1d_build()`, `prefSum1dBuild`
