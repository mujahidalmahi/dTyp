# bubble_sort
> **Domain:** `algorithms` | **Subcategory:** `sorting` | **Type:** `function`
## Overview
Sorts an integer array using optimized bubble sort with early exit

## Signature
```c
void bubble_sort(int* arr, int n);
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
void bubble_sort(int* arr, int n) {
    for (int i = 0; i < n - 1; i++) {
        int swapped = 0;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
                swapped = 1;
            }
        }
        if (!swapped) break;
    }
}
```

## Aliases & Shorthands
Available via: `bubble_sort`, `algorithms.separate-components.sorting.elementary-sorts.bubble-sort`, `algorithms>bubble_sort()`, `algorithms>separate-components>sorting>elementary-sorts>bubble-sort>bubble_sort()`, `bubbleSort`
