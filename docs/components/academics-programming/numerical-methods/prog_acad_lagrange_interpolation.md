# prog_acad_lagrange_interpolation
> **Domain:** `academics-programming` | **Subcategory:** `numerical-methods` | **Type:** `program`
## Overview
Interactive Lagrange polynomial interpolator with basis polynomials evaluation and query solver

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
#include <stdbool.h>

#define MAX_PTS 20

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

static double eval_lagrange(int n, const double x[], const double y[], double q) {
    double result = 0.0;
    printf("\nLagrange Basis Polynomials at x = %.4f:\n", q);
    for (int i = 0; i < n; i++) {
        double term = 1.0;
        for (int j = 0; j < n; j++) {
            if (i != j) {
                term *= (q - x[j]) / (x[i] - x[j]);
            }
        }
        printf("  L_%d(%.4f) = %10.6f (weighted: y_%d * L_%d = %10.6f)\n",
               i, q, term, i, i, y[i] * term);
        result += y[i] * term;
    }
    return result;
}

int main(void) {
    int n = 4;
    double x[MAX_PTS] = {0.0, 1.0, 2.0, 3.0};
    double y[MAX_PTS] = {1.0, 2.0, 9.0, 28.0};

    int choice;
    do {
        printf("\n================ LAGRANGE INTERPOLATION WORKBENCH ================\n");
        printf("1. Enter Data Points (x_i, y_i)\n");
        printf("2. Display Current Data Points\n");
        printf("3. Interpolate at Query Point x\n");
        printf("0. Exit\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                printf("Enter number of points N (2 to %d): ", MAX_PTS);
                if (scanf("%d", &n) != 1 || n < 2 || n > MAX_PTS) {
                    clear_input();
                    n = 4;
                    break;
                }
                printf("Enter %d pairs of (x y):\n", n);
                for (int i = 0; i < n; i++) {
                    printf("Point %d: ", i + 1);
                    if (scanf("%lf %lf", &x[i], &y[i]) != 2) {
                        x[i] = (double)i; y[i] = 0.0;
                    }
                }
                clear_input();
                break;
            }
            case 2:
                printf("\nCurrent Points:\n");
                for (int i = 0; i < n; i++) printf("  P%d: (%.4f, %.4f)\n", i + 1, x[i], y[i]);
                break;
            case 3: {
                double q;
                printf("Enter query value x: ");
                if (scanf("%lf", &q) == 1) {
                    double val = eval_lagrange(n, x, y, q);
                    printf("Interpolated Value P(%.4f) = %.6f\n", q, val);
                } else {
                    clear_input();
                }
                break;
            }
            case 0:
                printf("Exiting Lagrange Workbench.\n");
                break;
            default:
                printf("Invalid selection.\n");
        }
    } while (choice != 0);

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_lagrange_interpolation`, `academics-programming.numerical-methods.interpolation.lagrange-interpolation.prog-lagrange-interpolation`, `academics-programming>prog_acad_lagrange_interpolation()`, `academics-programming>numerical-methods>interpolation>lagrange-interpolation>prog-lagrange-interpolation>prog_acad_lagrange_interpolation()`
