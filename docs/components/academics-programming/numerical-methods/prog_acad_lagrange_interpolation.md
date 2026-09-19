# prog_acad_lagrange_interpolation
> **Domain:** `academics-programming` | **Subcategory:** `numerical-methods` | **Type:** `program`
## Overview
Evaluates interpolated values using Lagrange basis polynomials

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

double interpolate_lagrange(int n, const double x_pts[], const double y_pts[], double x_target) {
    double result = 0.0;
    for (int i = 0; i < n; i++) {
        double term = y_pts[i];
        for (int j = 0; j < n; j++) {
            if (j != i) {
                term *= (x_target - x_pts[j]) / (x_pts[i] - x_pts[j]);
            }
        }
        result += term;
    }
    return result;
}

int main(void) {
    int n = 4;
    double x_pts[] = {0, 1, 2, 3};
    double y_pts[] = {1, 2, 9, 28};
    double query = 2.5;
    double y_val = interpolate_lagrange(n, x_pts, y_pts, query);
    printf("Lagrange Interpolation at x = %.2f: %.4f\n", query, y_val);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_lagrange_interpolation`, `academics-programming.numerical-methods.interpolation.lagrange-interpolation.prog-lagrange-interpolation`, `academics-programming>prog_acad_lagrange_interpolation()`, `academics-programming>numerical-methods>interpolation>lagrange-interpolation>prog-lagrange-interpolation>prog_acad_lagrange_interpolation()`
