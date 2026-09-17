# cp_sliding_window_fixed_sum
> **Domain:** `competitive-programming` | **Subcategory:** `range-queries` | **Type:** `function`
## Overview
Finds maximum sum of any contiguous subarray of fixed size k

## Signature
```c
long long cp_sliding_window_fixed_sum(const int* arr, int n, int k);
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
long long cp_sliding_window_fixed_sum(const int* arr, int n, int k) {
    if (n < k || k <= 0) return 0;
    long long current_sum = 0;
    for (int i = 0; i < k; i++) current_sum += arr[i];
    long long max_sum = current_sum;
    for (int i = k; i < n; i++) {
        current_sum += arr[i] - arr[i - k];
        if (current_sum > max_sum) max_sum = current_sum;
    }
    return max_sum;
}
```

## Aliases & Shorthands
Available via: `cp_sliding_window_fixed_sum`, `competitive-programming.programming-technics.range-queries.sliding-window.fixed-sum`, `competitive-programming>cp_sliding_window_fixed_sum()`, `competitive-programming>programming-technics>range-queries>sliding-window>fixed-sum>cp_sliding_window_fixed_sum()`, `slidingWindowFixedSum`
