# detect_power_of_two
> **Domain:** `detection` | **Subcategory:** `number-properties` | **Type:** `function`
## Overview
Detects if unsigned integer is an exact power of two via bitwise trick

## Signature
```c
int detect_power_of_two(unsigned int n);
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
int detect_power_of_two(unsigned int n) {
    return (n > 0) && ((n & (n - 1)) == 0);
}
```

## Aliases & Shorthands
Available via: `detect_power_of_two`, `detection.number-properties.power-of-two`, `detection>detect_power_of_two()`, `detection>number-properties>power-of-two>detect_power_of_two()`, `is_power_of_two`
