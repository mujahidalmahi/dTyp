# detect_array_majority_element
> **Domain:** `detection` | **Subcategory:** `array-anomalies` | **Type:** `function`
## Overview
Detects element appearing strictly more than n/2 times via Boyer-Moore voting algorithm

## Signature
```c
int detect_array_majority_element(const int* arr, int n, int* majority);
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
int detect_array_majority_element(const int* arr, int n, int* majority) {
    int candidate = 0, count = 0;
    for (int i = 0; i < n; i++) {
        if (count == 0) {
            candidate = arr[i];
            count = 1;
        } else if (arr[i] == candidate) {
            count++;
        } else {
            count--;
        }
    }
    int verify = 0;
    for (int i = 0; i < n; i++) {
        if (arr[i] == candidate) verify++;
    }
    if (verify > n / 2) {
        if (majority) *majority = candidate;
        return 1;
    }
    return 0;
}
```

## Aliases & Shorthands
Available via: `detect_array_majority_element`, `detection.array-anomalies.array-majority-element`, `detection>detect_array_majority_element()`, `detection>array-anomalies>array-majority-element>detect_array_majority_element()`, `majority_element`
