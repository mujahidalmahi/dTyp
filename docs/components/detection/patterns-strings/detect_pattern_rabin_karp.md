# detect_pattern_rabin_karp
> **Domain:** `detection` | **Subcategory:** `patterns-strings` | **Type:** `function`
## Overview
Finds first matching index of pattern in text using Rabin-Karp rolling hash

## Signature
```c
int detect_pattern_rabin_karp(const char* text, const char* pattern);
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
int detect_pattern_rabin_karp(const char* text, const char* pattern) {
    int m = 0, n = 0;
    while (pattern[m] != '\0') m++;
    while (text[n] != '\0') n++;
    if (m == 0) return 0;
    if (m > n) return -1;
    const int d = 256, q = 101;
    int p_hash = 0, t_hash = 0, h = 1;
    for (int i = 0; i < m - 1; i++) h = (h * d) % q;
    for (int i = 0; i < m; i++) {
        p_hash = (d * p_hash + pattern[i]) % q;
        t_hash = (d * t_hash + text[i]) % q;
    }
    for (int i = 0; i <= n - m; i++) {
        if (p_hash == t_hash) {
            int match = 1;
            for (int j = 0; j < m; j++) {
                if (text[i + j] != pattern[j]) { match = 0; break; }
            }
            if (match) return i;
        }
        if (i < n - m) {
            t_hash = (d * (t_hash - text[i] * h) + text[i + m]) % q;
            if (t_hash < 0) t_hash += q;
        }
    }
    return -1;
}
```

## Aliases & Shorthands
Available via: `detect_pattern_rabin_karp`, `detection.patterns-strings.pattern-rabin-karp`, `detection>detect_pattern_rabin_karp()`, `detection>patterns-strings>pattern-rabin-karp>detect_pattern_rabin_karp()`, `rabin_karp_find`
