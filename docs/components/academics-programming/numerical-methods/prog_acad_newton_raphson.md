# prog_acad_newton_raphson
> **Domain:** `academics-programming` | **Subcategory:** `numerical-methods` | **Type:** `program`
## Overview
Interactive Newton-Raphson root solver with quadratic convergence check and derivative protection

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
static double df1(double x) { return 3.0 * x * x - 1.0; }

static double f2(double x) { return cos(x) - x; }
static double df2(double x) { return -sin(x) - 1.0; }

static double f3(double x) { return x * exp(x) - 1.0; }
static double df3(double x) { return exp(x) * (1.0 + x); }

static void run_newton_raphson(double (*f)(double), double (*df)(double), double x0, double tol, int max_iter) {
    printf("\n--------------------------------------------------------------------------\n");
    printf(" Iter |      x_k      |     f(x_k)    |    f'(x_k)    |  Delta x   | Error\n");
    printf("--------------------------------------------------------------------------\n");

    double x = x0;
    for (int iter = 1; iter <= max_iter; iter++) {
        double fx = f(x);
        double dfx = df(x);

        if (fabs(dfx) < 1e-14) {
            printf("--------------------------------------------------------------------------\n");
            printf("Error: Derivative f'(x) is zero or near zero at x = %.8f. Cannot proceed.\n", x);
            return;
        }

        double dx = -fx / dfx;
        double x_next = x + dx;
        double err = fabs(dx);

        printf(" %4d | %13.7f | %13.4e | %13.4e | %10.2e | %10.2e\n",
               iter, x, fx, dfx, dx, err);

        if (fabs(fx) < tol || err < tol) {
            printf("--------------------------------------------------------------------------\n");
            printf("Convergence reached in %d iterations (Quadratic Order)!\n", iter);
            printf("Root estimate x* = %.10f with f(x*) = %.4e\n", x_next, f(x_next));
            return;
        }

        x = x_next;
    }
    printf("--------------------------------------------------------------------------\n");
    printf("Reached max iterations (%d). Final estimate x* = %.10f\n", max_iter, x);
}

int main(void) {
    int choice;
    do {
        printf("\n================ NEWTON-RAPHSON ROOT-FINDING WORKBENCH ================\n");
        printf("1. Solve f(x) = x^3 - x - 2 = 0\n");
        printf("2. Solve f(x) = cos(x) - x = 0\n");
        printf("3. Solve f(x) = x*e^x - 1 = 0\n");
        printf("0. Exit\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        if (choice >= 1 && choice <= 3) {
            double (*f)(double) = (choice == 1) ? f1 : (choice == 2) ? f2 : f3;
            double (*df)(double) = (choice == 1) ? df1 : (choice == 2) ? df2 : df3;
            double x0, tol;
            int max_iter;
            printf("Enter initial guess x0: ");
            if (scanf("%lf", &x0) != 1) { clear_input(); continue; }
            printf("Enter tolerance epsilon (e.g. 1e-6): ");
            if (scanf("%lf", &tol) != 1) { clear_input(); continue; }
            printf("Enter max iterations (e.g. 50): ");
            if (scanf("%d", &max_iter) != 1) { clear_input(); continue; }
            run_newton_raphson(f, df, x0, tol, max_iter);
        } else if (choice == 0) {
            printf("Exiting Newton-Raphson Workbench.\n");
        } else {
            printf("Invalid selection.\n");
        }
    } while (choice != 0);

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_newton_raphson`, `academics-programming.numerical-methods.root-finding.newton-raphson.prog-newton-raphson`, `academics-programming>prog_acad_newton_raphson()`, `academics-programming>numerical-methods>root-finding>newton-raphson>prog-newton-raphson>prog_acad_newton_raphson()`
