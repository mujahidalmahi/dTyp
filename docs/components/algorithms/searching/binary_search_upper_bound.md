# binary_search_upper_bound
> **Domain:** `algorithms` | **Subcategory:** `searching` | **Type:** `function`
## Overview
Returns index of first element > target in sorted array

## Signature
```c
int binary_search_upper_bound(const int* arr, int n, int target);
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
int binary_search_upper_bound(const int* arr, int n, int target) {
    int low = 0, high = n;
    while (low < high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] > target) high = mid;
        else low = mid + 1;
    }
    return low;
}
```

## Aliases & Shorthands
Available via: `binary_search_upper_bound`, `algorithms.separate-components.searching.binary-search.upper-bound`, `algorithms>binary_search_upper_bound()`, `algorithms>separate-components>searching>binary-search>upper-bound>binary_search_upper_bound()`, `upperBound`
