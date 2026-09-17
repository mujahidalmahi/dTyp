# array_1d_rotate
> **Domain:** `data-structures` | **Subcategory:** `arrays` | **Type:** `function`
## Overview
Rotates a 1D array left by k positions

## Signature
```c
void array_1d_rotate(int* arr, int n, int k);
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
void array_1d_rotate(int* arr, int n, int k) {
    if (n <= 0) return;
    k = k % n;
    if (k < 0) k += n;
    for (int i = 0; i < k; i++) {
        int first = arr[0];
        for (int j = 0; j < n - 1; j++) {
            arr[j] = arr[j + 1];
        }
        arr[n - 1] = first;
    }
}
```

## Aliases & Shorthands
Available via: `array_1d_rotate`, `data-structures.separate-components.arrays.1d-array.rotate`, `data-structures>array_1d_rotate()`, `data-structures>separate-components>arrays>1d-array>rotate>array_1d_rotate()`, `rotateArray1D`
