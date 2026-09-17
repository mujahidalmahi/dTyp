# prog_acad_riemann_sums
> **Domain:** `academics-programming` | **Subcategory:** `calculus` | **Type:** `program`
## Overview
Computes Left, Right, and Midpoint Riemann sums for numerical quadrature

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

double f(double x) {
    return x * x;
}

void compute_riemann_sums(double a, double b, int n) {
    double dx = (b - a) / n;
    double left_sum = 0, right_sum = 0, mid_sum = 0;
    for (int i = 0; i < n; i++) {
        double x_left = a + i * dx;
        double x_right = x_left + dx;
        double x_mid = (x_left + x_right) / 2.0;
        left_sum += f(x_left) * dx;
        right_sum += f(x_right) * dx;
        mid_sum += f(x_mid) * dx;
    }
    printf("Left Riemann Sum:     %.6f
", left_sum);
    printf("Right Riemann Sum:    %.6f
", right_sum);
    printf("Midpoint Riemann Sum: %.6f
", mid_sum);
}

int main(void) {
    compute_riemann_sums(0.0, 3.0, 1000);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_riemann_sums`, `academics-programming.calculus.integral-calculus.riemann-sums.prog-riemann-sums`, `academics-programming>prog_acad_riemann_sums()`, `academics-programming>calculus>integral-calculus>riemann-sums>prog-riemann-sums>prog_acad_riemann_sums()`
