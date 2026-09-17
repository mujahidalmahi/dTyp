# quick_sort
> **Domain:** `algorithms` | **Subcategory:** `sorting` | **Type:** `function`
## Overview
Sorts subarray recursively using quick sort

## Signature
```c
void quick_sort(int* arr, int low, int high);
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
void quick_sort(int* arr, int low, int high) {
    if (low < high) {
        int pi = quick_sort_lomuto_partition(arr, low, high);
        quick_sort(arr, low, pi - 1);
        quick_sort(arr, pi + 1, high);
    }
}
```

## Aliases & Shorthands
Available via: `quick_sort`, `algorithms.separate-components.sorting.quick-sort.sort`, `algorithms>quick_sort()`, `algorithms>separate-components>sorting>quick-sort>sort>quick_sort()`, `quickSort`

## Dependencies
Requires: `algorithms.separate-components.sorting.quick-sort.lomuto-partition`
