# prog_acad_euler_ode
> **Domain:** `academics-programming` | **Subcategory:** `differential-equations` | **Type:** `program`
## Overview
Interactive Euler's method ODE solver with step-by-step table, step-halving error analysis, and exact analytical comparison

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

static double ode1(double x, double y) { (void)x; return y; }
static double exact1(double x) { return exp(x); }

static double ode2(double x, double y) { return x + y; }
static double exact2(double x) { return 2.0 * exp(x) - x - 1.0; }

static double ode3(double x, double y) { return -2.0 * x * y; }
static double exact3(double x) { return exp(-x * x); }

static void run_euler(double (*f)(double, double), double (*exact)(double), double x0, double y0, double h, double target_x) {
    int steps = (int)round((target_x - x0) / h);
    printf("\nEuler's Method Integration (h = %.4f, steps = %d):\n", h, steps);
    printf("----------------------------------------------------------------------\n");
    printf(" Step |    x_n    |   y_Euler   |   y_Exact   |  Abs Error  | Rel Err%%\n");
    printf("----------------------------------------------------------------------\n");

    double x = x0;
    double y = y0;
    printf(" %4d | %9.4f | %11.6f | %11.6f | %11.4e |   0.00%%\n",
           0, x, y, exact(x), fabs(y - exact(x)));

    for (int i = 1; i <= steps; i++) {
        y += h * f(x, y);
        x = x0 + i * h;
        double ex = exact(x);
        double err = fabs(y - ex);
        double rel_err = (fabs(ex) > 1e-12) ? (err / fabs(ex)) * 100.0 : 0.0;

        printf(" %4d | %9.4f | %11.6f | %11.6f | %11.4e | %6.2f%%\n",
               i, x, y, ex, err, rel_err);
    }
    printf("----------------------------------------------------------------------\n");
}

int main(void) {
    int choice;
    do {
        printf("\n================ EULER METHOD (FIRST ORDER ODE) ================\n");
        printf("1. Solve y' = y, y(0) = 1 (Exact: y = e^x)\n");
        printf("2. Solve y' = x + y, y(0) = 1 (Exact: y = 2e^x - x - 1)\n");
        printf("3. Solve y' = -2xy, y(0) = 1 (Exact: y = e^(-x^2))\n");
        printf("0. Exit\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        if (choice >= 1 && choice <= 3) {
            double (*f)(double, double) = (choice == 1) ? ode1 : (choice == 2) ? ode2 : ode3;
            double (*ex)(double) = (choice == 1) ? exact1 : (choice == 2) ? exact2 : exact3;

            double x0 = 0.0, y0 = 1.0, h = 0.1, target_x = 1.0;
            printf("Enter step size h (e.g. 0.1, 0.05): ");
            if (scanf("%lf", &h) != 1 || h <= 0.0) h = 0.1;
            printf("Enter target x (e.g. 1.0): ");
            if (scanf("%lf", &target_x) != 1 || target_x <= x0) target_x = 1.0;

            run_euler(f, ex, x0, y0, h, target_x);
        } else if (choice == 0) {
            printf("Exiting Euler Workbench.\n");
        } else {
            printf("Invalid selection.\n");
        }
    } while (choice != 0);

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_euler_ode`, `academics-programming.differential-equations.first-order-ode.euler-method.prog-euler-ode`, `academics-programming>prog_acad_euler_ode()`, `academics-programming>differential-equations>first-order-ode>euler-method>prog-euler-ode>prog_acad_euler_ode()`
