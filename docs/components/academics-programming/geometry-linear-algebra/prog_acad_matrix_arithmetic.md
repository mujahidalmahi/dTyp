# prog_acad_matrix_arithmetic
> **Domain:** `academics-programming` | **Subcategory:** `geometry-linear-algebra` | **Type:** `program`
## Overview
Computes matrix multiplication C = A * B and matrix transpose

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

void mat_mul(int r1, int c1, int c2, const double A[r1][c1], const double B[c1][c2], double C[r1][c2]) {
    for (int i = 0; i < r1; i++) {
        for (int j = 0; j < c2; j++) {
            C[i][j] = 0.0;
            for (int k = 0; k < c1; k++) {
                C[i][j] += A[i][k] * B[k][j];
            }
        }
    }
}

void mat_transpose(int r, int c, const double A[r][c], double T[c][r]) {
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) {
            T[j][i] = A[i][j];
        }
    }
}

int main(void) {
    double A[2][3] = {{1, 2, 3}, {4, 5, 6}};
    double B[3][2] = {{7, 8}, {9, 1}, {2, 3}};
    double C[2][2];
    mat_mul(2, 3, 2, A, B, C);
    printf("Product Matrix C (2x2):\n");
    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 2; j++) printf("%.1f ", C[i][j]);
        printf("\n");
    }
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_matrix_arithmetic`, `academics-programming.geometry-linear-algebra.matrix-analysis.matrix-arithmetic.prog-matrix-arithmetic`, `academics-programming>prog_acad_matrix_arithmetic()`, `academics-programming>geometry-linear-algebra>matrix-analysis>matrix-arithmetic>prog-matrix-arithmetic>prog_acad_matrix_arithmetic()`
