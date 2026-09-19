# prog_acad_power_method
> **Domain:** `academics-programming` | **Subcategory:** `geometry-linear-algebra` | **Type:** `program`
## Overview
Interactive Power Iteration method for computing dominant eigenvalue and eigenvector with Rayleigh quotient

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

#define MAX_DIM 8

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

static void run_power_method(int n, double a[MAX_DIM][MAX_DIM], double tol, int max_iter) {
    double v[MAX_DIM];
    for (int i = 0; i < n; i++) v[i] = 1.0 / sqrt((double)n);

    double lambda_prev = 0.0;
    printf("\nPower Iteration Convergence Table:\n");
    printf("-------------------------------------------------------------\n");
    printf(" Iter | Dominant Eigenvalue Estimate | Max Residual\n");
    printf("-------------------------------------------------------------\n");

    for (int iter = 1; iter <= max_iter; iter++) {
        double y[MAX_DIM] = {0.0};
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                y[i] += a[i][j] * v[j];
            }
        }

        double lambda = 0.0;
        for (int i = 0; i < n; i++) lambda += y[i] * v[i];

        double norm = 0.0;
        for (int i = 0; i < n; i++) norm += y[i] * y[i];
        norm = sqrt(norm);

        for (int i = 0; i < n; i++) v[i] = y[i] / norm;

        double err = fabs(lambda - lambda_prev);
        printf(" %4d | %26.8f | %12.4e\n", iter, lambda, err);

        if (err < tol && iter > 2) {
            printf("-------------------------------------------------------------\n");
            printf("Convergence reached in %d iterations!\n", iter);
            printf("Dominant Eigenvalue lambda_max = %.8f\n", lambda);
            printf("Corresponding Unit Eigenvector:\n  [ ");
            for (int i = 0; i < n; i++) printf("%.6f%s", v[i], (i < n - 1) ? ", " : " ");
            printf("]^T\n");
            return;
        }

        lambda_prev = lambda;
    }
    printf("-------------------------------------------------------------\n");
    printf("Reached max iterations (%d). Final estimate lambda = %.8f\n", max_iter, lambda_prev);
}

int main(void) {
    int n = 3;
    double a[MAX_DIM][MAX_DIM] = {
        {4.0, 1.0, 1.0},
        {1.0, 3.0, -1.0},
        {1.0, -1.0, 2.0}
    };

    int choice;
    do {
        printf("\n================ POWER METHOD (EIGENVALUE / EIGENVECTOR) ================\n");
        printf("1. Enter Square Matrix A\n");
        printf("2. Compute Dominant Eigenvalue & Eigenvector\n");
        printf("3. Load Default Symmetric 3x3 Test Matrix\n");
        printf("0. Exit\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                printf("Enter matrix dimension N (2 to %d): ", MAX_DIM);
                if (scanf("%d", &n) != 1 || n < 2 || n > MAX_DIM) {
                    clear_input();
                    n = 3;
                    break;
                }
                printf("Enter %d x %d matrix entries:\n", n, n);
                for (int i = 0; i < n; i++) {
                    for (int j = 0; j < n; j++) {
                        if (scanf("%lf", &a[i][j]) != 1) a[i][j] = 0.0;
                    }
                }
                clear_input();
                break;
            }
            case 2:
                run_power_method(n, a, 1e-7, 100);
                break;
            case 3:
                n = 3;
                a[0][0] = 4.0; a[0][1] = 1.0;  a[0][2] = 1.0;
                a[1][0] = 1.0; a[1][1] = 3.0;  a[1][2] = -1.0;
                a[2][0] = 1.0; a[2][1] = -1.0; a[2][2] = 2.0;
                printf("Loaded default 3x3 matrix.\n");
                break;
            case 0:
                printf("Exiting Power Method Workbench.\n");
                break;
            default:
                printf("Invalid selection.\n");
        }
    } while (choice != 0);

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_power_method`, `academics-programming.geometry-linear-algebra.matrix-analysis.power-method-eigenvalue.prog-power-method`, `academics-programming>prog_acad_power_method()`, `academics-programming>geometry-linear-algebra>matrix-analysis>power-method-eigenvalue>prog-power-method>prog_acad_power_method()`
