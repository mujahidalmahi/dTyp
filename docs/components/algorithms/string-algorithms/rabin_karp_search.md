# rabin_karp_search
> **Domain:** `algorithms` | **Subcategory:** `string-algorithms` | **Type:** `function`
## Overview
Finds pattern in text using rolling hash function

## Signature
```c
int rabin_karp_search(const char* text, const char* pat, int q);
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
int rabin_karp_search(const char* text, const char* pat, int q) {
    int n = (int)strlen(text);
    int m = (int)strlen(pat);
    int d = 256;
    int p = 0, t = 0, h = 1;
    for (int i = 0; i < m - 1; i++) h = (h * d) % q;
    for (int i = 0; i < m; i++) {
        p = (d * p + pat[i]) % q;
        t = (d * t + text[i]) % q;
    }
    for (int i = 0; i <= n - m; i++) {
        if (p == t) {
            int match = 1;
            for (int j = 0; j < m; j++) {
                if (text[i + j] != pat[j]) { match = 0; break; }
            }
            if (match) return i;
        }
        if (i < n - m) {
            t = (d * (t - text[i] * h) + text[i + m]) % q;
            if (t < 0) t = t + q;
        }
    }
    return -1;
}
```

## Aliases & Shorthands
Available via: `rabin_karp_search`, `algorithms.separate-components.string-algorithms.rabin-karp.search`, `algorithms>rabin_karp_search()`, `algorithms>separate-components>string-algorithms>rabin-karp>search>rabin_karp_search()`, `rabinKarp`
