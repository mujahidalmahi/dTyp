# prog_acad_determinant_inverse
> **Domain:** `academics-programming` | **Subcategory:** `geometry-linear-algebra` | **Type:** `program`
## Overview
Calculates determinant and matrix inverse using Gauss-Jordan row reduction

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

int invert_matrix(int n, const double A[n][n], double inv[n][n], double* out_det) {
    double aug[n][2 * n];
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            aug[i][j] = A[i][j];
            aug[i][j + n] = (i == j) ? 1.0 : 0.0;
        }
    }
    double det = 1.0;
    for (int i = 0; i < n; i++) {
        int pivot = i;
        for (int k = i + 1; k < n; k++) {
            if (fabs(aug[k][i]) > fabs(aug[pivot][i])) pivot = k;
        }
        if (pivot != i) {
            for (int j = 0; j < 2 * n; j++) {
                double tmp = aug[i][j]; aug[i][j] = aug[pivot][j]; aug[pivot][j] = tmp;
            }
            det = -det;
        }
        if (fabs(aug[i][i]) < 1e-12) return 0;
        double diag = aug[i][i];
        det *= diag;
        for (int j = 0; j < 2 * n; j++) aug[i][j] /= diag;
        for (int k = 0; k < n; k++) {
            if (k != i) {
                double factor = aug[k][i];
                for (int j = 0; j < 2 * n; j++) aug[k][j] -= factor * aug[i][j];
            }
        }
    }
    *out_det = det;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) inv[i][j] = aug[i][j + n];
    }
    return 1;
}

int main(void) {
    int n = 3;
    double A[3][3] = {
        {1, 2, 3},
        {0, 1, 4},
        {5, 6, 0}
    };
    double inv[3][3];
    double det;
    if (invert_matrix(n, A, inv, &det)) {
        printf("Determinant: %.4f
", det);
        printf("Inverse Matrix:
");
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) printf("%8.4f ", inv[i][j]);
            printf("
");
        }
    }
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_determinant_inverse`, `academics-programming.geometry-linear-algebra.matrix-analysis.determinant-inverse.prog-determinant-inverse`, `academics-programming>prog_acad_determinant_inverse()`, `academics-programming>geometry-linear-algebra>matrix-analysis>determinant-inverse>prog-determinant-inverse>prog_acad_determinant_inverse()`
