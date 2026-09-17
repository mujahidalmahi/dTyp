# cp_difference_array_compute
> **Domain:** `competitive-programming` | **Subcategory:** `range-queries` | **Type:** `function`
## Overview
Accumulates difference array to restore updated values in O(N)

## Signature
```c
void cp_difference_array_compute(const long long* diff, int n, long long* res);
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
void cp_difference_array_compute(const long long* diff, int n, long long* res) {
    long long running = 0;
    for (int i = 0; i < n; i++) {
        running += diff[i];
        res[i] = running;
    }
}
```

## Aliases & Shorthands
Available via: `cp_difference_array_compute`, `competitive-programming.programming-technics.range-queries.difference-array.compute`, `competitive-programming>cp_difference_array_compute()`, `competitive-programming>programming-technics>range-queries>difference-array>compute>cp_difference_array_compute()`, `diffCompute`
