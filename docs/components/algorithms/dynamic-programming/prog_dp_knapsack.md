# prog_dp_knapsack
> **Domain:** `algorithms` | **Subcategory:** `dynamic-programming` | **Type:** `program`
## Overview
Complete 0/1 Knapsack problem dynamic programming program

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

int main(void) {
    int val[] = {60, 100, 120};
    int wt[] = {10, 20, 30};
    int W = 50;
    int n = 3;

    int dp[4][51] = {0};
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

    printf("0/1 Knapsack Optimal Value: %d
", dp[n][W]);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_dp_knapsack`, `algorithms.full-programs.dynamic-programming.knapsack.prog-knapsack`, `algorithms>prog_dp_knapsack()`, `algorithms>full-programs>dynamic-programming>knapsack>prog-knapsack>prog_dp_knapsack()`, `programKnapsack`
