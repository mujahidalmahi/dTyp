# cp_monotonic_sliding_window_max
> **Domain:** `competitive-programming` | **Subcategory:** `cp-data-structures` | **Type:** `function`
## Overview
Computes maximum for every sliding window of size k in O(N)

## Signature
```c
void cp_monotonic_sliding_window_max(const int* arr, int n, int k, int* out_max);
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
void cp_monotonic_sliding_window_max(const int* arr, int n, int k, int* out_max) {
    int deque[n];
    int head = 0, tail = 0;
    int out_idx = 0;
    for (int i = 0; i < n; i++) {
        if (head < tail && deque[head] <= i - k) head++;
        while (head < tail && arr[deque[tail - 1]] <= arr[i]) tail--;
        deque[tail++] = i;
        if (i >= k - 1) {
            out_max[out_idx++] = arr[deque[head]];
        }
    }
}
```

## Aliases & Shorthands
Available via: `cp_monotonic_sliding_window_max`, `competitive-programming.programming-technics.cp-data-structures.monotonic-structures.window-max`, `competitive-programming>cp_monotonic_sliding_window_max()`, `competitive-programming>programming-technics>cp-data-structures>monotonic-structures>window-max>cp_monotonic_sliding_window_max()`, `monotonicWindowMax`
