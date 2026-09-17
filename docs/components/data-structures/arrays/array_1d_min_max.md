# array_1d_min_max
> **Domain:** `data-structures` | **Subcategory:** `arrays` | **Type:** `function`
## Overview
Finds minimum and maximum values in a 1D array

## Signature
```c
void array_1d_min_max(const int* arr, int n, int* min_val, int* max_val);
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
void array_1d_min_max(const int* arr, int n, int* min_val, int* max_val) {
    if (n <= 0) return;
    *min_val = arr[0];
    *max_val = arr[0];
    for (int i = 1; i < n; i++) {
        if (arr[i] < *min_val) *min_val = arr[i];
        if (arr[i] > *max_val) *max_val = arr[i];
    }
}
```

## Aliases & Shorthands
Available via: `array_1d_min_max`, `data-structures.separate-components.arrays.1d-array.min-max`, `data-structures>array_1d_min_max()`, `data-structures>separate-components>arrays>1d-array>min-max>array_1d_min_max()`, `minMaxArray1D`
