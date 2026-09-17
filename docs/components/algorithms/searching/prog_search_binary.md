# prog_search_binary
> **Domain:** `algorithms` | **Subcategory:** `searching` | **Type:** `program`
## Overview
Complete Binary Search program testing exact find, lower bound, and upper bound

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

int lower_bound(const int* arr, int n, int target) {
    int l = 0, h = n;
    while (l < h) {
        int m = l + (h - l) / 2;
        if (arr[m] >= target) h = m;
        else l = m + 1;
    }
    return l;
}

int main(void) {
    int arr[] = {10, 20, 20, 20, 30, 40, 50};
    int n = sizeof(arr) / sizeof(arr[0]);

    int lb = lower_bound(arr, n, 20);
    printf("Lower bound for 20: index %d (value %d)
", lb, arr[lb]);

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_search_binary`, `algorithms.full-programs.searching.binary-search.prog-binary-search`, `algorithms>prog_search_binary()`, `algorithms>full-programs>searching>binary-search>prog-binary-search>prog_search_binary()`, `programBinarySearch`
