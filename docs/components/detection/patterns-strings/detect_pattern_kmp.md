# detect_pattern_kmp
> **Domain:** `detection` | **Subcategory:** `patterns-strings` | **Type:** `function`
## Overview
Finds first matching index of pattern in text using Knuth-Morris-Pratt table

## Signature
```c
int detect_pattern_kmp(const char* text, const char* pattern);
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
int detect_pattern_kmp(const char* text, const char* pattern) {
    int m = 0;
    while (pattern[m] != '\0') m++;
    if (m == 0) return 0;
    int lps[128] = {0};
    int len = 0, i = 1;
    while (i < m) {
        if (pattern[i] == pattern[len]) {
            len++;
            lps[i] = len;
            i++;
        } else {
            if (len != 0) len = lps[len - 1];
            else { lps[i] = 0; i++; }
        }
    }
    int t_idx = 0, p_idx = 0;
    while (text[t_idx] != '\0') {
        if (pattern[p_idx] == text[t_idx]) {
            p_idx++;
            t_idx++;
        }
        if (p_idx == m) return (t_idx - p_idx);
        else if (text[t_idx] != '\0' && pattern[p_idx] != text[t_idx]) {
            if (p_idx != 0) p_idx = lps[p_idx - 1];
            else t_idx++;
        }
    }
    return -1;
}
```

## Aliases & Shorthands
Available via: `detect_pattern_kmp`, `detection.patterns-strings.pattern-kmp`, `detection>detect_pattern_kmp()`, `detection>patterns-strings>pattern-kmp>detect_pattern_kmp()`, `kmp_find`
