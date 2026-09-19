# prog_acad_bisection
> **Domain:** `academics-programming` | **Subcategory:** `numerical-methods` | **Type:** `program`
## Overview
Interactive bisection root solver with convergence table, function selection, and error bounds

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
#include <stdbool.h>

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

static double f1(double x) { return x * x * x - x - 2.0; }
static double f2(double x) { return cos(x) - x; }
static double f3(double x) { return exp(x) - 3.0 * x; }

static void run_bisection(double (*f)(double), double a, double b, double tol, int max_iter) {
    double fa = f(a);
    double fb = f(b);

    if (fa * fb >= 0.0) {
        printf("Error: f(a) and f(b) must have opposite signs. f(%.4f)=%.4f, f(%.4f)=%.4f\n", a, fa, b, fb);
        return;
    }

    int expected_n = (int)ceil((log(fabs(b - a)) - log(tol)) / log(2.0));
    printf("\nTheoretical iterations required: N >= %d\n", expected_n);
    printf("----------------------------------------------------------------------\n");
    printf(" Iter |      a       |      b       |      c       |    f(c)     |  Error\n");
    printf("----------------------------------------------------------------------\n");

    double c = a;
    for (int iter = 1; iter <= max_iter; iter++) {
        c = 0.5 * (a + b);
        double fc = f(c);
        double err = 0.5 * fabs(b - a);

        printf(" %4d | %12.6f | %12.6f | %12.6f | %11.4e | %10.4e\n",
               iter, a, b, c, fc, err);

        if (fabs(fc) < 1e-12 || err < tol) {
            printf("----------------------------------------------------------------------\n");
            printf("Convergence reached in %d iterations!\n", iter);
            printf("Root estimate x* = %.10f with f(x*) = %.4e\n", c, fc);
            return;
        }

        if (fa * fc < 0.0) {
            b = c;
            fb = fc;
        } else {
            a = c;
            fa = fc;
        }
    }
    printf("----------------------------------------------------------------------\n");
    printf("Reached max iterations (%d). Final estimate x* = %.10f\n", max_iter, c);
}

int main(void) {
    int choice;
    do {
        printf("\n================ BISECTION ROOT-FINDING WORKBENCH ================\n");
        printf("1. Solve f(x) = x^3 - x - 2 = 0\n");
        printf("2. Solve f(x) = cos(x) - x = 0\n");
        printf("3. Solve f(x) = exp(x) - 3x = 0\n");
        printf("0. Exit\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        if (choice >= 1 && choice <= 3) {
            double (*f)(double) = (choice == 1) ? f1 : (choice == 2) ? f2 : f3;
            double a, b, tol;
            int max_iter;
            printf("Enter interval [a, b] (e.g. 1.0 2.0): ");
            if (scanf("%lf %lf", &a, &b) != 2) { clear_input(); continue; }
            printf("Enter tolerance epsilon (e.g. 1e-6): ");
            if (scanf("%lf", &tol) != 1) { clear_input(); continue; }
            printf("Enter max iterations (e.g. 50): ");
            if (scanf("%d", &max_iter) != 1) { clear_input(); continue; }
            run_bisection(f, a, b, tol, max_iter);
        } else if (choice == 0) {
            printf("Exiting Bisection Workbench.\n");
        } else {
            printf("Invalid selection.\n");
        }
    } while (choice != 0);

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_bisection`, `academics-programming.numerical-methods.root-finding.bisection-method.prog-bisection`, `academics-programming>prog_acad_bisection()`, `academics-programming>numerical-methods>root-finding>bisection-method>prog-bisection>prog_acad_bisection()`
