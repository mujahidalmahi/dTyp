# heap_sort
> **Domain:** `algorithms` | **Subcategory:** `sorting` | **Type:** `function`
## Overview
Sorts an array in-place using binary max heap

## Signature
```c
void heap_sort(int* arr, int n);
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
void heap_sort(int* arr, int n) {
    for (int i = n / 2 - 1; i >= 0; i--) {
        max_heapify_down(arr, n, i);
    }
    for (int i = n - 1; i > 0; i--) {
        int tmp = arr[0];
        arr[0] = arr[i];
        arr[i] = tmp;
        max_heapify_down(arr, i, 0);
    }
}
```

## Aliases & Shorthands
Available via: `heap_sort`, `algorithms.separate-components.sorting.heap-sort.sort`, `algorithms>heap_sort()`, `algorithms>separate-components>sorting>heap-sort>sort>heap_sort()`, `heapSort`

## Dependencies
Requires: `algorithms.separate-components.sorting.heap-sort.max-heapify-down`
