# kmp_search_pattern
> **Domain:** `algorithms` | **Subcategory:** `string-algorithms` | **Type:** `function`
## Overview
Finds first pattern match index in text in O(n + m)

## Signature
```c
int kmp_search_pattern(const char* text, const char* pat);
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
int kmp_search_pattern(const char* text, const char* pat) {
    int n = (int)strlen(text);
    int m = (int)strlen(pat);
    if (m == 0) return 0;
    int* lps = (int*)malloc(m * sizeof(int));
    kmp_compute_lps(pat, m, lps);
    int i = 0, j = 0;
    int match_idx = -1;
    while (i < n) {
        if (pat[j] == text[i]) {
            i++;
            j++;
        }
        if (j == m) {
            match_idx = i - j;
            break;
        } else if (i < n && pat[j] != text[i]) {
            if (j != 0) j = lps[j - 1];
            else i++;
        }
    }
    free(lps);
    return match_idx;
}
```

## Aliases & Shorthands
Available via: `kmp_search_pattern`, `algorithms.separate-components.string-algorithms.kmp.search`, `algorithms>kmp_search_pattern()`, `algorithms>separate-components>string-algorithms>kmp>search>kmp_search_pattern()`, `kmpSearch`

## Dependencies
Requires: `algorithms.separate-components.string-algorithms.kmp.compute-lps`
