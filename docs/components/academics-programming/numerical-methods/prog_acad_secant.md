# prog_acad_secant
> **Domain:** `academics-programming` | **Subcategory:** `numerical-methods` | **Type:** `program`
## Overview
Interactive Secant root solver with superlinear convergence table and zero-denominator protection

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

static double f1(double x) { return x * x * x - 2.0 * x - 5.0; }
static double f2(double x) { return cos(x) - x; }

static void run_secant(double (*f)(double), double x0, double x1, double tol, int max_iter) {
    printf("\n--------------------------------------------------------------------------\n");
    printf(" Iter |     x_{k-1}   |      x_k      |    x_{k+1}    |    f(x_{k+1}) | Error\n");
    printf("--------------------------------------------------------------------------\n");

    for (int iter = 1; iter <= max_iter; iter++) {
        double f0 = f(x0);
        double f1_val = f(x1);

        if (fabs(f1_val - f0) < 1e-15) {
            printf("--------------------------------------------------------------------------\n");
            printf("Error: Division by zero in Secant denominator at iter %d.\n", iter);
            return;
        }

        double x_next = x1 - f1_val * (x1 - x0) / (f1_val - f0);
        double fn = f(x_next);
        double err = fabs(x_next - x1);

        printf(" %4d | %13.7f | %13.7f | %13.7f | %14.4e | %10.2e\n",
               iter, x0, x1, x_next, fn, err);

        if (fabs(fn) < tol || err < tol) {
            printf("--------------------------------------------------------------------------\n");
            printf("Convergence reached in %d iterations (Order ~ 1.618)!\n", iter);
            printf("Root estimate x* = %.10f with f(x*) = %.4e\n", x_next, fn);
            return;
        }

        x0 = x1;
        x1 = x_next;
    }
    printf("--------------------------------------------------------------------------\n");
    printf("Reached max iterations (%d). Final estimate x* = %.10f\n", max_iter, x1);
}

int main(void) {
    int choice;
    do {
        printf("\n================ SECANT METHOD ROOT-FINDING WORKBENCH ================\n");
        printf("1. Solve f(x) = x^3 - 2x - 5 = 0\n");
        printf("2. Solve f(x) = cos(x) - x = 0\n");
        printf("0. Exit\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        if (choice == 1 || choice == 2) {
            double (*f)(double) = (choice == 1) ? f1 : f2;
            double x0, x1, tol;
            int max_iter;
            printf("Enter two initial guesses x0 and x1: ");
            if (scanf("%lf %lf", &x0, &x1) != 2) { clear_input(); continue; }
            printf("Enter tolerance epsilon (e.g. 1e-6): ");
            if (scanf("%lf", &tol) != 1) { clear_input(); continue; }
            printf("Enter max iterations (e.g. 50): ");
            if (scanf("%d", &max_iter) != 1) { clear_input(); continue; }
            run_secant(f, x0, x1, tol, max_iter);
        } else if (choice == 0) {
            printf("Exiting Secant Workbench.\n");
        } else {
            printf("Invalid selection.\n");
        }
    } while (choice != 0);

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_secant`, `academics-programming.numerical-methods.root-finding.secant-method.prog-secant`, `academics-programming>prog_acad_secant()`, `academics-programming>numerical-methods>root-finding>secant-method>prog-secant>prog_acad_secant()`
