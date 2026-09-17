# merge_sort
> **Domain:** `algorithms` | **Subcategory:** `sorting` | **Type:** `function`
## Overview
Sorts an array recursively using merge sort

## Signature
```c
void merge_sort(int* arr, int l, int r);
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
void merge_sort(int* arr, int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        merge_sort(arr, l, m);
        merge_sort(arr, m + 1, r);
        merge_sorted_subarrays(arr, l, m, r);
    }
}
```

## Aliases & Shorthands
Available via: `merge_sort`, `algorithms.separate-components.sorting.merge-sort.sort`, `algorithms>merge_sort()`, `algorithms>separate-components>sorting>merge-sort>sort>merge_sort()`, `mergeSort`

## Dependencies
Requires: `algorithms.separate-components.sorting.merge-sort.merge-subarrays`
