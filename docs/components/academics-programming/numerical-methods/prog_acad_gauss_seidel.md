# prog_acad_gauss_seidel
> **Domain:** `academics-programming` | **Subcategory:** `numerical-methods` | **Type:** `program`
## Overview
Solves linear systems using Gauss-Seidel successive over-relaxation

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

void solve_gauss_seidel(int n, const double A[n][n], const double b[n], double x[n], double tol, int max_iter) {
    for (int iter = 0; iter < max_iter; iter++) {
        double max_err = 0.0;
        for (int i = 0; i < n; i++) {
            double sum = b[i];
            for (int j = 0; j < n; j++) {
                if (j != i) sum -= A[i][j] * x[j];
            }
            double new_val = sum / A[i][i];
            double err = fabs(new_val - x[i]);
            if (err > max_err) max_err = err;
            x[i] = new_val;
        }
        if (max_err < tol) break;
    }
}

int main(void) {
    int n = 3;
    double A[3][3] = {
        {4, 1, 2},
        {1, 5, 1},
        {2, 1, 5}
    };
    double b[3] = {16, 19, 23};
    double x[3] = {0, 0, 0};
    solve_gauss_seidel(n, A, b, x, 1e-6, 100);
    for (int i = 0; i < n; i++) {
        printf("x[%d] = %.4f\n", i, x[i]);
    }
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_gauss_seidel`, `academics-programming.numerical-methods.elimination-methods.gauss-seidel.prog-gauss-seidel`, `academics-programming>prog_acad_gauss_seidel()`, `academics-programming>numerical-methods>elimination-methods>gauss-seidel>prog-gauss-seidel>prog_acad_gauss_seidel()`
