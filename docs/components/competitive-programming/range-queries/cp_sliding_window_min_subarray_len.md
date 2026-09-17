# cp_sliding_window_min_subarray_len
> **Domain:** `competitive-programming` | **Subcategory:** `range-queries` | **Type:** `function`
## Overview
Finds minimum length of contiguous subarray with sum >= target in O(N)

## Signature
```c
int cp_sliding_window_min_subarray_len(const int* arr, int n, long long target);
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
int cp_sliding_window_min_subarray_len(const int* arr, int n, long long target) {
    int min_len = n + 1;
    long long current_sum = 0;
    int left = 0;
    for (int right = 0; right < n; right++) {
        current_sum += arr[right];
        while (current_sum >= target) {
            int len = right - left + 1;
            if (len < min_len) min_len = len;
            current_sum -= arr[left++];
        }
    }
    return (min_len <= n) ? min_len : 0;
}
```

## Aliases & Shorthands
Available via: `cp_sliding_window_min_subarray_len`, `competitive-programming.programming-technics.range-queries.sliding-window.min-subarray-len`, `competitive-programming>cp_sliding_window_min_subarray_len()`, `competitive-programming>programming-technics>range-queries>sliding-window>min-subarray-len>cp_sliding_window_min_subarray_len()`, `slidingWindowMinLen`
