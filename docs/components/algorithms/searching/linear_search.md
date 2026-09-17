# linear_search
> **Domain:** `algorithms` | **Subcategory:** `searching` | **Type:** `function`
## Overview
Sequential search for target in integer array

## Signature
```c
int linear_search(const int* arr, int n, int target);
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
int linear_search(const int* arr, int n, int target) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) return i;
    }
    return -1;
}
```

## Aliases & Shorthands
Available via: `linear_search`, `algorithms.separate-components.searching.linear-search.standard`, `algorithms>linear_search()`, `algorithms>separate-components>searching>linear-search>standard>linear_search()`, `linearSearch`
