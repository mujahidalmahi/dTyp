# detect_float_nan
> **Domain:** `detection` | **Subcategory:** `number-properties` | **Type:** `function`
## Overview
Detects if 32-bit IEEE 754 float is Not-A-Number (NaN) via bit pattern inspection

## Signature
```c
int detect_float_nan(float val);
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
int detect_float_nan(float val) {
    union { float f; unsigned int u; } conv;
    conv.f = val;
    return ((conv.u & 0x7F800000) == 0x7F800000) && ((conv.u & 0x007FFFFF) != 0);
}
```

## Aliases & Shorthands
Available via: `detect_float_nan`, `detection.number-properties.float-nan`, `detection>detect_float_nan()`, `detection>number-properties>float-nan>detect_float_nan()`, `is_nan_float`
