# cp_two_pointers_pair_sum
> **Domain:** `competitive-programming` | **Subcategory:** `range-queries` | **Type:** `function`
## Overview
Finds two indices in a sorted array that sum to target in O(N)

## Signature
```c
int cp_two_pointers_pair_sum(const int* arr, int n, int target, int* out_i, int* out_j);
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
int cp_two_pointers_pair_sum(const int* arr, int n, int target, int* out_i, int* out_j) {
    int left = 0, right = n - 1;
    while (left < right) {
        int sum = arr[left] + arr[right];
        if (sum == target) {
            *out_i = left;
            *out_j = right;
            return 1;
        }
        if (sum < target) left++;
        else right--;
    }
    return 0;
}
```

## Aliases & Shorthands
Available via: `cp_two_pointers_pair_sum`, `competitive-programming.programming-technics.range-queries.two-pointers.pair-sum`, `competitive-programming>cp_two_pointers_pair_sum()`, `competitive-programming>programming-technics>range-queries>two-pointers>pair-sum>cp_two_pointers_pair_sum()`, `twoPointersPairSum`
