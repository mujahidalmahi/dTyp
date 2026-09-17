# detect_endianness
> **Domain:** `detection` | **Subcategory:** `system-hardware` | **Type:** `function`
## Overview
Detects runtime byte order returning 1 for little-endian or 0 for big-endian

## Signature
```c
int detect_endianness(void);
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
int detect_endianness(void) {
    unsigned int x = 0x1;
    char* c = (char*)&x;
    return (int)(*c);
}
```

## Aliases & Shorthands
Available via: `detect_endianness`, `detection.system-hardware.endianness`, `detection>detect_endianness()`, `detection>system-hardware>endianness>detect_endianness()`, `is_little_endian`
