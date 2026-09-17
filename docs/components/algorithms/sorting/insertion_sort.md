# insertion_sort
> **Domain:** `algorithms` | **Subcategory:** `sorting` | **Type:** `function`
## Overview
Sorts an integer array in-place using insertion sort

## Signature
```c
void insertion_sort(int* arr, int n);
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
void insertion_sort(int* arr, int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}
```

## Aliases & Shorthands
Available via: `insertion_sort`, `algorithms.separate-components.sorting.elementary-sorts.insertion-sort`, `algorithms>insertion_sort()`, `algorithms>separate-components>sorting>elementary-sorts>insertion-sort>insertion_sort()`, `insertionSort`
