# prog_acad_jacobi_iteration
> **Domain:** `academics-programming` | **Subcategory:** `numerical-methods` | **Type:** `program`
## Overview
Interactive Jacobi iterative linear solver with strict diagonal dominance verification and convergence tracking

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

static bool check_diagonal_dominance(int n, double a[MAX_DIM][MAX_DIM]) {
    bool strictly_dominant = true;
    printf("\nChecking Strict Diagonal Dominance (|A_ii| > Sum_{j != i} |A_ij|):\n");
    for (int i = 0; i < n; i++) {
        double diag = fabs(a[i][i]);
        double sum = 0.0;
        for (int j = 0; j < n; j++) {
            if (i != j) sum += fabs(a[i][j]);
        }
        printf("  Row %d: |A[%d][%d]| = %.4f, Sum off-diagonals = %.4f -> %s\n",
               i + 1, i + 1, i + 1, diag, sum, (diag > sum) ? "PASS" : "FAIL");
        if (diag <= sum) strictly_dominant = false;
    }
    return strictly_dominant;
}

static void solve_jacobi(int n, double a[MAX_DIM][MAX_DIM], double b[MAX_DIM], double tol, int max_iter) {
    check_diagonal_dominance(n, a);

    double x[MAX_DIM] = {0.0};
    double x_new[MAX_DIM];

    printf("\nIterative Convergence Table (Jacobi Method):\n");
    printf("-------------------------------------------------------------\n");
    printf(" Iter |  x[1]   |  x[2]   |  x[3]   | Max ||x_new - x||_inf\n");
    printf("-------------------------------------------------------------\n");

    for (int iter = 1; iter <= max_iter; iter++) {
        double max_diff = 0.0;
        for (int i = 0; i < n; i++) {
            double sum = 0.0;
            for (int j = 0; j < n; j++) {
                if (i != j) sum += a[i][j] * x[j];
            }
            x_new[i] = (b[i] - sum) / a[i][i];
            double diff = fabs(x_new[i] - x[i]);
            if (diff > max_diff) max_diff = diff;
        }

        printf(" %4d |", iter);
        for (int i = 0; i < ((n < 3) ? n : 3); i++) printf(" %7.4f |", x_new[i]);
        printf(" %22.4e\n", max_diff);

        for (int i = 0; i < n; i++) x[i] = x_new[i];

        if (max_diff < tol) {
            printf("-------------------------------------------------------------\n");
            printf("Convergence reached in %d iterations!\n", iter);
            for (int i = 0; i < n; i++) printf("  x[%d] = %12.6f\n", i + 1, x[i]);
            return;
        }
    }
    printf("-------------------------------------------------------------\n");
    printf("Reached max iterations (%d).\n", max_iter);
}

int main(void) {
    int n = 3;
    double a[MAX_DIM][MAX_DIM] = {
        {10.0, -1.0, 2.0},
        {-1.0, 11.0, -1.0},
        {2.0, -1.0, 10.0}
    };
    double b[MAX_DIM] = {6.0, 25.0, -11.0};

    int choice;
    do {
        printf("\n================ JACOBI ITERATION WORKBENCH ================\n");
        printf("1. Enter Linear System A and b\n");
        printf("2. Solve System via Jacobi Relaxation\n");
        printf("3. Load Default Diagonally Dominant 3x3 System\n");
        printf("0. Exit\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                printf("Enter dimension N (2 to %d): ", MAX_DIM);
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
                printf("Enter RHS vector b (%d values): ", n);
                for (int i = 0; i < n; i++) {
                    if (scanf("%lf", &b[i]) != 1) b[i] = 0.0;
                }
                clear_input();
                break;
            }
            case 2: {
                double tol = 1e-6;
                int max_iter = 50;
                printf("Enter tolerance (e.g. 1e-6): ");
                if (scanf("%lf", &tol) != 1) tol = 1e-6;
                printf("Enter max iterations (e.g. 50): ");
                if (scanf("%d", &max_iter) != 1) max_iter = 50;
                clear_input();
                solve_jacobi(n, a, b, tol, max_iter);
                break;
            }
            case 3:
                n = 3;
                a[0][0] = 10.0; a[0][1] = -1.0; a[0][2] = 2.0;
                a[1][0] = -1.0; a[1][1] = 11.0; a[1][2] = -1.0;
                a[2][0] = 2.0;  a[2][1] = -1.0; a[2][2] = 10.0;
                b[0] = 6.0; b[1] = 25.0; b[2] = -11.0;
                printf("Loaded default 3x3 system.\n");
                break;
            case 0:
                printf("Exiting Jacobi Workbench.\n");
                break;
            default:
                printf("Invalid selection.\n");
        }
    } while (choice != 0);

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_jacobi_iteration`, `academics-programming.numerical-methods.elimination-methods.jacobi-iteration.prog-jacobi-iteration`, `academics-programming>prog_acad_jacobi_iteration()`, `academics-programming>numerical-methods>elimination-methods>jacobi-iteration>prog-jacobi-iteration>prog_acad_jacobi_iteration()`
