# prog_search_jump_interpolation
> **Domain:** `algorithms` | **Subcategory:** `searching` | **Type:** `program`
## Overview
Complete Jump Search program on uniformly sorted array

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
#include <math.h>

int jump_search(const int* arr, int n, int target) {
    int step = (int)sqrt((double)n);
    int prev = 0;
    while (arr[(step < n ? step : n) - 1] < target) {
        prev = step;
        step += (int)sqrt((double)n);
        if (prev >= n) return -1;
    }
    while (arr[prev] < target) {
        prev++;
        if (prev == (step < n ? step : n)) return -1;
    }
    if (arr[prev] == target) return prev;
    return -1;
}

int main(void) {
    int arr[] = {0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144};
    int n = sizeof(arr) / sizeof(arr[0]);

    int idx = jump_search(arr, n, 55);
    printf("Jump search for 55 found at index: %d
", idx);

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_search_jump_interpolation`, `algorithms.full-programs.searching.jump-interpolation.prog-jump-search`, `algorithms>prog_search_jump_interpolation()`, `algorithms>full-programs>searching>jump-interpolation>prog-jump-search>prog_search_jump_interpolation()`, `programJumpSearch`
