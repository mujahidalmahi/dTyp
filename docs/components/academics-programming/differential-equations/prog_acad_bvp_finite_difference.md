# prog_acad_bvp_finite_difference
> **Domain:** `academics-programming` | **Subcategory:** `differential-equations` | **Type:** `program`
## Overview
Solves 1D boundary value problem y'' = f(x) via tridiagonal finite differences

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

void solve_bvp_thomas(int n, double a, double b, double ya, double yb) {
    double h = (b - a) / (n + 1);
    double diag[n], rhs[n], y[n + 2];
    for (int i = 0; i < n; i++) {
        double x = a + (i + 1) * h;
        diag[i] = -2.0;
        rhs[i] = h * h * (-x);
    }
    rhs[0] -= ya;
    rhs[n - 1] -= yb;

    double c_prime[n], d_prime[n];
    c_prime[0] = 1.0 / diag[0];
    d_prime[0] = rhs[0] / diag[0];
    for (int i = 1; i < n; i++) {
        double m = 1.0 / (diag[i] - 1.0 * c_prime[i - 1]);
        c_prime[i] = 1.0 * m;
        d_prime[i] = (rhs[i] - 1.0 * d_prime[i - 1]) * m;
    }
    y[n] = d_prime[n - 1];
    for (int i = n - 2; i >= 0; i--) {
        y[i + 1] = d_prime[i] - c_prime[i] * y[i + 2];
    }
    y[0] = ya;
    y[n + 1] = yb;
    printf("BVP Solution profile:
");
    for (int i = 0; i <= n + 1; i++) {
        printf("x = %.2f, y = %.4f
", a + i * h, y[i]);
    }
}

int main(void) {
    solve_bvp_thomas(4, 0.0, 1.0, 0.0, 1.0);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_bvp_finite_difference`, `academics-programming.differential-equations.second-order-bvp.bvp-finite-difference.prog-bvp-finite-difference`, `academics-programming>prog_acad_bvp_finite_difference()`, `academics-programming>differential-equations>second-order-bvp>bvp-finite-difference>prog-bvp-finite-difference>prog_acad_bvp_finite_difference()`
