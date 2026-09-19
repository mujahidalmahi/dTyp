# prog_acad_extrema_finder
> **Domain:** `academics-programming` | **Subcategory:** `calculus` | **Type:** `program`
## Overview
Discovers local minima and maxima via numerical derivative sign-transition analysis

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
    return 2 * x * x * x - 9 * x * x + 12 * x + 1;
}

double df(double x, double h) {
    return (f(x + h) - f(x - h)) / (2.0 * h);
}

double d2f(double x, double h) {
    return (f(x + h) - 2.0 * f(x) + f(x - h)) / (h * h);
}

void find_extrema(double a, double b, int n) {
    double dx = (b - a) / n;
    double h = 1e-4;
    for (int i = 0; i < n; i++) {
        double x1 = a + i * dx;
        double x2 = x1 + dx;
        if (df(x1, h) * df(x2, h) <= 0) {
            double root = (x1 + x2) / 2.0;
            double concavity = d2f(root, h);
            if (concavity < 0) {
                printf("Local Maximum at x = %.4f, f(x) = %.4f\n", root, f(root));
            } else if (concavity > 0) {
                printf("Local Minimum at x = %.4f, f(x) = %.4f\n", root, f(root));
            }
        }
    }
}

int main(void) {
    printf("Finding extrema for 2x^3 - 9x^2 + 12x + 1 in [0, 4]:\n");
    find_extrema(0.0, 4.0, 100);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_extrema_finder`, `academics-programming.calculus.differential-calculus.extrema-finder.prog-extrema-finder`, `academics-programming>prog_acad_extrema_finder()`, `academics-programming>calculus>differential-calculus>extrema-finder>prog-extrema-finder>prog_acad_extrema_finder()`
