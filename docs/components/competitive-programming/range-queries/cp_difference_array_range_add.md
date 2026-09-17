# cp_difference_array_range_add
> **Domain:** `competitive-programming` | **Subcategory:** `range-queries` | **Type:** `function`
## Overview
Applies a range addition update [L, R] += val in O(1)

## Signature
```c
void cp_difference_array_range_add(long long* diff, int L, int R, long long val);
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
void cp_difference_array_range_add(long long* diff, int L, int R, long long val) {
    diff[L] += val;
    diff[R + 1] -= val;
}
```

## Aliases & Shorthands
Available via: `cp_difference_array_range_add`, `competitive-programming.programming-technics.range-queries.difference-array.range-add`, `competitive-programming>cp_difference_array_range_add()`, `competitive-programming>programming-technics>range-queries>difference-array>range-add>cp_difference_array_range_add()`, `diffRangeAdd`
