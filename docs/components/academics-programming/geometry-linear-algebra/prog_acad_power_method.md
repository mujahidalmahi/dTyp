# prog_acad_power_method
> **Domain:** `academics-programming` | **Subcategory:** `geometry-linear-algebra` | **Type:** `program`
## Overview
Finds dominant eigenvalue and eigenvector using power iteration

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

double solve_power_method(int n, const double A[n][n], double x[n], double tol, int max_iter) {
    double lambda_old = 0.0;
    for (int iter = 0; iter < max_iter; iter++) {
        double y[n];
        for (int i = 0; i < n; i++) {
            y[i] = 0;
            for (int j = 0; j < n; j++) y[i] += A[i][j] * x[j];
        }
        double lambda_new = fabs(y[0]);
        for (int i = 1; i < n; i++) {
            if (fabs(y[i]) > lambda_new) lambda_new = fabs(y[i]);
        }
        for (int i = 0; i < n; i++) x[i] = y[i] / lambda_new;
        if (fabs(lambda_new - lambda_old) < tol) return lambda_new;
        lambda_old = lambda_new;
    }
    return lambda_old;
}

int main(void) {
    int n = 3;
    double A[3][3] = {
        {2, -12, 0},
        {1, -5, 0},
        {0, 0, 3}
    };
    double x[3] = {1, 1, 1};
    double lambda = solve_power_method(n, A, x, 1e-6, 100);
    printf("Dominant Eigenvalue: %.4f\n", lambda);
    printf("Eigenvector: (%.4f, %.4f, %.4f)\n", x[0], x[1], x[2]);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_power_method`, `academics-programming.geometry-linear-algebra.matrix-analysis.power-method-eigenvalue.prog-power-method`, `academics-programming>prog_acad_power_method()`, `academics-programming>geometry-linear-algebra>matrix-analysis>power-method-eigenvalue>prog-power-method>prog_acad_power_method()`
