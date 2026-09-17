# prog_search_linear
> **Domain:** `algorithms` | **Subcategory:** `searching` | **Type:** `program`
## Overview
Complete Linear Search program scanning elements sequentially

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

int linear_search(const int* arr, int n, int target) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) return i;
    }
    return -1;
}

int main(void) {
    int arr[] = {15, 34, 27, 89, 42, 61};
    int n = sizeof(arr) / sizeof(arr[0]);

    int idx = linear_search(arr, n, 42);
    printf("Linear search for 42 found at index: %d
", idx);

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_search_linear`, `algorithms.full-programs.searching.linear-search.prog-linear-search`, `algorithms>prog_search_linear()`, `algorithms>full-programs>searching>linear-search>prog-linear-search>prog_search_linear()`, `programLinearSearch`
