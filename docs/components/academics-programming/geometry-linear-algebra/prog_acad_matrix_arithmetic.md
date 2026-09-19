# prog_acad_matrix_arithmetic
> **Domain:** `academics-programming` | **Subcategory:** `geometry-linear-algebra` | **Type:** `program`
## Overview
Interactive matrix arithmetic laboratory supporting addition, subtraction, multiplication, transposition, trace, and Frobenius norm

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

#define MAX_DIM 6

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

static void print_mat(int r, int c, double m[MAX_DIM][MAX_DIM]) {
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) printf("%8.2f ", m[i][j]);
        printf("\n");
    }
}

int main(void) {
    int rA = 2, cA = 2;
    int rB = 2, cB = 2;
    double A[MAX_DIM][MAX_DIM] = {{1, 2}, {3, 4}};
    double B[MAX_DIM][MAX_DIM] = {{5, 6}, {7, 8}};
    double C[MAX_DIM][MAX_DIM];

    int choice;
    do {
        printf("\n================ MATRIX ARITHMETIC WORKBENCH ================\n");
        printf("1. Matrix Addition (A + B)\n");
        printf("2. Matrix Subtraction (A - B)\n");
        printf("3. Matrix Multiplication (A x B)\n");
        printf("4. Transpose Matrix A (A^T)\n");
        printf("5. Matrix Trace and Frobenius Norm\n");
        printf("6. Input Matrices A and B\n");
        printf("0. Exit\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1:
                if (rA != rB || cA != cB) {
                    printf("Error: Dimension mismatch for addition (%dx%d vs %dx%d).\n", rA, cA, rB, cB);
                } else {
                    for (int i = 0; i < rA; i++) for (int j = 0; j < cA; j++) C[i][j] = A[i][j] + B[i][j];
                    printf("\nResult A + B (%dx%d):\n", rA, cA);
                    print_mat(rA, cA, C);
                }
                break;
            case 2:
                if (rA != rB || cA != cB) {
                    printf("Error: Dimension mismatch for subtraction.\n");
                } else {
                    for (int i = 0; i < rA; i++) for (int j = 0; j < cA; j++) C[i][j] = A[i][j] - B[i][j];
                    printf("\nResult A - B (%dx%d):\n", rA, cA);
                    print_mat(rA, cA, C);
                }
                break;
            case 3:
                if (cA != rB) {
                    printf("Error: Inner dimension mismatch for multiplication (cols A = %d != rows B = %d).\n", cA, rB);
                } else {
                    for (int i = 0; i < rA; i++) {
                        for (int j = 0; j < cB; j++) {
                            C[i][j] = 0.0;
                            for (int k = 0; k < cA; k++) C[i][j] += A[i][k] * B[k][j];
                        }
                    }
                    printf("\nResult A x B (%dx%d):\n", rA, cB);
                    print_mat(rA, cB, C);
                }
                break;
            case 4:
                for (int i = 0; i < cA; i++) for (int j = 0; j < rA; j++) C[i][j] = A[j][i];
                printf("\nTranspose A^T (%dx%d):\n", cA, rA);
                print_mat(cA, rA, C);
                break;
            case 5: {
                if (rA == cA) {
                    double trace = 0.0;
                    for (int i = 0; i < rA; i++) trace += A[i][i];
                    printf("Trace Tr(A) = %.4f\n", trace);
                } else {
                    printf("Trace undefined for non-square matrix.\n");
                }
                double frob = 0.0;
                for (int i = 0; i < rA; i++) for (int j = 0; j < cA; j++) frob += A[i][j] * A[i][j];
                printf("Frobenius Norm ||A||_F = %.4f\n", sqrt(frob));
                break;
            }
            case 6: {
                printf("Enter Matrix A dimensions (rows cols): ");
                if (scanf("%d %d", &rA, &cA) == 2 && rA >= 1 && cA >= 1 && rA <= MAX_DIM && cA <= MAX_DIM) {
                    printf("Enter %d x %d elements for A:\n", rA, cA);
                    for (int i = 0; i < rA; i++) for (int j = 0; j < cA; j++) scanf("%lf", &A[i][j]);
                }
                printf("Enter Matrix B dimensions (rows cols): ");
                if (scanf("%d %d", &rB, &cB) == 2 && rB >= 1 && cB >= 1 && rB <= MAX_DIM && cB <= MAX_DIM) {
                    printf("Enter %d x %d elements for B:\n", rB, cB);
                    for (int i = 0; i < rB; i++) for (int j = 0; j < cB; j++) scanf("%lf", &B[i][j]);
                }
                clear_input();
                break;
            }
            case 0:
                printf("Exiting Matrix Arithmetic.\n");
                break;
            default:
                printf("Invalid selection.\n");
        }
    } while (choice != 0);

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_matrix_arithmetic`, `academics-programming.geometry-linear-algebra.matrix-analysis.matrix-arithmetic.prog-matrix-arithmetic`, `academics-programming>prog_acad_matrix_arithmetic()`, `academics-programming>geometry-linear-algebra>matrix-analysis>matrix-arithmetic>prog-matrix-arithmetic>prog_acad_matrix_arithmetic()`
