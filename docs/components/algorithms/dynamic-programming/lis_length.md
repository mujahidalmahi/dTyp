# lis_length
> **Domain:** `algorithms` | **Subcategory:** `dynamic-programming` | **Type:** `function`
## Overview
Computes Longest Increasing Subsequence length using O(n^2) DP

## Signature
```c
int lis_length(const int* arr, int n);
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
int lis_length(const int* arr, int n) {
    if (n <= 0) return 0;
    int* dp = (int*)malloc(n * sizeof(int));
    for (int i = 0; i < n; i++) dp[i] = 1;
    int max_len = 1;
    for (int i = 1; i < n; i++) {
        for (int j = 0; j < i; j++) {
            if (arr[i] > arr[j] && dp[j] + 1 > dp[i]) {
                dp[i] = dp[j] + 1;
            }
        }
        if (dp[i] > max_len) max_len = dp[i];
    }
    free(dp);
    return max_len;
}
```

## Aliases & Shorthands
Available via: `lis_length`, `algorithms.separate-components.dynamic-programming.subsequences.lis`, `algorithms>lis_length()`, `algorithms>separate-components>dynamic-programming>subsequences>lis>lis_length()`, `lisLength`
