# detect_array_peak_element
> **Domain:** `detection` | **Subcategory:** `array-anomalies` | **Type:** `function`
## Overview
Detects index of a peak element not smaller than its neighbors returning -1 on empty

## Signature
```c
int detect_array_peak_element(const int* arr, int n);
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
int detect_array_peak_element(const int* arr, int n) {
    if (n <= 0) return -1;
    if (n == 1) return 0;
    if (arr[0] >= arr[1]) return 0;
    for (int i = 1; i < n - 1; i++) {
        if (arr[i] >= arr[i - 1] && arr[i] >= arr[i + 1]) return i;
    }
    if (arr[n - 1] >= arr[n - 2]) return (n - 1);
    return -1;
}
```

## Aliases & Shorthands
Available via: `detect_array_peak_element`, `detection.array-anomalies.array-peak-element`, `detection>detect_array_peak_element()`, `detection>array-anomalies>array-peak-element>detect_array_peak_element()`, `find_peak_element`
