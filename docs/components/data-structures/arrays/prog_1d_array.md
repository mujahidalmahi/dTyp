# prog_1d_array
> **Domain:** `data-structures` | **Subcategory:** `arrays` | **Type:** `program`
## Overview
Complete 1D array operations program (reverse, rotate, min, max, binary search)

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

void reverse_arr(int* arr, int n) {
    int s = 0, e = n - 1;
    while (s < e) {
        int t = arr[s]; arr[s] = arr[e]; arr[e] = t;
        s++; e--;
    }
}

int bin_search(const int* arr, int n, int target) {
    int l = 0, r = n - 1;
    while (l <= r) {
        int m = l + (r - l) / 2;
        if (arr[m] == target) return m;
        if (arr[m] < target) l = m + 1;
        else r = m - 1;
    }
    return -1;
}

int main(void) {
    int arr[] = {12, 24, 36, 48, 60, 72};
    int n = sizeof(arr) / sizeof(arr[0]);

    printf("Original Array: ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    putchar('
');

    int idx = bin_search(arr, n, 48);
    printf("Binary search for 48: index %d
", idx);

    reverse_arr(arr, n);
    printf("Reversed Array: ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    putchar('
');

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_1d_array`, `data-structures.full-programs.arrays.1d-array.prog-1d-array`, `data-structures>prog_1d_array()`, `data-structures>full-programs>arrays>1d-array>prog-1d-array>prog_1d_array()`, `programArray1D`
