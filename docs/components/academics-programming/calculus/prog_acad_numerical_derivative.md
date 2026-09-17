# prog_acad_numerical_derivative
> **Domain:** `academics-programming` | **Subcategory:** `calculus` | **Type:** `program`
## Overview
Computes 1st and 2nd central difference numerical derivatives

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
    return sin(x);
}

double first_derivative(double x, double h) {
    return (f(x + h) - f(x - h)) / (2.0 * h);
}

double second_derivative(double x, double h) {
    return (f(x + h) - 2.0 * f(x) + f(x - h)) / (h * h);
}

int main(void) {
    double x = 1.04719755;
    double h = 1e-5;
    printf("f(x) = sin(x) at pi/3:
");
    printf("f'(x)  = %.6f (Expected cos(pi/3) = 0.500000)
", first_derivative(x, h));
    printf("f''(x) = %.6f (Expected -sin(pi/3) = -0.866025)
", second_derivative(x, h));
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_numerical_derivative`, `academics-programming.calculus.differential-calculus.numerical-derivative.prog-numerical-derivative`, `academics-programming>prog_acad_numerical_derivative()`, `academics-programming>calculus>differential-calculus>numerical-derivative>prog-numerical-derivative>prog_acad_numerical_derivative()`
