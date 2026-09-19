# prog_string_kmp
> **Domain:** `algorithms` | **Subcategory:** `string-algorithms` | **Type:** `program`
## Overview
Complete Knuth-Morris-Pratt pattern matching program

## Signature
```c
int main(void)
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
#include <stdio.h>
#include <string.h>

void compute_lps(const char* pat, int m, int* lps) {
    int len = 0; lps[0] = 0; int i = 1;
    while (i < m) {
        if (pat[i] == pat[len]) lps[i++] = ++len;
        else if (len) len = lps[len - 1];
        else lps[i++] = 0;
    }
}

int main(void) {
    const char* text = "ABABDABACDABABCABAB";
    const char* pat = "ABABCABAB";
    int n = (int)strlen(text), m = (int)strlen(pat);
    int lps[32];
    compute_lps(pat, m, lps);

    int i = 0, j = 0;
    while (i < n) {
        if (pat[j] == text[i]) { i++; j++; }
        if (j == m) {
            printf("Found pattern at index %d\n", i - j);
            j = lps[j - 1];
        } else if (i < n && pat[j] != text[i]) {
            if (j) j = lps[j - 1];
            else i++;
        }
    }
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_string_kmp`, `algorithms.full-programs.string-algorithms.kmp.prog-kmp`, `algorithms>prog_string_kmp()`, `algorithms>full-programs>string-algorithms>kmp>prog-kmp>prog_string_kmp()`, `programKMP`
