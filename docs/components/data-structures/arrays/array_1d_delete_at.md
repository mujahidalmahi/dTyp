# array_1d_delete_at
> **Domain:** `data-structures` | **Subcategory:** `arrays` | **Type:** `function`
## Overview
Deletes element at specified index shifting succeeding elements left

## Signature
```c
int array_1d_delete_at(int* arr, int* n, int idx, int* deleted_val);
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
int array_1d_delete_at(int* arr, int* n, int idx, int* deleted_val) {
    if (*n <= 0 || idx < 0 || idx >= *n) return 0;
    *deleted_val = arr[idx];
    for (int i = idx; i < *n - 1; i++) arr[i] = arr[i + 1];
    (*n)--;
    return 1;
}
```

## Aliases & Shorthands
Available via: `array_1d_delete_at`, `data-structures.separate-components.arrays.1d-array.delete-at`, `data-structures>array_1d_delete_at()`, `data-structures>separate-components>arrays>1d-array>delete-at>array_1d_delete_at()`, `delete1DArray`
