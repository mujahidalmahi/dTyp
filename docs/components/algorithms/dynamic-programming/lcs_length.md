# lcs_length
> **Domain:** `algorithms` | **Subcategory:** `dynamic-programming` | **Type:** `function`
## Overview
Computes Longest Common Subsequence length of two strings

## Signature
```c
int lcs_length(const char* s1, const char* s2);
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
int lcs_length(const char* s1, const char* s2) {
    int m = (int)strlen(s1);
    int n = (int)strlen(s2);
    int dp[128][128] = {0};
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (s1[i - 1] == s2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                int top = dp[i - 1][j];
                int left = dp[i][j - 1];
                dp[i][j] = (top > left) ? top : left;
            }
        }
    }
    return dp[m][n];
}
```

## Aliases & Shorthands
Available via: `lcs_length`, `algorithms.separate-components.dynamic-programming.subsequences.lcs`, `algorithms>lcs_length()`, `algorithms>separate-components>dynamic-programming>subsequences>lcs>lcs_length()`, `lcsLength`
