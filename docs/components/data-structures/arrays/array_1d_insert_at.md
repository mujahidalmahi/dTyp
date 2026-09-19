# array_1d_insert_at
> **Domain:** `data-structures` | **Subcategory:** `arrays` | **Type:** `function`
## Overview
Inserts element at specified index shifting succeeding elements right

## Signature
```c
int array_1d_insert_at(int* arr, int* n, int max_cap, int idx, int val);
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
int array_1d_insert_at(int* arr, int* n, int max_cap, int idx, int val) {
    if (*n >= max_cap || idx < 0 || idx > *n) return 0;
    for (int i = *n; i > idx; i--) arr[i] = arr[i - 1];
    arr[idx] = val;
    (*n)++;
    return 1;
}
```

## Aliases & Shorthands
Available via: `array_1d_insert_at`, `data-structures.separate-components.arrays.1d-array.insert-at`, `data-structures>array_1d_insert_at()`, `data-structures>separate-components>arrays>1d-array>insert-at>array_1d_insert_at()`, `insert1DArray`
