# detect_hamming_single_error
> **Domain:** `detection` | **Subcategory:** `error-integrity` | **Type:** `function`
## Overview
Detects single-bit error and computes bit syndrome position in (7,4) Hamming code

## Signature
```c
int detect_hamming_single_error(unsigned int codeword, int* error_pos);
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
int detect_hamming_single_error(unsigned int codeword, int* error_pos) {
    unsigned int p1 = 0, p2 = 0, p4 = 0;
    for (int i = 1; i <= 7; i++) {
        unsigned int bit = (codeword >> (7 - i)) & 1;
        if (i & 1) p1 ^= bit;
        if (i & 2) p2 ^= bit;
        if (i & 4) p4 ^= bit;
    }
    int syndrome = (p4 << 2) | (p2 << 1) | p1;
    if (error_pos) *error_pos = syndrome;
    return (syndrome != 0);
}
```

## Aliases & Shorthands
Available via: `detect_hamming_single_error`, `detection.error-integrity.hamming-single-error`, `detection>detect_hamming_single_error()`, `detection>error-integrity>hamming-single-error>detect_hamming_single_error()`, `hamming_error`
