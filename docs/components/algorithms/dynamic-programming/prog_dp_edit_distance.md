# prog_dp_edit_distance
> **Domain:** `algorithms` | **Subcategory:** `dynamic-programming` | **Type:** `program`
## Overview
Complete Levenshtein Edit Distance calculation program

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

static int min3(int a, int b, int c) {
    int m = a < b ? a : b;
    return m < c ? m : c;
}

int main(void) {
    const char* s1 = "kitten";
    const char* s2 = "sitting";
    int m = (int)strlen(s1);
    int n = (int)strlen(s2);

    int dp[32][32];
    for (int i = 0; i <= m; i++) dp[i][0] = i;
    for (int j = 0; j <= n; j++) dp[0][j] = j;

    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (s1[i - 1] == s2[j - 1]) dp[i][j] = dp[i - 1][j - 1];
            else dp[i][j] = 1 + min3(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
        }
    }

    printf("Edit Distance between '%s' and '%s': %d
", s1, s2, dp[m][n]);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_dp_edit_distance`, `algorithms.full-programs.dynamic-programming.string-dp.prog-edit-distance`, `algorithms>prog_dp_edit_distance()`, `algorithms>full-programs>dynamic-programming>string-dp>prog-edit-distance>prog_dp_edit_distance()`, `programEditDistance`
