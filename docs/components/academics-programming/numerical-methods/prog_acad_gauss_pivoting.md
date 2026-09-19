# prog_acad_gauss_pivoting
> **Domain:** `academics-programming` | **Subcategory:** `numerical-methods` | **Type:** `program`
## Overview
Interactive Gaussian elimination with partial pivoting, row-swap logging, and determinant computation

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

static void solve_gauss_pivoting(int n, double a[MAX_DIM][MAX_DIM + 1]) {
    printf("\nInitial Augmented Matrix:\n");
    print_augmented(n, a);

    int swap_count = 0;
    for (int k = 0; k < n; k++) {
        int max_row = k;
        double max_val = fabs(a[k][k]);
        for (int i = k + 1; i < n; i++) {
            if (fabs(a[i][k]) > max_val) {
                max_val = fabs(a[i][k]);
                max_row = i;
            }
        }

        if (max_val < 1e-14) {
            printf("Error: Matrix is singular or near-singular at column %d.\n", k);
            return;
        }

        if (max_row != k) {
            for (int j = k; j <= n; j++) {
                double tmp = a[k][j];
                a[k][j] = a[max_row][j];
                a[max_row][j] = tmp;
            }
            swap_count++;
            printf("Swapped Row %d with Row %d (pivot magnitude = %.4f):\n", k + 1, max_row + 1, max_val);
            print_augmented(n, a);
        }

        for (int i = k + 1; i < n; i++) {
            double factor = a[i][k] / a[k][k];
            for (int j = k; j <= n; j++) {
                a[i][j] -= factor * a[k][j];
            }
        }
    }

    double det = (swap_count % 2 == 1) ? -1.0 : 1.0;
    for (int i = 0; i < n; i++) det *= a[i][i];
    printf("Matrix Determinant det(A) = %.6f\n\n", det);

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
}

int main(void) {
    int n = 3;
    double a[MAX_DIM][MAX_DIM + 1] = {
        {0.001, 2.0, 3.0, 5.0},
        {1.0, 1.0, 1.0, 3.0},
        {2.0, -1.0, 4.0, 5.0}
    };

    int choice;
    do {
        printf("\n================ GAUSS ELIMINATION WITH PARTIAL PIVOTING ================\n");
        printf("1. Enter System of Linear Equations\n");
        printf("2. Solve System with Partial Pivoting & Display Determinant\n");
        printf("3. Load Small-Pivot Test Case (0.001 near-zero pivot)\n");
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
                    printf("Invalid dimension.\n");
                    break;
                }
                printf("Enter augmented rows (%d coeffs + 1 RHS per row):\n", n);
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
                solve_gauss_pivoting(n, a);
                break;
            case 3:
                n = 3;
                a[0][0] = 0.001; a[0][1] = 2.0;  a[0][2] = 3.0; a[0][3] = 5.0;
                a[1][0] = 1.0;   a[1][1] = 1.0;  a[1][2] = 1.0; a[1][3] = 3.0;
                a[2][0] = 2.0;   a[2][1] = -1.0; a[2][2] = 4.0; a[2][3] = 5.0;
                printf("Loaded near-zero pivot test case.\n");
                print_augmented(n, a);
                break;
            case 0:
                printf("Exiting Pivoting Workbench.\n");
                break;
            default:
                printf("Invalid selection.\n");
        }
    } while (choice != 0);

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_gauss_pivoting`, `academics-programming.numerical-methods.elimination-methods.gauss-pivoting.prog-gauss-pivoting`, `academics-programming>prog_acad_gauss_pivoting()`, `academics-programming>numerical-methods>elimination-methods>gauss-pivoting>prog-gauss-pivoting>prog_acad_gauss_pivoting()`
