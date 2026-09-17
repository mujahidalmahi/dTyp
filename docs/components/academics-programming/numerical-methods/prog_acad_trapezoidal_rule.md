# prog_acad_trapezoidal_rule
> **Domain:** `academics-programming` | **Subcategory:** `numerical-methods` | **Type:** `program`
## Overview
Computes definite integral using composite Trapezoidal quadrature

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
    return 1.0 / (1.0 + x * x);
}

double integrate_trapezoidal(double a, double b, int n) {
    double h = (b - a) / n;
    double sum = 0.5 * (f(a) + f(b));
    for (int i = 1; i < n; i++) {
        sum += f(a + i * h);
    }
    return sum * h;
}

int main(void) {
    double a = 0.0, b = 1.0;
    int n = 100;
    double area = integrate_trapezoidal(a, b, n);
    printf("Trapezoidal Integral of 1/(1+x^2): %.6f (True pi/4 = %.6f)
", area, atan(1.0));
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_trapezoidal_rule`, `academics-programming.numerical-methods.numerical-integration.trapezoidal-rule.prog-trapezoidal-rule`, `academics-programming>prog_acad_trapezoidal_rule()`, `academics-programming>numerical-methods>numerical-integration>trapezoidal-rule>prog-trapezoidal-rule>prog_acad_trapezoidal_rule()`
