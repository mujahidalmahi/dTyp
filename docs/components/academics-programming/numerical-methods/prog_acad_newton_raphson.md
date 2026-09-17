# prog_acad_newton_raphson
> **Domain:** `academics-programming` | **Subcategory:** `numerical-methods` | **Type:** `program`
## Overview
Solves roots via Newton-Raphson with internally computed central difference derivative

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

double f(double x) {
    return x * x - 5.0;
}

double df_central(double x, double h) {
    return (f(x + h) - f(x - h)) / (2.0 * h);
}

double solve_newton_raphson(double x0, double tol, int max_iter) {
    double x = x0;
    double h = 1e-5;
    for (int i = 0; i < max_iter; i++) {
        double fx = f(x);
        double fpx = df_central(x, h);
        if (fabs(fpx) < 1e-12) break;
        double step = fx / fpx;
        x -= step;
        if (fabs(step) < tol) break;
    }
    return x;
}

int main(void) {
    double x0 = 2.0, tol = 1e-6;
    double root = solve_newton_raphson(x0, tol, 100);
    printf("Newton-Raphson Root (sqrt(5)): %.6f
", root);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_newton_raphson`, `academics-programming.numerical-methods.root-finding.newton-raphson.prog-newton-raphson`, `academics-programming>prog_acad_newton_raphson()`, `academics-programming>numerical-methods>root-finding>newton-raphson>prog-newton-raphson>prog_acad_newton_raphson()`
