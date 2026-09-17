# detect_pangram
> **Domain:** `detection` | **Subcategory:** `patterns-strings` | **Type:** `function`
## Overview
Detects if string contains all 26 English letters using bitmask accumulator

## Signature
```c
int detect_pangram(const char* s);
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
int detect_pangram(const char* s) {
    int mask = 0;
    for (int i = 0; s[i] != '\0'; i++) {
        char c = s[i];
        if (c >= 'A' && c <= 'Z') mask |= (1 << (c - 'A'));
        else if (c >= 'a' && c <= 'z') mask |= (1 << (c - 'a'));
    }
    return (mask == 0x3FFFFFF);
}
```

## Aliases & Shorthands
Available via: `detect_pangram`, `detection.patterns-strings.pangram`, `detection>detect_pangram()`, `detection>patterns-strings>pangram>detect_pangram()`, `is_pangram`
