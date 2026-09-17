# selection_sort
> **Domain:** `algorithms` | **Subcategory:** `sorting` | **Type:** `function`
## Overview
Sorts an integer array using selection sort

## Signature
```c
void selection_sort(int* arr, int n);
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
void selection_sort(int* arr, int n) {
    for (int i = 0; i < n - 1; i++) {
        int min_idx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[min_idx]) {
                min_idx = j;
            }
        }
        if (min_idx != i) {
            int tmp = arr[i];
            arr[i] = arr[min_idx];
            arr[min_idx] = tmp;
        }
    }
}
```

## Aliases & Shorthands
Available via: `selection_sort`, `algorithms.separate-components.sorting.elementary-sorts.selection-sort`, `algorithms>selection_sort()`, `algorithms>separate-components>sorting>elementary-sorts>selection-sort>selection_sort()`, `selectionSort`
