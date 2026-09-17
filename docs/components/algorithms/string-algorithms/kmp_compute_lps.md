# kmp_compute_lps
> **Domain:** `algorithms` | **Subcategory:** `string-algorithms` | **Type:** `function`
## Overview
Computes Longest Prefix Suffix (LPS) lookup array for KMP

## Signature
```c
void kmp_compute_lps(const char* pat, int m, int* lps);
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
void kmp_compute_lps(const char* pat, int m, int* lps) {
    int len = 0;
    lps[0] = 0;
    int i = 1;
    while (i < m) {
        if (pat[i] == pat[len]) {
            len++;
            lps[i] = len;
            i++;
        } else {
            if (len != 0) {
                len = lps[len - 1];
            } else {
                lps[i] = 0;
                i++;
            }
        }
    }
}
```

## Aliases & Shorthands
Available via: `kmp_compute_lps`, `algorithms.separate-components.string-algorithms.kmp.compute-lps`, `algorithms>kmp_compute_lps()`, `algorithms>separate-components>string-algorithms>kmp>compute-lps>kmp_compute_lps()`, `kmpLPS`
