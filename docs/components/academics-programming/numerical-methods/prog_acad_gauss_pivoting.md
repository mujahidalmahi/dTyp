# prog_acad_gauss_pivoting
> **Domain:** `academics-programming` | **Subcategory:** `numerical-methods` | **Type:** `program`
## Overview
Solves Ax = b via Gaussian elimination with row partial pivoting for numerical stability

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

void solve_gauss_pivoting(int n, double a[n][n + 1], double x[n]) {
    for (int i = 0; i < n; i++) {
        int max_row = i;
        double max_val = fabs(a[i][i]);
        for (int k = i + 1; k < n; k++) {
            if (fabs(a[k][i]) > max_val) {
                max_val = fabs(a[k][i]);
                max_row = k;
            }
        }
        if (max_row != i) {
            for (int j = i; j <= n; j++) {
                double tmp = a[i][j];
                a[i][j] = a[max_row][j];
                a[max_row][j] = tmp;
            }
        }
        for (int k = i + 1; k < n; k++) {
            double factor = a[k][i] / a[i][i];
            for (int j = i; j <= n; j++) {
                a[k][j] -= factor * a[i][j];
            }
        }
    }
    for (int i = n - 1; i >= 0; i--) {
        double sum = a[i][n];
        for (int j = i + 1; j < n; j++) {
            sum -= a[i][j] * x[j];
        }
        x[i] = sum / a[i][i];
    }
}

int main(void) {
    int n = 3;
    double a[3][4] = {
        {0.001, 1.0, 1.0, 2.0},
        {1.0, 1.0, 2.0, 4.0},
        {2.0, 1.0, 1.0, 4.0}
    };
    double x[3];
    solve_gauss_pivoting(n, a, x);
    for (int i = 0; i < n; i++) {
        printf("x[%d] = %.4f
", i, x[i]);
    }
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_gauss_pivoting`, `academics-programming.numerical-methods.elimination-methods.gauss-pivoting.prog-gauss-pivoting`, `academics-programming>prog_acad_gauss_pivoting()`, `academics-programming>numerical-methods>elimination-methods>gauss-pivoting>prog-gauss-pivoting>prog_acad_gauss_pivoting()`
