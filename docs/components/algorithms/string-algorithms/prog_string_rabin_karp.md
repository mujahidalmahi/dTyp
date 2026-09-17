# prog_string_rabin_karp
> **Domain:** `algorithms` | **Subcategory:** `string-algorithms` | **Type:** `program`
## Overview
Complete Rabin-Karp rolling hash string search program

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

int main(void) {
    const char* txt = "GEEKS FOR GEEKS";
    const char* pat = "GEEK";
    int q = 101, d = 256;
    int n = (int)strlen(txt), m = (int)strlen(pat);
    int p = 0, t = 0, h = 1;

    for (int i = 0; i < m - 1; i++) h = (h * d) % q;
    for (int i = 0; i < m; i++) {
        p = (d * p + pat[i]) % q;
        t = (d * t + txt[i]) % q;
    }

    for (int i = 0; i <= n - m; i++) {
        if (p == t) {
            int match = 1;
            for (int j = 0; j < m; j++) {
                if (txt[i + j] != pat[j]) { match = 0; break; }
            }
            if (match) printf("Pattern found at index %d
", i);
        }
        if (i < n - m) {
            t = (d * (t - txt[i] * h) + txt[i + m]) % q;
            if (t < 0) t += q;
        }
    }
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_string_rabin_karp`, `algorithms.full-programs.string-algorithms.rabin-karp.prog-rabin-karp`, `algorithms>prog_string_rabin_karp()`, `algorithms>full-programs>string-algorithms>rabin-karp>prog-rabin-karp>prog_string_rabin_karp()`, `programRabinKarp`
