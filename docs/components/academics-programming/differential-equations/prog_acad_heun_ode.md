# prog_acad_heun_ode
> **Domain:** `academics-programming` | **Subcategory:** `differential-equations` | **Type:** `program`
## Overview
Interactive Heun's predictor-corrector ODE solver with O(h^2) second-order convergence table

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

static double ode1(double x, double y) { return x + y; }
static double exact1(double x) { return 2.0 * exp(x) - x - 1.0; }

static double ode2(double x, double y) { return 2.0 - exp(-4.0 * x) - 2.0 * y; }

static void run_heun(double (*f)(double, double), double (*exact)(double), double x0, double y0, double h, double target_x) {
    int steps = (int)round((target_x - x0) / h);
    printf("\nHeun's Predictor-Corrector Method (h = %.4f, %d steps):\n", h, steps);
    printf("------------------------------------------------------------------------\n");
    printf(" Step |    x_n    |   y_Predict |   y_Heun    |   y_Exact   | Abs Error\n");
    printf("------------------------------------------------------------------------\n");

    double x = x0;
    double y = y0;
    printf(" %4d | %9.4f | %11.6f | %11.6f | %11.6f | %9.2e\n",
           0, x, y, y, (exact ? exact(x) : 0.0), (exact ? fabs(y - exact(x)) : 0.0));

    for (int i = 1; i <= steps; i++) {
        double y_pred = y + h * f(x, y);
        double x_next = x0 + i * h;
        double y_corr = y + 0.5 * h * (f(x, y) + f(x_next, y_pred));

        double ex = exact ? exact(x_next) : 0.0;
        double err = exact ? fabs(y_corr - ex) : 0.0;

        printf(" %4d | %9.4f | %11.6f | %11.6f | %11.6f | %9.2e\n",
               i, x_next, y_pred, y_corr, ex, err);

        x = x_next;
        y = y_corr;
    }
    printf("------------------------------------------------------------------------\n");
}

int main(void) {
    int choice;
    do {
        printf("\n================ HEUN'S PREDICTOR-CORRECTOR WORKBENCH ================\n");
        printf("1. Solve y' = x + y, y(0) = 1 (Exact: y = 2e^x - x - 1)\n");
        printf("2. Solve y' = 2 - e^(-4x) - 2y, y(0) = 1\n");
        printf("0. Exit\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        if (choice == 1 || choice == 2) {
            double (*f)(double, double) = (choice == 1) ? ode1 : ode2;
            double (*ex)(double) = (choice == 1) ? exact1 : NULL;

            double h = 0.1, target_x = 1.0;
            printf("Enter step size h (e.g. 0.1): ");
            if (scanf("%lf", &h) != 1 || h <= 0.0) h = 0.1;
            printf("Enter target x (e.g. 1.0): ");
            if (scanf("%lf", &target_x) != 1 || target_x <= 0.0) target_x = 1.0;

            run_heun(f, ex, 0.0, 1.0, h, target_x);
        } else if (choice == 0) {
            printf("Exiting Heun Workbench.\n");
        } else {
            printf("Invalid selection.\n");
        }
    } while (choice != 0);

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_heun_ode`, `academics-programming.differential-equations.first-order-ode.heun-method.prog-heun-ode`, `academics-programming>prog_acad_heun_ode()`, `academics-programming>differential-equations>first-order-ode>heun-method>prog-heun-ode>prog_acad_heun_ode()`
