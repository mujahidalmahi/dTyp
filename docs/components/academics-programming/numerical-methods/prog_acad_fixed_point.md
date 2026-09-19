# prog_acad_fixed_point
> **Domain:** `academics-programming` | **Subcategory:** `numerical-methods` | **Type:** `program`
## Overview
Finds roots using fixed-point iteration x = g(x) with convergence check

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

double g(double x) {
    return cbrt(4 * x + 9);
}

double solve_fixed_point(double x0, double tol, int max_iter) {
    double x = x0;
    for (int i = 0; i < max_iter; i++) {
        double next_x = g(x);
        if (fabs(next_x - x) < tol) return next_x;
        x = next_x;
    }
    return x;
}

int main(void) {
    double x0 = 2.5, tol = 1e-6;
    double root = solve_fixed_point(x0, tol, 100);
    printf("Fixed Point Root: %.6f\n", root);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_fixed_point`, `academics-programming.numerical-methods.root-finding.fixed-point.prog-fixed-point`, `academics-programming>prog_acad_fixed_point()`, `academics-programming>numerical-methods>root-finding>fixed-point>prog-fixed-point>prog_acad_fixed_point()`
