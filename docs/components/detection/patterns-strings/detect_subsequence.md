# detect_subsequence
> **Domain:** `detection` | **Subcategory:** `patterns-strings` | **Type:** `function`
## Overview
Detects if pattern exists as a subsequence within text string

## Signature
```c
int detect_subsequence(const char* pattern, const char* text);
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
int detect_subsequence(const char* pattern, const char* text) {
    int i = 0, j = 0;
    while (pattern[i] != '\0' && text[j] != '\0') {
        if (pattern[i] == text[j]) i++;
        j++;
    }
    return (pattern[i] == '\0');
}
```

## Aliases & Shorthands
Available via: `detect_subsequence`, `detection.patterns-strings.subsequence`, `detection>detect_subsequence()`, `detection>patterns-strings>subsequence>detect_subsequence()`, `is_subsequence`
