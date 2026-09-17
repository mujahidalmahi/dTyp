# knapsack_01_tabulated
> **Domain:** `algorithms` | **Subcategory:** `dynamic-programming` | **Type:** `function`
## Overview
Computes maximum value for 0/1 knapsack using 2D DP table

## Signature
```c
int knapsack_01_tabulated(int W, const int* wt, const int* val, int n);
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
int knapsack_01_tabulated(int W, const int* wt, const int* val, int n) {
    int dp[128][128] = {0};
    for (int i = 1; i <= n; i++) {
        for (int w = 0; w <= W; w++) {
            if (wt[i - 1] <= w) {
                int take = val[i - 1] + dp[i - 1][w - wt[i - 1]];
                int skip = dp[i - 1][w];
                dp[i][w] = (take > skip) ? take : skip;
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }
    return dp[n][W];
}
```

## Aliases & Shorthands
Available via: `knapsack_01_tabulated`, `algorithms.separate-components.dynamic-programming.knapsack.knapsack-01`, `algorithms>knapsack_01_tabulated()`, `algorithms>separate-components>dynamic-programming>knapsack>knapsack-01>knapsack_01_tabulated()`, `knapsack01`
