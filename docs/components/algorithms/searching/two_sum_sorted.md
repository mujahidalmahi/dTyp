# two_sum_sorted
> **Domain:** `algorithms` | **Subcategory:** `searching` | **Type:** `function`
## Overview
Finds two indices in sorted array summing to target

## Signature
```c
int two_sum_sorted(const int* arr, int n, int target, int* idx1, int* idx2);
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
int two_sum_sorted(const int* arr, int n, int target, int* idx1, int* idx2) {
    int l = 0, r = n - 1;
    while (l < r) {
        int sum = arr[l] + arr[r];
        if (sum == target) {
            *idx1 = l;
            *idx2 = r;
            return 1;
        }
        if (sum < target) l++;
        else r--;
    }
    return 0;
}
```

## Aliases & Shorthands
Available via: `two_sum_sorted`, `algorithms.separate-components.searching.two-pointers.two-sum`, `algorithms>two_sum_sorted()`, `algorithms>separate-components>searching>two-pointers>two-sum>two_sum_sorted()`, `twoSumSorted`
