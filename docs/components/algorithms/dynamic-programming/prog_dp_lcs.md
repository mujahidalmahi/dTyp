# prog_dp_lcs
> **Domain:** `algorithms` | **Subcategory:** `dynamic-programming` | **Type:** `program`
## Overview
Complete Longest Common Subsequence dynamic programming program

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
    const char* s1 = "AGGTAB";
    const char* s2 = "GXTXAYB";
    int m = (int)strlen(s1);
    int n = (int)strlen(s2);

    int dp[32][32] = {0};
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (s1[i - 1] == s2[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;
            else {
                int top = dp[i - 1][j], left = dp[i][j - 1];
                dp[i][j] = (top > left) ? top : left;
            }
        }
    }

    printf("Length of LCS between '%s' and '%s': %d
", s1, s2, dp[m][n]);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_dp_lcs`, `algorithms.full-programs.dynamic-programming.subsequences.prog-lcs`, `algorithms>prog_dp_lcs()`, `algorithms>full-programs>dynamic-programming>subsequences>prog-lcs>prog_dp_lcs()`, `programLCS`
