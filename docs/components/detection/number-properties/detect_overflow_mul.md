# detect_overflow_mul
> **Domain:** `detection` | **Subcategory:** `number-properties` | **Type:** `function`
## Overview
Detects signed 32-bit multiplication overflow without invoking undefined behavior

## Signature
```c
int detect_overflow_mul(int a, int b, int* result);
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
int detect_overflow_mul(int a, int b, int* result) {
    if (a > 0 && b > 0 && a > 2147483647 / b) return 1;
    if (a > 0 && b < 0 && b < (-2147483647 - 1) / a) return 1;
    if (a < 0 && b > 0 && a < (-2147483647 - 1) / b) return 1;
    if (a < 0 && b < 0 && b < 2147483647 / a) return 1;
    if (result) *result = a * b;
    return 0;
}
```

## Aliases & Shorthands
Available via: `detect_overflow_mul`, `detection.number-properties.overflow-mul`, `detection>detect_overflow_mul()`, `detection>number-properties>overflow-mul>detect_overflow_mul()`, `check_mul_overflow`
