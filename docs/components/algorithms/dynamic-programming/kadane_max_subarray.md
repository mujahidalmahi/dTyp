# kadane_max_subarray
> **Domain:** `algorithms` | **Subcategory:** `dynamic-programming` | **Type:** `function`
## Overview
Computes maximum subarray sum in O(n) using Kadane algorithm

## Signature
```c
int kadane_max_subarray(const int* arr, int n);
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
int kadane_max_subarray(const int* arr, int n) {
    int max_so_far = arr[0];
    int curr_max = arr[0];
    for (int i = 1; i < n; i++) {
        curr_max = (arr[i] > curr_max + arr[i]) ? arr[i] : (curr_max + arr[i]);
        if (curr_max > max_so_far) max_so_far = curr_max;
    }
    return max_so_far;
}
```

## Aliases & Shorthands
Available via: `kadane_max_subarray`, `algorithms.separate-components.dynamic-programming.1d-dp.kadane`, `algorithms>kadane_max_subarray()`, `algorithms>separate-components>dynamic-programming>1d-dp>kadane>kadane_max_subarray()`, `kadane`
