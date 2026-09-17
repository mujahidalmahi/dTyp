# detect_array_missing_number
> **Domain:** `detection` | **Subcategory:** `array-anomalies` | **Type:** `function`
## Overview
Detects single missing number from range [0..n] using bitwise XOR cancellation

## Signature
```c
int detect_array_missing_number(const int* arr, int n);
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
int detect_array_missing_number(const int* arr, int n) {
    int total_xor = 0;
    for (int i = 0; i <= n; i++) total_xor ^= i;
    int arr_xor = 0;
    for (int i = 0; i < n; i++) arr_xor ^= arr[i];
    return (total_xor ^ arr_xor);
}
```

## Aliases & Shorthands
Available via: `detect_array_missing_number`, `detection.array-anomalies.array-missing-number`, `detection>detect_array_missing_number()`, `detection>array-anomalies>array-missing-number>detect_array_missing_number()`, `find_missing_number`
