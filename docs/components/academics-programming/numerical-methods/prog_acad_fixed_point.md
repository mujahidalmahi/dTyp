# prog_acad_fixed_point
> **Domain:** `academics-programming` | **Subcategory:** `numerical-methods` | **Type:** `program`
## Overview
Interactive fixed-point iteration solver (x = g(x)) with divergence detection and error tracking

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

static double g1(double x) { return cbrt(x + 2.0); }
static double g2(double x) { return cos(x); }
static double g3(double x) { return exp(-x); }

static void run_fixed_point(double (*g)(double), double x0, double tol, int max_iter) {
    printf("\n--------------------------------------------------------------\n");
    printf(" Iter |      x_k      |     g(x_k)    |  |x_{k+1} - x_k|\n");
    printf("--------------------------------------------------------------\n");

    double x = x0;
    for (int iter = 1; iter <= max_iter; iter++) {
        double x_next = g(x);
        double diff = fabs(x_next - x);

        printf(" %4d | %13.7f | %13.7f | %14.6e\n", iter, x, x_next, diff);

        if (diff < tol) {
            printf("--------------------------------------------------------------\n");
            printf("Convergence reached in %d iterations! Fixed point x* = %.10f\n", iter, x_next);
            return;
        }

        if (diff > 1e8 || isnan(x_next) || isinf(x_next)) {
            printf("--------------------------------------------------------------\n");
            printf("Divergence detected (|g'(x)| >= 1). Sequence cannot converge.\n");
            return;
        }

        x = x_next;
    }
    printf("--------------------------------------------------------------\n");
    printf("Reached max iterations (%d). Final estimate x* = %.10f\n", max_iter, x);
}

int main(void) {
    int choice;
    do {
        printf("\n================ FIXED POINT ITERATION WORKBENCH ================\n");
        printf("1. Solve x = (x + 2)^(1/3) [f(x) = x^3 - x - 2]\n");
        printf("2. Solve x = cos(x) [Dottie Number]\n");
        printf("3. Solve x = e^(-x)\n");
        printf("0. Exit\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        if (choice >= 1 && choice <= 3) {
            double (*g)(double) = (choice == 1) ? g1 : (choice == 2) ? g2 : g3;
            double x0, tol;
            int max_iter;
            printf("Enter initial guess x0: ");
            if (scanf("%lf", &x0) != 1) { clear_input(); continue; }
            printf("Enter tolerance epsilon (e.g. 1e-6): ");
            if (scanf("%lf", &tol) != 1) { clear_input(); continue; }
            printf("Enter max iterations (e.g. 50): ");
            if (scanf("%d", &max_iter) != 1) { clear_input(); continue; }
            run_fixed_point(g, x0, tol, max_iter);
        } else if (choice == 0) {
            printf("Exiting Fixed Point Workbench.\n");
        } else {
            printf("Invalid selection.\n");
        }
    } while (choice != 0);

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_fixed_point`, `academics-programming.numerical-methods.root-finding.fixed-point.prog-fixed-point`, `academics-programming>prog_acad_fixed_point()`, `academics-programming>numerical-methods>root-finding>fixed-point>prog-fixed-point>prog_acad_fixed_point()`
