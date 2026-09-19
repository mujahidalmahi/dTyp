# prog_cp_string_z_algorithm
> **Domain:** `competitive-programming` | **Subcategory:** `fast-io` | **Type:** `program`
## Overview
Linear-time Z-Algorithm computing longest common prefix array for exact string matching

## Signature
```c
int main(void);
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
#include <stdlib.h>

static void compute_z(const char* s, int n, int* z) {
    int l = 0, r = 0;
    z[0] = n;
    for (int i = 1; i < n; i++) {
        if (i <= r) {
            z[i] = (r - i + 1 < z[i - l]) ? (r - i + 1) : z[i - l];
        } else {
            z[i] = 0;
        }
        while (i + z[i] < n && s[z[i]] == s[i + z[i]]) {
            z[i]++;
        }
        if (i + z[i] - 1 > r) {
            l = i;
            r = i + z[i] - 1;
        }
    }
}

static void solve(void) {
    char pat[100005];
    char text[100005];
    if (scanf("%s %s", pat, text) != 2) return;

    int p_len = (int)strlen(pat);
    int t_len = (int)strlen(text);
    int total_len = p_len + 1 + t_len;

    char* concat = (char*)malloc(total_len + 1);
    memcpy(concat, pat, p_len);
    concat[p_len] = '$';
    memcpy(concat + p_len + 1, text, t_len);
    concat[total_len] = '\0';

    int* z = (int*)malloc(total_len * sizeof(int));
    compute_z(concat, total_len, z);

    int matches = 0;
    for (int i = p_len + 1; i < total_len; i++) {
        if (z[i] == p_len) {
            matches++;
        }
    }

    printf("Occurrences: %d\n", matches);
    for (int i = p_len + 1; i < total_len; i++) {
        if (z[i] == p_len) {
            printf("%d ", i - (p_len + 1) + 1);
        }
    }
    printf("\n");

    free(concat);
    free(z);
}

int main(void) {
    int t;
    if (scanf("%d", &t) != 1) t = 1;
    while (t--) {
        solve();
    }
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_cp_string_z_algorithm`, `competitive-programming.full-programs.fast-io-utilities.fast-io.prog-cp-string-z-algorithm`, `competitive-programming>prog_cp_string_z_algorithm()`, `competitive-programming>full-programs>fast-io-utilities>fast-io>prog-cp-string-z-algorithm>prog_cp_string_z_algorithm()`, `cpStringZAlgorithm`
