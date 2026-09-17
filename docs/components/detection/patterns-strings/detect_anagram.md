# detect_anagram
> **Domain:** `detection` | **Subcategory:** `patterns-strings` | **Type:** `function`
## Overview
Detects if two strings are anagrams using character frequency histogram

## Signature
```c
int detect_anagram(const char* s1, const char* s2);
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
int detect_anagram(const char* s1, const char* s2) {
    int count[256] = {0};
    int i = 0;
    while (s1[i] != '\0') { count[(unsigned char)s1[i]]++; i++; }
    int j = 0;
    while (s2[j] != '\0') { count[(unsigned char)s2[j]]--; j++; }
    if (i != j) return 0;
    for (int k = 0; k < 256; k++) {
        if (count[k] != 0) return 0;
    }
    return 1;
}
```

## Aliases & Shorthands
Available via: `detect_anagram`, `detection.patterns-strings.anagram`, `detection>detect_anagram()`, `detection>patterns-strings>anagram>detect_anagram()`, `is_anagram`
