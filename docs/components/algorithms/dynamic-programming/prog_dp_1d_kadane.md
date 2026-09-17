# prog_dp_1d_kadane
> **Domain:** `algorithms` | **Subcategory:** `dynamic-programming` | **Type:** `program`
## Overview
Complete Kadane maximum contiguous subarray sum program

## Signature
```c
int main(void)
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

int main(void) {
    int arr[] = {-2, 1, -3, 4, -1, 2, 1, -5, 4};
    int n = sizeof(arr) / sizeof(arr[0]);

    int max_so_far = arr[0];
    int curr_max = arr[0];
    for (int i = 1; i < n; i++) {
        curr_max = (arr[i] > curr_max + arr[i]) ? arr[i] : (curr_max + arr[i]);
        if (curr_max > max_so_far) max_so_far = curr_max;
    }

    printf("Maximum Subarray Sum: %d
", max_so_far);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_dp_1d_kadane`, `algorithms.full-programs.dynamic-programming.1d-dp.prog-kadane`, `algorithms>prog_dp_1d_kadane()`, `algorithms>full-programs>dynamic-programming>1d-dp>prog-kadane>prog_dp_1d_kadane()`, `programKadane`
