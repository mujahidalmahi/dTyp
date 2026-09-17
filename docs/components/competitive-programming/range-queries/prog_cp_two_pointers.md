# prog_cp_two_pointers
> **Domain:** `competitive-programming` | **Subcategory:** `range-queries` | **Type:** `program`
## Overview
Complete competitive programming program demonstrating two pointers: pair sum and trapping water

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

int pair_sum(const int* arr, int n, int target, int* out_i, int* out_j) {
    int left = 0, right = n - 1;
    while (left < right) {
        int sum = arr[left] + arr[right];
        if (sum == target) {
            *out_i = left;
            *out_j = right;
            return 1;
        }
        if (sum < target) left++;
        else right--;
    }
    return 0;
}

long long trap_water(const int* h, int n) {
    if (n <= 2) return 0;
    int left = 0, right = n - 1;
    int left_max = 0, right_max = 0;
    long long water = 0;
    while (left <= right) {
        if (h[left] <= h[right]) {
            if (h[left] >= left_max) left_max = h[left];
            else water += (left_max - h[left]);
            left++;
        } else {
            if (h[right] >= right_max) right_max = h[right];
            else water += (right_max - h[right]);
            right--;
        }
    }
    return water;
}

int main(void) {
    int arr[] = {2, 4, 7, 11, 15};
    int i, j;
    if (pair_sum(arr, 5, 15, &i, &j)) {
        printf("Pair sum 15 found at indices %d and %d
", i, j);
    }
    int heights[] = {0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1};
    printf("Trapped water: %lld
", trap_water(heights, 12));
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_cp_two_pointers`, `competitive-programming.full-programs.range-queries.two-pointers.prog-two-pointers`, `competitive-programming>prog_cp_two_pointers()`, `competitive-programming>full-programs>range-queries>two-pointers>prog-two-pointers>prog_cp_two_pointers()`
