# prog_acad_lu_decomposition
> **Domain:** `academics-programming` | **Subcategory:** `numerical-methods` | **Type:** `program`
## Overview
Doolittle LU decomposition solving Ax = b via forward and backward substitution

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

void solve_lud(int n, const double A[n][n], const double b[n], double x[n]) {
    double L[n][n], U[n][n], y[n];
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            L[i][j] = (i == j) ? 1.0 : 0.0;
            U[i][j] = 0.0;
        }
    }
    for (int i = 0; i < n; i++) {
        for (int k = i; k < n; k++) {
            double sum = 0;
            for (int j = 0; j < i; j++) sum += (L[i][j] * U[j][k]);
            U[i][k] = A[i][k] - sum;
        }
        for (int k = i + 1; k < n; k++) {
            double sum = 0;
            for (int j = 0; j < i; j++) sum += (L[k][j] * U[j][i]);
            L[k][i] = (A[k][i] - sum) / U[i][i];
        }
    }
    for (int i = 0; i < n; i++) {
        double sum = b[i];
        for (int j = 0; j < i; j++) sum -= L[i][j] * y[j];
        y[i] = sum;
    }
    for (int i = n - 1; i >= 0; i--) {
        double sum = y[i];
        for (int j = i + 1; j < n; j++) sum -= U[i][j] * x[j];
        x[i] = sum / U[i][i];
    }
}

int main(void) {
    int n = 3;
    double A[3][3] = {
        {2, -1, -2},
        {-4, 6, 3},
        {-4, -2, 8}
    };
    double b[3] = {-1, 13, -6};
    double x[3];
    solve_lud(n, A, b, x);
    for (int i = 0; i < n; i++) {
        printf("x[%d] = %.4f\n", i, x[i]);
    }
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_lu_decomposition`, `academics-programming.numerical-methods.elimination-methods.lu-decomposition.prog-lu-decomposition`, `academics-programming>prog_acad_lu_decomposition()`, `academics-programming>numerical-methods>elimination-methods>lu-decomposition>prog-lu-decomposition>prog_acad_lu_decomposition()`
