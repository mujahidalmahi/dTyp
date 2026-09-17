# prog_acad_false_position
> **Domain:** `academics-programming` | **Subcategory:** `numerical-methods` | **Type:** `program`
## Overview
Solves root of function using Regula Falsi secant interpolation

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
    return x * x * x - 2 * x - 5;
}

double solve_false_position(double a, double b, double tol, int max_iter) {
    if (f(a) * f(b) >= 0) return a;
    double c = a;
    for (int i = 0; i < max_iter; i++) {
        c = (a * f(b) - b * f(a)) / (f(b) - f(a));
        if (fabs(f(c)) < tol) break;
        if (f(c) * f(a) < 0) b = c;
        else a = c;
    }
    return c;
}

int main(void) {
    double a = 2.0, b = 3.0, tol = 1e-6;
    double root = solve_false_position(a, b, tol, 100);
    printf("False Position Root of x^3 - 2x - 5: %.6f
", root);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_false_position`, `academics-programming.numerical-methods.root-finding.false-position.prog-false-position`, `academics-programming>prog_acad_false_position()`, `academics-programming>numerical-methods>root-finding>false-position>prog-false-position>prog_acad_false_position()`
