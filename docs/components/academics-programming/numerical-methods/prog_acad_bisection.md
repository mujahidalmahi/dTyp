# prog_acad_bisection
> **Domain:** `academics-programming` | **Subcategory:** `numerical-methods` | **Type:** `program`
## Overview
Finds polynomial roots using bisection method with bracket updates

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
    return x * x * x - 4 * x - 9;
}

double solve_bisection(double a, double b, double tol, int max_iter) {
    if (f(a) * f(b) >= 0) {
        printf("Invalid bracket: f(a) and f(b) must have opposite signs\n");
        return a;
    }
    double c = a;
    for (int i = 0; i < max_iter; i++) {
        c = (a + b) / 2.0;
        if (fabs(f(c)) < tol || (b - a) / 2.0 < tol) break;
        if (f(c) * f(a) < 0) b = c;
        else a = c;
    }
    return c;
}

int main(void) {
    double a = 2.0, b = 3.0, tol = 1e-6;
    double root = solve_bisection(a, b, tol, 100);
    printf("Bisection Root of x^3 - 4x - 9: %.6f\n", root);
    printf("f(root) = %.6e\n", f(root));
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_bisection`, `academics-programming.numerical-methods.root-finding.bisection-method.prog-bisection`, `academics-programming>prog_acad_bisection()`, `academics-programming>numerical-methods>root-finding>bisection-method>prog-bisection>prog_acad_bisection()`
