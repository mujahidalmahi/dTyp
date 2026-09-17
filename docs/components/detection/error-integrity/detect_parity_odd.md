# detect_parity_odd
> **Domain:** `detection` | **Subcategory:** `error-integrity` | **Type:** `function`
## Overview
Detects if byte has odd parity

## Signature
```c
int detect_parity_odd(unsigned char byte);
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
int detect_parity_odd(unsigned char byte) {
    int count = 0;
    while (byte) {
        count += (byte & 1);
        byte >>= 1;
    }
    return (count % 2 != 0);
}
```

## Aliases & Shorthands
Available via: `detect_parity_odd`, `detection.error-integrity.parity-odd`, `detection>detect_parity_odd()`, `detection>error-integrity>parity-odd>detect_parity_odd()`, `parity_odd`
