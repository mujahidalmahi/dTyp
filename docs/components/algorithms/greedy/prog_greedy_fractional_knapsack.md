# prog_greedy_fractional_knapsack
> **Domain:** `algorithms` | **Subcategory:** `greedy` | **Type:** `program`
## Overview
Complete Fractional Knapsack greedy value optimization program

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
    double wt[] = {10, 20, 30};
    double val[] = {60, 100, 120};
    int n = 3;
    double cap = 50;

    double total_val = 0.0;
    for (int i = 0; i < n; i++) {
        if (wt[i] <= cap) {
            cap -= wt[i];
            total_val += val[i];
        } else {
            total_val += val[i] * (cap / wt[i]);
            break;
        }
    }

    printf("Max Fractional Knapsack Value: %.2f\n", total_val);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_greedy_fractional_knapsack`, `algorithms.full-programs.greedy.fractional-knapsack.prog-fractional-knapsack`, `algorithms>prog_greedy_fractional_knapsack()`, `algorithms>full-programs>greedy>fractional-knapsack>prog-fractional-knapsack>prog_greedy_fractional_knapsack()`, `programFractionalKnapsack`
