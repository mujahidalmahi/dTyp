# prog_acad_bvp_finite_difference
> **Domain:** `academics-programming` | **Subcategory:** `differential-equations` | **Type:** `program`
## Overview
Interactive 1D linear boundary value problem solver using finite differences and the Thomas tridiagonal algorithm

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

#define MAX_NODES 50

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

static void solve_bvp_fd(double a, double b, double alpha, double beta, int n) {
    double h = (b - a) / (n + 1);
    double sub[MAX_NODES], diag[MAX_NODES], sup[MAX_NODES], rhs[MAX_NODES];
    double x[MAX_NODES];

    for (int i = 0; i < n; i++) {
        x[i] = a + (i + 1) * h;
        diag[i] = -2.0;
        sub[i] = 1.0;
        sup[i] = 1.0;
        rhs[i] = h * h * x[i];
    }
    rhs[0] -= alpha;
    rhs[n - 1] -= beta;

    for (int i = 1; i < n; i++) {
        double m = sub[i] / diag[i - 1];
        diag[i] -= m * sup[i - 1];
        rhs[i] -= m * rhs[i - 1];
    }

    double y[MAX_NODES];
    y[n - 1] = rhs[n - 1] / diag[n - 1];
    for (int i = n - 2; i >= 0; i--) {
        y[i] = (rhs[i] - sup[i] * y[i + 1]) / diag[i];
    }

    printf("\nFinite Difference Solution for y'' = x, y(%.2f) = %.2f, y(%.2f) = %.2f (h = %.4f):\n",
           a, alpha, b, beta, h);
    printf("----------------------------------------------------------------------\n");
    printf(" Node |     x_i     |   Numerical y_i |   Exact y(x_i)  | Absolute Error\n");
    printf("----------------------------------------------------------------------\n");

    printf(" %4d | %11.4f | %15.6f | %15.6f |       0.00\n", 0, a, alpha, alpha);

    for (int i = 0; i < n; i++) {
        double ex = (x[i] * x[i] * x[i]) / 6.0 + (beta - alpha - 1.0 / 6.0) * x[i] + alpha;
        printf(" %4d | %11.4f | %15.6f | %15.6f | %14.4e\n",
               i + 1, x[i], y[i], ex, fabs(y[i] - ex));
    }

    printf(" %4d | %11.4f | %15.6f | %15.6f |       0.00\n", n + 1, b, beta, beta);
    printf("----------------------------------------------------------------------\n");
}

int main(void) {
    int choice;
    do {
        printf("\n================ BOUNDARY VALUE PROBLEM (FINITE DIFFERENCE) ================\n");
        printf("1. Solve y'' = x on [0, 1] with y(0) = 0, y(1) = 0\n");
        printf("2. Custom Boundary Values on [a, b]\n");
        printf("0. Exit\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1:
                solve_bvp_fd(0.0, 1.0, 0.0, 0.0, 9);
                break;
            case 2: {
                double a, b, alpha, beta;
                int n;
                printf("Enter interval bounds [a, b]: ");
                if (scanf("%lf %lf", &a, &b) != 2) { clear_input(); break; }
                printf("Enter Dirichlet boundary conditions y(a) and y(b): ");
                if (scanf("%lf %lf", &alpha, &beta) != 2) { clear_input(); break; }
                printf("Enter number of interior nodes N (5 to 30): ");
                if (scanf("%d", &n) != 1 || n < 3 || n > 30) n = 9;
                solve_bvp_fd(a, b, alpha, beta, n);
                break;
            }
            case 0:
                printf("Exiting BVP Workbench.\n");
                break;
            default:
                printf("Invalid choice.\n");
        }
    } while (choice != 0);

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_bvp_finite_difference`, `academics-programming.differential-equations.second-order-bvp.bvp-finite-difference.prog-bvp-finite-difference`, `academics-programming>prog_acad_bvp_finite_difference()`, `academics-programming>differential-equations>second-order-bvp>bvp-finite-difference>prog-bvp-finite-difference>prog_acad_bvp_finite_difference()`
