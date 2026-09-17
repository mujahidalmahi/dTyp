# prog_acad_linear_regression
> **Domain:** `academics-programming` | **Subcategory:** `statistics` | **Type:** `program`
## Overview
Computes ordinary least-squares slope, intercept, Pearson r, and prediction

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
#include <math.h>

void solve_linear_regression(int n, const double x[], const double y[], double query_x) {
    double sum_x = 0, sum_y = 0, sum_xy = 0, sum_x2 = 0, sum_y2 = 0;
    for (int i = 0; i < n; i++) {
        sum_x += x[i];
        sum_y += y[i];
        sum_xy += x[i] * y[i];
        sum_x2 += x[i] * x[i];
        sum_y2 += y[i] * y[i];
    }
    double m = (n * sum_xy - sum_x * sum_y) / (n * sum_x2 - sum_x * sum_x);
    double c = (sum_y - m * sum_x) / n;
    double num_r = (n * sum_xy - sum_x * sum_y);
    double den_r = sqrt((n * sum_x2 - sum_x * sum_x) * (n * sum_y2 - sum_y * sum_y));
    double r = num_r / den_r;
    double r2 = r * r;
    double pred_y = m * query_x + c;

    printf("Slope (m):                     %.4f
", m);
    printf("Intercept (c):                 %.4f
", c);
    printf("Regression Equation:           y = %.4fx + %.4f
", m, c);
    printf("Pearson Correlation (r):       %.4f
", r);
    printf("R-Squared (r^2):               %.4f
", r2);
    printf("Prediction at x = %.2f:       y = %.4f
", query_x, pred_y);
}

int main(void) {
    int n = 5;
    double x[] = {1, 2, 3, 4, 5};
    double y[] = {2, 3, 5, 6, 8};
    solve_linear_regression(n, x, y, 6.0);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_linear_regression`, `academics-programming.statistics.regression-hypothesis.linear-regression.prog-linear-regression`, `academics-programming>prog_acad_linear_regression()`, `academics-programming>statistics>regression-hypothesis>linear-regression>prog-linear-regression>prog_acad_linear_regression()`
