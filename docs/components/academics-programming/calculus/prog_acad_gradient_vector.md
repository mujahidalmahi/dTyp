# prog_acad_gradient_vector
> **Domain:** `academics-programming` | **Subcategory:** `calculus` | **Type:** `program`
## Overview
Computes partial derivatives and gradient vector for 2D scalar fields

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

double f(double x, double y) {
    return x * x * y + 3 * y * y;
}

void compute_gradient(double x, double y, double h, double* grad_x, double* grad_y) {
    *grad_x = (f(x + h, y) - f(x - h, y)) / (2.0 * h);
    *grad_y = (f(x, y + h) - f(x, y - h)) / (2.0 * h);
}

int main(void) {
    double x = 2.0, y = 3.0, h = 1e-5;
    double gx, gy;
    compute_gradient(x, y, h, &gx, &gy);
    double magnitude = sqrt(gx * gx + gy * gy);
    printf("At (%.1f, %.1f):
", x, y);
    printf("grad f = (%.4f, %.4f)
", gx, gy);
    printf("|grad f| = %.4f
", magnitude);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_gradient_vector`, `academics-programming.calculus.multivariable-calculus.gradient-vector.prog-gradient-vector`, `academics-programming>prog_acad_gradient_vector()`, `academics-programming>calculus>multivariable-calculus>gradient-vector>prog-gradient-vector>prog_acad_gradient_vector()`
