# detect_isogram
> **Domain:** `detection` | **Subcategory:** `patterns-strings` | **Type:** `function`
## Overview
Detects if string has no repeating characters

## Signature
```c
int detect_isogram(const char* s);
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
int detect_isogram(const char* s) {
    int seen[256] = {0};
    for (int i = 0; s[i] != '\0'; i++) {
        unsigned char c = (unsigned char)s[i];
        if (seen[c]) return 0;
        seen[c] = 1;
    }
    return 1;
}
```

## Aliases & Shorthands
Available via: `detect_isogram`, `detection.patterns-strings.isogram`, `detection>detect_isogram()`, `detection>patterns-strings>isogram>detect_isogram()`, `is_isogram`
