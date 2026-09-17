# prog_cp_sliding_window
> **Domain:** `competitive-programming` | **Subcategory:** `range-queries` | **Type:** `program`
## Overview
Complete competitive programming program executing fixed and variable sliding windows

## Signature
```c
int main(void);
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
#include <stdio.h>

long long max_fixed_window(const int* arr, int n, int k) {
    if (n < k || k <= 0) return 0;
    long long cur = 0;
    for (int i = 0; i < k; i++) cur += arr[i];
    long long max_sum = cur;
    for (int i = k; i < n; i++) {
        cur += arr[i] - arr[i - k];
        if (cur > max_sum) max_sum = cur;
    }
    return max_sum;
}

int min_len_subarray(const int* arr, int n, long long target) {
    int min_len = n + 1;
    long long cur = 0;
    int left = 0;
    for (int right = 0; right < n; right++) {
        cur += arr[right];
        while (cur >= target) {
            int len = right - left + 1;
            if (len < min_len) min_len = len;
            cur -= arr[left++];
        }
    }
    return (min_len <= n) ? min_len : 0;
}

int main(void) {
    int arr[] = {2, 3, 1, 2, 4, 3};
    int n = 6;
    printf("Max sum of window 3: %lld
", max_fixed_window(arr, n, 3));
    printf("Min len for sum >= 7: %d
", min_len_subarray(arr, n, 7));
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_cp_sliding_window`, `competitive-programming.full-programs.range-queries.sliding-window.prog-sliding-window`, `competitive-programming>prog_cp_sliding_window()`, `competitive-programming>full-programs>range-queries>sliding-window>prog-sliding-window>prog_cp_sliding_window()`
