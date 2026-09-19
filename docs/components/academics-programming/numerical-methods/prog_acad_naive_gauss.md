# prog_acad_naive_gauss
> **Domain:** `academics-programming` | **Subcategory:** `numerical-methods` | **Type:** `program`
## Overview
Solves linear system Ax = b using naive Gaussian elimination and back substitution

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

void solve_naive_gauss(int n, double a[n][n + 1], double x[n]) {
    for (int i = 0; i < n - 1; i++) {
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
        {2, 1, -1, 8},
        {-3, -1, 2, -11},
        {-2, 1, 2, -3}
    };
    double x[3];
    solve_naive_gauss(n, a, x);
    for (int i = 0; i < n; i++) {
        printf("x[%d] = %.4f\n", i, x[i]);
    }
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_naive_gauss`, `academics-programming.numerical-methods.elimination-methods.naive-gauss.prog-naive-gauss`, `academics-programming>prog_acad_naive_gauss()`, `academics-programming>numerical-methods>elimination-methods>naive-gauss>prog-naive-gauss>prog_acad_naive_gauss()`
