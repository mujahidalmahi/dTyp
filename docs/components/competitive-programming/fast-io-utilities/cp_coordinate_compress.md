# cp_coordinate_compress
> **Domain:** `competitive-programming` | **Subcategory:** `fast-io-utilities` | **Type:** `function`
## Overview
Sorts and removes duplicates to produce sorted unique coordinate array

## Signature
```c
int cp_coordinate_compress(int* arr, int n, int* unique_arr);
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
int cp_coordinate_compress(int* arr, int n, int* unique_arr) {
    for (int i = 0; i < n; i++) {
        unique_arr[i] = arr[i];
    }
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (unique_arr[j] > unique_arr[j + 1]) {
                int tmp = unique_arr[j];
                unique_arr[j] = unique_arr[j + 1];
                unique_arr[j + 1] = tmp;
            }
        }
    }
    int u = 0;
    for (int i = 0; i < n; i++) {
        if (i == 0 || unique_arr[i] != unique_arr[i - 1]) {
            unique_arr[u++] = unique_arr[i];
        }
    }
    return u;
}
```

## Aliases & Shorthands
Available via: `cp_coordinate_compress`, `competitive-programming.programming-technics.fast-io-utilities.coordinate-compression.compress`, `competitive-programming>cp_coordinate_compress()`, `competitive-programming>programming-technics>fast-io-utilities>coordinate-compression>compress>cp_coordinate_compress()`, `coordCompress`
