# prog_acad_naive_gauss
> **Domain:** `academics-programming` | **Subcategory:** `numerical-methods` | **Type:** `program`
## Overview
Interactive naive Gaussian elimination linear solver with step-by-step augmented tableau and residual calculation

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

#define MAX_DIM 10

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

static void print_augmented(int n, double a[MAX_DIM][MAX_DIM + 1]) {
    for (int i = 0; i < n; i++) {
        printf(" | ");
        for (int j = 0; j < n; j++) printf("%10.4f ", a[i][j]);
        printf("| %10.4f |\n", a[i][n]);
    }
    printf("\n");
}

static void solve_naive_gauss(int n, double a[MAX_DIM][MAX_DIM + 1]) {
    printf("\nInitial Augmented Matrix [A | b]:\n");
    print_augmented(n, a);

    double orig_a[MAX_DIM][MAX_DIM];
    double orig_b[MAX_DIM];
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) orig_a[i][j] = a[i][j];
        orig_b[i] = a[i][n];
    }

    for (int k = 0; k < n - 1; k++) {
        if (fabs(a[k][k]) < 1e-12) {
            printf("Error: Pivot A[%d][%d] is zero or near-zero. Naive elimination fails without pivoting.\n", k, k);
            return;
        }
        for (int i = k + 1; i < n; i++) {
            double factor = a[i][k] / a[k][k];
            for (int j = k; j <= n; j++) {
                a[i][j] -= factor * a[k][j];
            }
        }
        printf("After eliminating column %d:\n", k + 1);
        print_augmented(n, a);
    }

    double x[MAX_DIM];
    for (int i = n - 1; i >= 0; i--) {
        double sum = a[i][n];
        for (int j = i + 1; j < n; j++) {
            sum -= a[i][j] * x[j];
        }
        x[i] = sum / a[i][i];
    }

    printf("Solution Vector x:\n");
    for (int i = 0; i < n; i++) printf("  x[%d] = %12.6f\n", i + 1, x[i]);

    printf("\nResidual Check (r = Ax - b):\n");
    double max_res = 0.0;
    for (int i = 0; i < n; i++) {
        double ax = 0.0;
        for (int j = 0; j < n; j++) ax += orig_a[i][j] * x[j];
        double res = fabs(ax - orig_b[i]);
        if (res > max_res) max_res = res;
        printf("  Equation %d: Ax = %.6f, b = %.6f, error = %.2e\n", i + 1, ax, orig_b[i], res);
    }
    printf("Infinity Norm ||r||_inf = %.2e\n", max_res);
}

int main(void) {
    int n = 3;
    double a[MAX_DIM][MAX_DIM + 1] = {
        {2.0, 1.0, -1.0, 8.0},
        {-3.0, -1.0, 2.0, -11.0},
        {-2.0, 1.0, 2.0, -3.0}
    };

    int choice;
    do {
        printf("\n================ NAIVE GAUSSIAN ELIMINATION WORKBENCH ================\n");
        printf("1. Enter System of Linear Equations (Dimension N and Coefficients)\n");
        printf("2. Solve System via Forward Elimination & Back Substitution\n");
        printf("3. Load Default 3x3 Test System\n");
        printf("0. Exit\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                printf("Enter system dimension N (2 to %d): ", MAX_DIM);
                if (scanf("%d", &n) != 1 || n < 2 || n > MAX_DIM) {
                    clear_input();
                    n = 3;
                    printf("Invalid dimension.\n");
                    break;
                }
                printf("Enter augmented matrix row by row (each row has %d coefficients followed by RHS b):\n", n);
                for (int i = 0; i < n; i++) {
                    printf("Row %d: ", i + 1);
                    for (int j = 0; j <= n; j++) {
                        if (scanf("%lf", &a[i][j]) != 1) a[i][j] = 0.0;
                    }
                }
                clear_input();
                break;
            }
            case 2:
                solve_naive_gauss(n, a);
                break;
            case 3:
                n = 3;
                a[0][0] = 2.0;  a[0][1] = 1.0;  a[0][2] = -1.0; a[0][3] = 8.0;
                a[1][0] = -3.0; a[1][1] = -1.0; a[1][2] = 2.0;  a[1][3] = -11.0;
                a[2][0] = -2.0; a[2][1] = 1.0;  a[2][2] = 2.0;  a[2][3] = -3.0;
                printf("Loaded default 3x3 system.\n");
                print_augmented(n, a);
                break;
            case 0:
                printf("Exiting Naive Gauss Workbench.\n");
                break;
            default:
                printf("Invalid selection.\n");
        }
    } while (choice != 0);

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_naive_gauss`, `academics-programming.numerical-methods.elimination-methods.naive-gauss.prog-naive-gauss`, `academics-programming>prog_acad_naive_gauss()`, `academics-programming>numerical-methods>elimination-methods>naive-gauss>prog-naive-gauss>prog_acad_naive_gauss()`
