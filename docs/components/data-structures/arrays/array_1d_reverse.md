# array_1d_reverse
> **Domain:** `data-structures` | **Subcategory:** `arrays` | **Type:** `function`
## Overview
Reverses a 1D integer array in-place

## Signature
```c
void array_1d_reverse(int* arr, int n);
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
void array_1d_reverse(int* arr, int n) {
    int start = 0, end = n - 1;
    while (start < end) {
        int tmp = arr[start];
        arr[start] = arr[end];
        arr[end] = tmp;
        start++;
        end--;
    }
}
```

## Aliases & Shorthands
Available via: `array_1d_reverse`, `data-structures.separate-components.arrays.1d-array.reverse`, `data-structures>array_1d_reverse()`, `data-structures>separate-components>arrays>1d-array>reverse>array_1d_reverse()`, `reverseArray1D`
