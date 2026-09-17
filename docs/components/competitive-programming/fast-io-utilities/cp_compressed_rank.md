# cp_compressed_rank
> **Domain:** `competitive-programming` | **Subcategory:** `fast-io-utilities` | **Type:** `function`
## Overview
Finds the 0-indexed rank of a value in a sorted unique coordinate array

## Signature
```c
int cp_compressed_rank(const int* unique_arr, int size, int val);
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
int cp_compressed_rank(const int* unique_arr, int size, int val) {
    int low = 0, high = size - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (unique_arr[mid] == val) return mid;
        if (unique_arr[mid] < val) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}
```

## Aliases & Shorthands
Available via: `cp_compressed_rank`, `competitive-programming.programming-technics.fast-io-utilities.coordinate-compression.get-rank`, `competitive-programming>cp_compressed_rank()`, `competitive-programming>programming-technics>fast-io-utilities>coordinate-compression>get-rank>cp_compressed_rank()`, `coordRank`
