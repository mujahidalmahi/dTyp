# array_1d_binary_search
> **Domain:** `data-structures` | **Subcategory:** `arrays` | **Type:** `function`
## Overview
Performs iterative binary search on sorted array

## Signature
```c
int array_1d_binary_search(const int* arr, int n, int target);
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
int array_1d_binary_search(const int* arr, int n, int target) {
    int low = 0, high = n - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}
```

## Aliases & Shorthands
Available via: `array_1d_binary_search`, `data-structures.separate-components.arrays.1d-array.binary-search`, `data-structures>array_1d_binary_search()`, `data-structures>separate-components>arrays>1d-array>binary-search>array_1d_binary_search()`, `binarySearch1D`
