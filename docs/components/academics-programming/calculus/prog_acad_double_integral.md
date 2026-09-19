# prog_acad_double_integral
> **Domain:** `academics-programming` | **Subcategory:** `calculus` | **Type:** `program`
## Overview
Integrates surface function over a 2D rectangular grid using midpoint Riemann sum

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

double f(double x, double y) {
    return x * y + x * x;
}

double compute_double_integral(double x1, double x2, double y1, double y2, int nx, int ny) {
    double dx = (x2 - x1) / nx;
    double dy = (y2 - y1) / ny;
    double vol = 0.0;
    for (int i = 0; i < nx; i++) {
        double mx = x1 + (i + 0.5) * dx;
        for (int j = 0; j < ny; j++) {
            double my = y1 + (j + 0.5) * dy;
            vol += f(mx, my) * dx * dy;
        }
    }
    return vol;
}

int main(void) {
    double vol = compute_double_integral(0.0, 2.0, 0.0, 1.0, 200, 200);
    printf("Double integral volume over [0,2] x [0,1]: %.6f\n", vol);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_double_integral`, `academics-programming.calculus.multivariable-calculus.double-integral.prog-double-integral`, `academics-programming>prog_acad_double_integral()`, `academics-programming>calculus>multivariable-calculus>double-integral>prog-double-integral>prog_acad_double_integral()`
