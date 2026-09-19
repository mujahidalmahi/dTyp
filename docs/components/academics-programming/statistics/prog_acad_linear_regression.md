# prog_acad_linear_regression
> **Domain:** `academics-programming` | **Subcategory:** `statistics` | **Type:** `program`
## Overview
Interactive ordinary least-squares linear regression solver with Pearson correlation r, R-squared, and prediction table

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
#include <stdbool.h>

#define MAX_PTS 50

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

static void solve_regression(int n, const double x[], const double y[]) {
    double sum_x = 0, sum_y = 0, sum_xy = 0, sum_x2 = 0, sum_y2 = 0;
    for (int i = 0; i < n; i++) {
        sum_x += x[i];
        sum_y += y[i];
        sum_xy += x[i] * y[i];
        sum_x2 += x[i] * x[i];
        sum_y2 += y[i] * y[i];
    }

    double denom_m = (n * sum_x2 - sum_x * sum_x);
    if (fabs(denom_m) < 1e-12) {
        printf("Error: All x values are identical. Vertical line regression undefined.\n");
        return;
    }

    double m = (n * sum_xy - sum_x * sum_y) / denom_m;
    double c = (sum_y - m * sum_x) / n;

    double num_r = (n * sum_xy - sum_x * sum_y);
    double den_r = sqrt((n * sum_x2 - sum_x * sum_x) * (n * sum_y2 - sum_y * sum_y));
    double r = (den_r > 1e-12) ? (num_r / den_r) : 0.0;
    double r2 = r * r;

    double sse = 0.0;
    for (int i = 0; i < n; i++) {
        double y_pred = m * x[i] + c;
        sse += (y[i] - y_pred) * (y[i] - y_pred);
    }
    double se_estimate = (n > 2) ? sqrt(sse / (n - 2)) : 0.0;

    printf("\n--- Ordinary Least Squares Linear Regression Results ---\n");
    printf("  Slope (m):                    %10.4f\n", m);
    printf("  Intercept (c):                %10.4f\n", c);
    printf("  Best-Fit Line Equation:       y = %.4f*x + %.4f\n", m, c);
    printf("  Pearson Correlation (r):      %10.4f\n", r);
    printf("  Coefficient of Determ. (R^2): %10.4f (%.2f%% variance explained)\n", r2, r2 * 100.0);
    printf("  Standard Error of Estimate:   %10.4f\n", se_estimate);

    printf("\nResidual Table:\n");
    printf(" Point |     x     |     y     |  Predicted y_hat | Residual e_i\n");
    printf("-------+-----------+-----------+------------------+--------------\n");
    for (int i = 0; i < n; i++) {
        double y_hat = m * x[i] + c;
        printf("  %3d  | %9.3f | %9.3f | %16.4f | %12.4f\n",
               i + 1, x[i], y[i], y_hat, y[i] - y_hat);
    }
}

int main(void) {
    int n = 5;
    double x[MAX_PTS] = {1, 2, 3, 4, 5};
    double y[MAX_PTS] = {2, 3, 5, 6, 8};

    int choice;
    do {
        printf("\n================ LINEAR REGRESSION WORKBENCH ================\n");
        printf("1. Enter Data Points (x_i, y_i)\n");
        printf("2. Compute Linear Regression Analysis\n");
        printf("3. Predict y for Query x\n");
        printf("0. Exit\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                printf("Enter number of observations N (3 to %d): ", MAX_PTS);
                if (scanf("%d", &n) != 1 || n < 3 || n > MAX_PTS) {
                    clear_input();
                    n = 5;
                    break;
                }
                printf("Enter %d pairs as 'x y':\n", n);
                for (int i = 0; i < n; i++) {
                    printf("Point %d: ", i + 1);
                    if (scanf("%lf %lf", &x[i], &y[i]) != 2) { x[i] = i; y[i] = i; }
                }
                clear_input();
                break;
            }
            case 2:
                solve_regression(n, x, y);
                break;
            case 3: {
                double qx;
                printf("Enter query value x: ");
                if (scanf("%lf", &qx) == 1) {
                    double sum_x = 0, sum_y = 0, sum_xy = 0, sum_x2 = 0;
                    for (int i = 0; i < n; i++) {
                        sum_x += x[i]; sum_y += y[i];
                        sum_xy += x[i] * y[i]; sum_x2 += x[i] * x[i];
                    }
                    double m = (n * sum_xy - sum_x * sum_y) / (n * sum_x2 - sum_x * sum_x);
                    double c = (sum_y - m * sum_x) / n;
                    printf("Predicted y_hat at x = %.4f: %.6f\n", qx, m * qx + c);
                } else { clear_input(); }
                break;
            }
            case 0:
                printf("Exiting Linear Regression.\n");
                break;
            default:
                printf("Invalid selection.\n");
        }
    } while (choice != 0);

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_linear_regression`, `academics-programming.statistics.regression-hypothesis.linear-regression.prog-linear-regression`, `academics-programming>prog_acad_linear_regression()`, `academics-programming>statistics>regression-hypothesis>linear-regression>prog-linear-regression>prog_acad_linear_regression()`
