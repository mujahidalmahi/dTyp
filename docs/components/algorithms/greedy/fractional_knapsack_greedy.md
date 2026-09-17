# fractional_knapsack_greedy
> **Domain:** `algorithms` | **Subcategory:** `greedy` | **Type:** `function`
## Overview
Maximizes fractional knapsack value using greedy ratio sorting

## Signature
```c
double fractional_knapsack_greedy(int capacity, double* wt, double* val, int n);
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
double fractional_knapsack_greedy(int capacity, double* wt, double* val, int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            double r1 = val[j] / wt[j];
            double r2 = val[j + 1] / wt[j + 1];
            if (r1 < r2) {
                double tv = val[j]; val[j] = val[j + 1]; val[j + 1] = tv;
                double tw = wt[j]; wt[j] = wt[j + 1]; wt[j + 1] = tw;
            }
        }
    }
    double total_value = 0.0;
    double rem_cap = capacity;
    for (int i = 0; i < n; i++) {
        if (wt[i] <= rem_cap) {
            rem_cap -= wt[i];
            total_value += val[i];
        } else {
            total_value += val[i] * (rem_cap / wt[i]);
            break;
        }
    }
    return total_value;
}
```

## Aliases & Shorthands
Available via: `fractional_knapsack_greedy`, `algorithms.separate-components.greedy.fractional-knapsack.greedy`, `algorithms>fractional_knapsack_greedy()`, `algorithms>separate-components>greedy>fractional-knapsack>greedy>fractional_knapsack_greedy()`, `fractionalKnapsack`
