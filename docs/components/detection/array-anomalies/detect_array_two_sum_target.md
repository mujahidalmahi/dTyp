# detect_array_two_sum_target
> **Domain:** `detection` | **Subcategory:** `array-anomalies` | **Type:** `function`
## Overview
Detects if any two array elements sum to target storing their indices

## Signature
```c
int detect_array_two_sum_target(const int* arr, int n, int target, int* idx1, int* idx2);
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
int detect_array_two_sum_target(const int* arr, int n, int target, int* idx1, int* idx2) {
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            if (arr[i] + arr[j] == target) {
                if (idx1) *idx1 = i;
                if (idx2) *idx2 = j;
                return 1;
            }
        }
    }
    return 0;
}
```

## Aliases & Shorthands
Available via: `detect_array_two_sum_target`, `detection.array-anomalies.array-two-sum-target`, `detection>detect_array_two_sum_target()`, `detection>array-anomalies>array-two-sum-target>detect_array_two_sum_target()`, `has_two_sum`
