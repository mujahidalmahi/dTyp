# prog_acad_secant
> **Domain:** `academics-programming` | **Subcategory:** `numerical-methods` | **Type:** `program`
## Overview
Solves root using secant method from two initial points without analytical derivative

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
    return x * x * x - x - 1;
}

double solve_secant(double x0, double x1, double tol, int max_iter) {
    for (int i = 0; i < max_iter; i++) {
        double f0 = f(x0);
        double f1 = f(x1);
        if (fabs(f1 - f0) < 1e-12) break;
        double x2 = x1 - f1 * (x1 - x0) / (f1 - f0);
        if (fabs(x2 - x1) < tol) return x2;
        x0 = x1;
        x1 = x2;
    }
    return x1;
}

int main(void) {
    double x0 = 1.0, x1 = 2.0, tol = 1e-6;
    double root = solve_secant(x0, x1, tol, 100);
    printf("Secant Method Root: %.6f
", root);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_secant`, `academics-programming.numerical-methods.root-finding.secant-method.prog-secant`, `academics-programming>prog_acad_secant()`, `academics-programming>numerical-methods>root-finding>secant-method>prog-secant>prog_acad_secant()`
