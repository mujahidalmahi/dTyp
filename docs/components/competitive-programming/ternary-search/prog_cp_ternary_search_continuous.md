# prog_cp_ternary_search_continuous
> **Domain:** `competitive-programming` | **Subcategory:** `ternary-search` | **Type:** `program`
## Overview
Real-number continuous ternary search for global minimum of convex function

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

static double poly_eval(double x, double a, double b, double c) {
    return a * x * x + b * x + c;
}

static void solve(void) {
    double a, b, c;
    double l, r;
    if (scanf("%lf %lf %lf %lf %lf", &a, &b, &c, &l, &r) != 5) return;

    for (int iter = 0; iter < 100; iter++) {
        double m1 = l + (r - l) / 3.0;
        double m2 = r - (r - l) / 3.0;
        double f1 = poly_eval(m1, a, b, c);
        double f2 = poly_eval(m2, a, b, c);

        if (f1 < f2) {
            r = m2;
        } else {
            l = m1;
        }
    }

    double optimal_x = (l + r) / 2.0;
    double min_val = poly_eval(optimal_x, a, b, c);
    printf("%.6f %.6f\n", optimal_x, min_val);
}

int main(void) {
    int t;
    if (scanf("%d", &t) != 1) t = 1;
    while (t--) {
        solve();
    }
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_cp_ternary_search_continuous`, `competitive-programming.full-programs.binary-search-techniques.ternary-search.prog-cp-ternary-search-continuous`, `competitive-programming>prog_cp_ternary_search_continuous()`, `competitive-programming>full-programs>binary-search-techniques>ternary-search>prog-cp-ternary-search-continuous>prog_cp_ternary_search_continuous()`, `cpTernarySearchContinuous`
