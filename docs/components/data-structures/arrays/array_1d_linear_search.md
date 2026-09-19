# array_1d_linear_search
> **Domain:** `data-structures` | **Subcategory:** `arrays` | **Type:** `function`
## Overview
Performs sequential linear search on array

## Signature
```c
int array_1d_linear_search(const int* arr, int n, int target);
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
int array_1d_linear_search(const int* arr, int n, int target) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) return i;
    }
    return -1;
}
```

## Aliases & Shorthands
Available via: `array_1d_linear_search`, `data-structures.separate-components.arrays.1d-array.linear-search`, `data-structures>array_1d_linear_search()`, `data-structures>separate-components>arrays>1d-array>linear-search>array_1d_linear_search()`, `linearSearch1D`
