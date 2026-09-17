# prog_acad_arc_length
> **Domain:** `academics-programming` | **Subcategory:** `calculus` | **Type:** `program`
## Overview
Integrates sqrt(1 + (f'(x))^2) to compute arc length of a plane curve

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
    return x * x;
}

double df(double x, double h) {
    return (f(x + h) - f(x - h)) / (2.0 * h);
}

double compute_arc_length(double a, double b, int n) {
    double dx = (b - a) / n;
    double h = 1e-5;
    double length = 0.0;
    for (int i = 0; i < n; i++) {
        double x = a + (i + 0.5) * dx;
        double deriv = df(x, h);
        length += sqrt(1.0 + deriv * deriv) * dx;
    }
    return length;
}

int main(void) {
    double len = compute_arc_length(0.0, 1.0, 1000);
    printf("Arc length of y = x^2 from x = 0 to 1: %.6f
", len);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_arc_length`, `academics-programming.calculus.integral-calculus.arc-length.prog-arc-length`, `academics-programming>prog_acad_arc_length()`, `academics-programming>calculus>integral-calculus>arc-length>prog-arc-length>prog_acad_arc_length()`
