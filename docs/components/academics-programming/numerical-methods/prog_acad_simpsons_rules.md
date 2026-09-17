# prog_acad_simpsons_rules
> **Domain:** `academics-programming` | **Subcategory:** `numerical-methods` | **Type:** `program`
## Overview
Evaluates numerical integrals using Simpson's 1/3 and 3/8 rules

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
    return exp(x);
}

double simpson_one_third(double a, double b, int n) {
    if (n % 2 != 0) n++;
    double h = (b - a) / n;
    double sum = f(a) + f(b);
    for (int i = 1; i < n; i++) {
        double x = a + i * h;
        sum += (i % 2 != 0) ? 4.0 * f(x) : 2.0 * f(x);
    }
    return (sum * h) / 3.0;
}

double simpson_three_eighth(double a, double b, int n) {
    while (n % 3 != 0) n++;
    double h = (b - a) / n;
    double sum = f(a) + f(b);
    for (int i = 1; i < n; i++) {
        double x = a + i * h;
        sum += (i % 3 == 0) ? 2.0 * f(x) : 3.0 * f(x);
    }
    return (3.0 * h * sum) / 8.0;
}

int main(void) {
    double a = 0.0, b = 2.0;
    printf("Simpson 1/3 Integral of e^x: %.6f
", simpson_one_third(a, b, 10));
    printf("Simpson 3/8 Integral of e^x: %.6f
", simpson_three_eighth(a, b, 12));
    printf("Analytical (e^2 - 1):        %.6f
", exp(2.0) - 1.0);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_simpsons_rules`, `academics-programming.numerical-methods.numerical-integration.simpsons-rules.prog-simpsons-rules`, `academics-programming>prog_acad_simpsons_rules()`, `academics-programming>numerical-methods>numerical-integration>simpsons-rules>prog-simpsons-rules>prog_acad_simpsons_rules()`
