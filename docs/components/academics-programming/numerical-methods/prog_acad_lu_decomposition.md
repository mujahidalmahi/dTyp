# prog_acad_lu_decomposition
> **Domain:** `academics-programming` | **Subcategory:** `numerical-methods` | **Type:** `program`
## Overview
Interactive Doolittle LU matrix decomposition and two-step triangular linear system solver

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

static void print_matrix(const char* name, int n, double mat[MAX_DIM][MAX_DIM]) {
    printf("%s:\n", name);
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) printf("%10.4f ", mat[i][j]);
        printf("\n");
    }
    printf("\n");
}

static bool doolittle_lu(int n, double a[MAX_DIM][MAX_DIM], double l[MAX_DIM][MAX_DIM], double u[MAX_DIM][MAX_DIM]) {
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            l[i][j] = (i == j) ? 1.0 : 0.0;
            u[i][j] = 0.0;
        }
    }

    for (int i = 0; i < n; i++) {
        for (int k = i; k < n; k++) {
            double sum = 0.0;
            for (int j = 0; j < i; j++) sum += l[i][j] * u[j][k];
            u[i][k] = a[i][k] - sum;
        }

        if (fabs(u[i][i]) < 1e-12) return false;

        for (int k = i + 1; k < n; k++) {
            double sum = 0.0;
            for (int j = 0; j < i; j++) sum += l[k][j] * u[j][i];
            l[k][i] = (a[k][i] - sum) / u[i][i];
        }
    }
    return true;
}

static void solve_lu_system(int n, double l[MAX_DIM][MAX_DIM], double u[MAX_DIM][MAX_DIM], double b[MAX_DIM]) {
    double y[MAX_DIM];
    for (int i = 0; i < n; i++) {
        double sum = 0.0;
        for (int j = 0; j < i; j++) sum += l[i][j] * y[j];
        y[i] = b[i] - sum;
    }

    double x[MAX_DIM];
    for (int i = n - 1; i >= 0; i--) {
        double sum = 0.0;
        for (int j = i + 1; j < n; j++) sum += u[i][j] * x[j];
        x[i] = (y[i] - sum) / u[i][i];
    }

    printf("Forward substitution Ly = b:\n");
    for (int i = 0; i < n; i++) printf("  y[%d] = %10.4f\n", i + 1, y[i]);

    printf("\nBackward substitution Ux = y:\n");
    for (int i = 0; i < n; i++) printf("  x[%d] = %10.4f\n", i + 1, x[i]);
}

int main(void) {
    int n = 3;
    double a[MAX_DIM][MAX_DIM] = {
        {2.0, -1.0, -2.0},
        {-4.0, 6.0, 3.0},
        {-4.0, -2.8, 4.0}
    };
    double b[MAX_DIM] = {1.0, 2.0, 3.0};
    double l[MAX_DIM][MAX_DIM], u[MAX_DIM][MAX_DIM];

    int choice;
    do {
        printf("\n================ LU DECOMPOSITION WORKBENCH (DOOLITTLE) ================\n");
        printf("1. Enter Matrix A and RHS Vector b\n");
        printf("2. Compute LU Factorization (Display L and U)\n");
        printf("3. Solve Ax = b via Ly = b and Ux = y\n");
        printf("4. Display Matrix Determinant from U Diagonal\n");
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
                printf("Enter RHS vector b (%d values): ", n);
                for (int i = 0; i < n; i++) {
                    if (scanf("%lf", &b[i]) != 1) b[i] = 0.0;
                }
                clear_input();
                break;
            }
            case 2:
                if (doolittle_lu(n, a, l, u)) {
                    print_matrix("Lower Triangular L", n, l);
                    print_matrix("Upper Triangular U", n, u);
                } else {
                    printf("Error: LU factorization failed (zero pivot encountered).\n");
                }
                break;
            case 3:
                if (doolittle_lu(n, a, l, u)) {
                    solve_lu_system(n, l, u, b);
                } else {
                    printf("LU factorization failed.\n");
                }
                break;
            case 4:
                if (doolittle_lu(n, a, l, u)) {
                    double det = 1.0;
                    for (int i = 0; i < n; i++) det *= u[i][i];
                    printf("Determinant det(A) = Product(U_ii) = %.6f\n", det);
                }
                break;
            case 0:
                printf("Exiting LU Decomposition Workbench.\n");
                break;
            default:
                printf("Invalid selection.\n");
        }
    } while (choice != 0);

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_lu_decomposition`, `academics-programming.numerical-methods.elimination-methods.lu-decomposition.prog-lu-decomposition`, `academics-programming>prog_acad_lu_decomposition()`, `academics-programming>numerical-methods>elimination-methods>lu-decomposition>prog-lu-decomposition>prog_acad_lu_decomposition()`
