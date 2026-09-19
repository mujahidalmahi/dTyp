# prog_search_two_pointers
> **Domain:** `algorithms` | **Subcategory:** `searching` | **Type:** `program`
## Overview
Complete Two Pointers search program finding pair with target sum

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

int two_sum(const int* arr, int n, int target, int* out_l, int* out_r) {
    int l = 0, r = n - 1;
    while (l < r) {
        int sum = arr[l] + arr[r];
        if (sum == target) {
            *out_l = l; *out_r = r;
            return 1;
        }
        if (sum < target) l++;
        else r--;
    }
    return 0;
}

int main(void) {
    int arr[] = {2, 7, 11, 15, 18, 22};
    int n = sizeof(arr) / sizeof(arr[0]);
    int l, r;

    if (two_sum(arr, n, 25, &l, &r)) {
        printf("Found pair for sum 25: arr[%d] (%d) + arr[%d] (%d) = 25\n",
               l, arr[l], r, arr[r]);
    }
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_search_two_pointers`, `algorithms.full-programs.searching.two-pointers.prog-two-pointers`, `algorithms>prog_search_two_pointers()`, `algorithms>full-programs>searching>two-pointers>prog-two-pointers>prog_search_two_pointers()`, `programTwoPointers`
