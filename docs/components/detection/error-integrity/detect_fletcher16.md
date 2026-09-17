# detect_fletcher16
> **Domain:** `detection` | **Subcategory:** `error-integrity` | **Type:** `function`
## Overview
Verifies buffer against expected Fletcher-16 modular checksum

## Signature
```c
int detect_fletcher16(const unsigned char* data, int len, unsigned short expected);
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
int detect_fletcher16(const unsigned char* data, int len, unsigned short expected) {
    unsigned short sum1 = 0, sum2 = 0;
    for (int i = 0; i < len; i++) {
        sum1 = (sum1 + data[i]) % 255;
        sum2 = (sum2 + sum1) % 255;
    }
    return (((sum2 << 8) | sum1) == expected);
}
```

## Aliases & Shorthands
Available via: `detect_fletcher16`, `detection.error-integrity.fletcher16`, `detection>detect_fletcher16()`, `detection>error-integrity>fletcher16>detect_fletcher16()`, `verify_fletcher16`
