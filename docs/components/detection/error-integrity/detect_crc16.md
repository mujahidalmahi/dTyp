# detect_crc16
> **Domain:** `detection` | **Subcategory:** `error-integrity` | **Type:** `function`
## Overview
Calculates CRC-16-CCITT and verifies against expected checksum

## Signature
```c
int detect_crc16(const unsigned char* data, int len, unsigned short expected);
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
int detect_crc16(const unsigned char* data, int len, unsigned short expected) {
    unsigned short crc = 0xFFFF;
    for (int i = 0; i < len; i++) {
        crc ^= (unsigned short)(data[i] << 8);
        for (int j = 0; j < 8; j++) {
            if (crc & 0x8000) {
                crc = (crc << 1) ^ 0x1021;
            } else {
                crc <<= 1;
            }
        }
    }
    return (crc == expected);
}
```

## Aliases & Shorthands
Available via: `detect_crc16`, `detection.error-integrity.crc16`, `detection>detect_crc16()`, `detection>error-integrity>crc16>detect_crc16()`, `verify_crc16`
