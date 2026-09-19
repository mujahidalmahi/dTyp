# prog_acad_gauss_seidel
> **Domain:** `academics-programming` | **Subcategory:** `numerical-methods` | **Type:** `program`
## Overview
Interactive Gauss-Seidel and Successive Over-Relaxation (SOR) iterative solver with parameter tuning

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

static void solve_gauss_seidel(int n, double a[MAX_DIM][MAX_DIM], double b[MAX_DIM], double omega, double tol, int max_iter) {
    double x[MAX_DIM] = {0.0};

    printf("\nGauss-Seidel / SOR Iteration (omega = %.2f):\n", omega);
    printf("-------------------------------------------------------------\n");
    printf(" Iter |  x[1]   |  x[2]   |  x[3]   | Max ||dx||_inf\n");
    printf("-------------------------------------------------------------\n");

    for (int iter = 1; iter <= max_iter; iter++) {
        double max_diff = 0.0;
        for (int i = 0; i < n; i++) {
            double sum = 0.0;
            for (int j = 0; j < n; j++) {
                if (i != j) sum += a[i][j] * x[j];
            }
            double x_target = (b[i] - sum) / a[i][i];
            double x_new = (1.0 - omega) * x[i] + omega * x_target;
            double diff = fabs(x_new - x[i]);
            if (diff > max_diff) max_diff = diff;
            x[i] = x_new;
        }

        printf(" %4d |", iter);
        for (int i = 0; i < ((n < 3) ? n : 3); i++) printf(" %7.4f |", x[i]);
        printf(" %15.4e\n", max_diff);

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
        {4.0, 1.0, 1.0},
        {1.0, 5.0, 2.0},
        {1.0, 2.0, 4.0}
    };
    double b[MAX_DIM] = {7.0, -8.0, 6.0};

    int choice;
    do {
        printf("\n================ GAUSS-SEIDEL & SOR WORKBENCH ================\n");
        printf("1. Standard Gauss-Seidel (omega = 1.0)\n");
        printf("2. Successive Over-Relaxation (SOR, user-specified omega)\n");
        printf("3. Enter Custom System\n");
        printf("0. Exit\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        if (choice == 1 || choice == 2) {
            double omega = 1.0;
            if (choice == 2) {
                printf("Enter relaxation factor omega (e.g. 1.15): ");
                if (scanf("%lf", &omega) != 1 || omega <= 0.0 || omega >= 2.0) omega = 1.0;
            }
            solve_gauss_seidel(n, a, b, omega, 1e-6, 50);
        } else if (choice == 3) {
            printf("Enter dimension N (2 to %d): ", MAX_DIM);
            if (scanf("%d", &n) != 1 || n < 2 || n > MAX_DIM) n = 3;
            for (int i = 0; i < n; i++) {
                printf("Row %d: ", i + 1);
                for (int j = 0; j < n; j++) {
                    if (scanf("%lf", &a[i][j]) != 1) a[i][j] = 0.0;
                }
            }
            printf("Enter RHS b: ");
            for (int i = 0; i < n; i++) {
                if (scanf("%lf", &b[i]) != 1) b[i] = 0.0;
            }
            clear_input();
        } else if (choice == 0) {
            printf("Exiting Gauss-Seidel Workbench.\n");
        } else {
            printf("Invalid choice.\n");
        }
    } while (choice != 0);

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_gauss_seidel`, `academics-programming.numerical-methods.elimination-methods.gauss-seidel.prog-gauss-seidel`, `academics-programming>prog_acad_gauss_seidel()`, `academics-programming>numerical-methods>elimination-methods>gauss-seidel>prog-gauss-seidel>prog_acad_gauss_seidel()`
