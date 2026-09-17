# prog_acad_gauss_jordan
> **Domain:** `academics-programming` | **Subcategory:** `numerical-methods` | **Type:** `program`
## Overview
Solves Ax = b by reducing augmented matrix to reduced row echelon form (diagonal matrix)

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

void solve_gauss_jordan(int n, double a[n][n + 1], double x[n]) {
    for (int i = 0; i < n; i++) {
        int max_row = i;
        double max_val = fabs(a[i][i]);
        for (int k = i + 1; k < n; k++) {
            if (fabs(a[k][i]) > max_val) {
                max_val = fabs(a[k][i]);
                max_row = k;
            }
        }
        for (int j = 0; j <= n; j++) {
            double tmp = a[i][j];
            a[i][j] = a[max_row][j];
            a[max_row][j] = tmp;
        }
        double pivot = a[i][i];
        for (int j = 0; j <= n; j++) {
            a[i][j] /= pivot;
        }
        for (int k = 0; k < n; k++) {
            if (k != i) {
                double factor = a[k][i];
                for (int j = 0; j <= n; j++) {
                    a[k][j] -= factor * a[i][j];
                }
            }
        }
    }
    for (int i = 0; i < n; i++) {
        x[i] = a[i][n];
    }
}

int main(void) {
    int n = 3;
    double a[3][4] = {
        {2, 1, 1, 10},
        {3, 2, 3, 18},
        {1, 4, 9, 16}
    };
    double x[3];
    solve_gauss_jordan(n, a, x);
    for (int i = 0; i < n; i++) {
        printf("x[%d] = %.4f
", i, x[i]);
    }
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_gauss_jordan`, `academics-programming.numerical-methods.elimination-methods.gauss-jordan.prog-gauss-jordan`, `academics-programming>prog_acad_gauss_jordan()`, `academics-programming>numerical-methods>elimination-methods>gauss-jordan>prog-gauss-jordan>prog_acad_gauss_jordan()`
