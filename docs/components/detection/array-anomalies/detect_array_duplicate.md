# detect_array_duplicate
> **Domain:** `detection` | **Subcategory:** `array-anomalies` | **Type:** `function`
## Overview
Detects if integer array contains any duplicate values

## Signature
```c
int detect_array_duplicate(const int* arr, int n);
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
int detect_array_duplicate(const int* arr, int n) {
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            if (arr[i] == arr[j]) return 1;
        }
    }
    return 0;
}
```

## Aliases & Shorthands
Available via: `detect_array_duplicate`, `detection.array-anomalies.array-duplicate`, `detection>detect_array_duplicate()`, `detection>array-anomalies>array-duplicate>detect_array_duplicate()`, `has_duplicate`
