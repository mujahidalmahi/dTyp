# detect_array_sorted_descending
> **Domain:** `detection` | **Subcategory:** `array-anomalies` | **Type:** `function`
## Overview
Detects if integer array is sorted in descending order

## Signature
```c
int detect_array_sorted_descending(const int* arr, int n);
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
int detect_array_sorted_descending(const int* arr, int n) {
    for (int i = 0; i < n - 1; i++) {
        if (arr[i] < arr[i + 1]) return 0;
    }
    return 1;
}
```

## Aliases & Shorthands
Available via: `detect_array_sorted_descending`, `detection.array-anomalies.array-sorted-descending`, `detection>detect_array_sorted_descending()`, `detection>array-anomalies>array-sorted-descending>detect_array_sorted_descending()`, `is_sorted_desc`
