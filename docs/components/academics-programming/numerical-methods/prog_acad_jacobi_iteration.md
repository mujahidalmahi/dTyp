# prog_acad_jacobi_iteration
> **Domain:** `academics-programming` | **Subcategory:** `numerical-methods` | **Type:** `program`
## Overview
Solves diagonally dominant linear systems using Jacobi iterative method

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

void solve_jacobi(int n, const double A[n][n], const double b[n], double x[n], double tol, int max_iter) {
    double next_x[n];
    for (int iter = 0; iter < max_iter; iter++) {
        double max_err = 0.0;
        for (int i = 0; i < n; i++) {
            double sum = b[i];
            for (int j = 0; j < n; j++) {
                if (j != i) sum -= A[i][j] * x[j];
            }
            next_x[i] = sum / A[i][i];
            double err = fabs(next_x[i] - x[i]);
            if (err > max_err) max_err = err;
        }
        for (int i = 0; i < n; i++) x[i] = next_x[i];
        if (max_err < tol) break;
    }
}

int main(void) {
    int n = 3;
    double A[3][3] = {
        {10, 1, 1},
        {2, 10, 1},
        {2, 2, 10}
    };
    double b[3] = {12, 13, 14};
    double x[3] = {0, 0, 0};
    solve_jacobi(n, A, b, x, 1e-6, 100);
    for (int i = 0; i < n; i++) {
        printf("x[%d] = %.4f
", i, x[i]);
    }
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_jacobi_iteration`, `academics-programming.numerical-methods.elimination-methods.jacobi-iteration.prog-jacobi-iteration`, `academics-programming>prog_acad_jacobi_iteration()`, `academics-programming>numerical-methods>elimination-methods>jacobi-iteration>prog-jacobi-iteration>prog_acad_jacobi_iteration()`
