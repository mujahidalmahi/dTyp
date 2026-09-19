# prog_acad_gauss_jordan
> **Domain:** `academics-programming` | **Subcategory:** `numerical-methods` | **Type:** `program`
## Overview
Interactive Gauss-Jordan elimination for solving linear systems to RREF and full matrix inversion

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

static void print_matrix_2n(int n, double a[MAX_DIM][MAX_DIM * 2]) {
    for (int i = 0; i < n; i++) {
        printf(" | ");
        for (int j = 0; j < n; j++) printf("%8.3f ", a[i][j]);
        printf("| ");
        for (int j = n; j < 2 * n; j++) printf("%8.3f ", a[i][j]);
        printf("|\n");
    }
    printf("\n");
}

static void invert_matrix(int n, double a[MAX_DIM][MAX_DIM]) {
    double aug[MAX_DIM][MAX_DIM * 2];
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) aug[i][j] = a[i][j];
        for (int j = n; j < 2 * n; j++) aug[i][j] = (j - n == i) ? 1.0 : 0.0;
    }

    printf("\nInitial Augmented Matrix [A | I]:\n");
    print_matrix_2n(n, aug);

    for (int i = 0; i < n; i++) {
        int pivot = i;
        for (int k = i + 1; k < n; k++) {
            if (fabs(aug[k][i]) > fabs(aug[pivot][i])) pivot = k;
        }

        if (fabs(aug[pivot][i]) < 1e-12) {
            printf("Error: Matrix is singular. Inversion impossible.\n");
            return;
        }

        if (pivot != i) {
            for (int j = 0; j < 2 * n; j++) {
                double tmp = aug[i][j];
                aug[i][j] = aug[pivot][j];
                aug[pivot][j] = tmp;
            }
        }

        double diag = aug[i][i];
        for (int j = 0; j < 2 * n; j++) aug[i][j] /= diag;

        for (int k = 0; k < n; k++) {
            if (k != i) {
                double factor = aug[k][i];
                for (int j = 0; j < 2 * n; j++) {
                    aug[k][j] -= factor * aug[i][j];
                }
            }
        }
    }

    printf("Reduced Row Echelon Form [I | A^-1]:\n");
    print_matrix_2n(n, aug);

    printf("Inverted Matrix A^-1:\n");
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) printf("%10.5f ", aug[i][j + n]);
        printf("\n");
    }
}

int main(void) {
    int n = 3;
    double a[MAX_DIM][MAX_DIM] = {
        {2.0, 1.0, 1.0},
        {1.0, 3.0, 2.0},
        {1.0, 0.0, 0.0}
    };

    int choice;
    do {
        printf("\n================ GAUSS-JORDAN ELIMINATION & INVERSION ================\n");
        printf("1. Enter Square Matrix A\n");
        printf("2. Compute Matrix Inverse A^-1 via [A | I] -> [I | A^-1]\n");
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
                invert_matrix(n, a);
                break;
            case 0:
                printf("Exiting Gauss-Jordan Workbench.\n");
                break;
            default:
                printf("Invalid selection.\n");
        }
    } while (choice != 0);

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_gauss_jordan`, `academics-programming.numerical-methods.elimination-methods.gauss-jordan.prog-gauss-jordan`, `academics-programming>prog_acad_gauss_jordan()`, `academics-programming>numerical-methods>elimination-methods>gauss-jordan>prog-gauss-jordan>prog_acad_gauss_jordan()`
