# detect_array_sorted_ascending
> **Domain:** `detection` | **Subcategory:** `array-anomalies` | **Type:** `function`
## Overview
Detects if integer array is sorted in ascending order

## Signature
```c
int detect_array_sorted_ascending(const int* arr, int n);
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
int detect_array_sorted_ascending(const int* arr, int n) {
    for (int i = 0; i < n - 1; i++) {
        if (arr[i] > arr[i + 1]) return 0;
    }
    return 1;
}
```

## Aliases & Shorthands
Available via: `detect_array_sorted_ascending`, `detection.array-anomalies.array-sorted-ascending`, `detection>detect_array_sorted_ascending()`, `detection>array-anomalies>array-sorted-ascending>detect_array_sorted_ascending()`, `is_sorted_asc`
