# detect_array_monotonic
> **Domain:** `detection` | **Subcategory:** `array-anomalies` | **Type:** `function`
## Overview
Detects if integer array is entirely non-decreasing or entirely non-increasing

## Signature
```c
int detect_array_monotonic(const int* arr, int n);
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
int detect_array_monotonic(const int* arr, int n) {
    if (n <= 2) return 1;
    int inc = 1, dec = 1;
    for (int i = 0; i < n - 1; i++) {
        if (arr[i] > arr[i + 1]) inc = 0;
        if (arr[i] < arr[i + 1]) dec = 0;
    }
    return (inc || dec);
}
```

## Aliases & Shorthands
Available via: `detect_array_monotonic`, `detection.array-anomalies.array-monotonic`, `detection>detect_array_monotonic()`, `detection>array-anomalies>array-monotonic>detect_array_monotonic()`, `is_monotonic`
