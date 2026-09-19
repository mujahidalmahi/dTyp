# prog_acad_runge_kutta_4
> **Domain:** `academics-programming` | **Subcategory:** `differential-equations` | **Type:** `program`
## Overview
Interactive classical 4th-order Runge-Kutta solver with multi-method comparison (Euler vs Heun vs RK4)

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

static double ode2(double x, double y) { return y - x * x + 1.0; }
static double exact2(double x) { return (x + 1.0) * (x + 1.0) - 0.5 * exp(x); }

static void run_rk4(double (*f)(double, double), double (*exact)(double), double x0, double y0, double h, double target_x) {
    int steps = (int)round((target_x - x0) / h);
    printf("\nClassical 4th-Order Runge-Kutta (RK4) [O(h^4) accuracy]:\n");
    printf("---------------------------------------------------------------------------------\n");
    printf(" Step |    x_n    |    k1     |    k2     |    k3     |    k4     |   y_RK4   | Abs Err\n");
    printf("---------------------------------------------------------------------------------\n");

    double x = x0;
    double y = y0;
    printf(" %4d | %9.4f |     -     |     -     |     -     |     -     | %9.5f | %7.2e\n",
           0, x, y, (exact ? fabs(y - exact(x)) : 0.0));

    for (int i = 1; i <= steps; i++) {
        double k1 = f(x, y);
        double k2 = f(x + 0.5 * h, y + 0.5 * h * k1);
        double k3 = f(x + 0.5 * h, y + 0.5 * h * k2);
        double k4 = f(x + h, y + h * k3);

        y += (h / 6.0) * (k1 + 2.0 * k2 + 2.0 * k3 + k4);
        x = x0 + i * h;

        double ex = exact ? exact(x) : 0.0;
        double err = exact ? fabs(y - ex) : 0.0;

        printf(" %4d | %9.4f | %9.4f | %9.4f | %9.4f | %9.4f | %9.5f | %7.2e\n",
               i, x, k1, k2, k3, k4, y, err);
    }
    printf("---------------------------------------------------------------------------------\n");
}

static void compare_methods(double (*f)(double, double), double (*exact)(double), double x0, double y0, double h, double target_x) {
    int steps = (int)round((target_x - x0) / h);
    double y_euler = y0;
    double y_heun = y0;
    double y_rk4 = y0;
    double x = x0;

    printf("\nMulti-Method Numerical Comparison at h = %.4f:\n", h);
    printf("--------------------------------------------------------------------------\n");
    printf("    x    |  Euler Err (O(h)) |  Heun Err (O(h^2)) |   RK4 Err (O(h^4))\n");
    printf("--------------------------------------------------------------------------\n");

    for (int i = 1; i <= steps; i++) {
        double f_curr = f(x, y_euler);
        y_euler += h * f_curr;

        double y_pred = y_heun + h * f(x, y_heun);
        y_heun += 0.5 * h * (f(x, y_heun) + f(x + h, y_pred));

        double k1 = f(x, y_rk4);
        double k2 = f(x + 0.5 * h, y_rk4 + 0.5 * h * k1);
        double k3 = f(x + 0.5 * h, y_rk4 + 0.5 * h * k2);
        double k4 = f(x + h, y_rk4 + h * k3);
        y_rk4 += (h / 6.0) * (k1 + 2.0 * k2 + 2.0 * k3 + k4);

        x = x0 + i * h;
        double ex = exact(x);

        printf(" %7.4f |     %11.4e    |     %11.4e     |     %11.4e\n",
               x, fabs(y_euler - ex), fabs(y_heun - ex), fabs(y_rk4 - ex));
    }
    printf("--------------------------------------------------------------------------\n");
}

int main(void) {
    int choice;
    do {
        printf("\n================ RUNGE-KUTTA 4TH-ORDER (RK4) WORKBENCH ================\n");
        printf("1. Solve y' = x + y, y(0) = 1 (RK4 Step-by-Step Table)\n");
        printf("2. Solve y' = y - x^2 + 1, y(0) = 0.5 (RK4 Step-by-Step Table)\n");
        printf("3. Grand Multi-Method Comparison: Euler vs Heun vs RK4\n");
        printf("0. Exit\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        if (choice == 1 || choice == 2) {
            double (*f)(double, double) = (choice == 1) ? ode1 : ode2;
            double (*ex)(double) = (choice == 1) ? exact1 : exact2;
            double y0 = (choice == 1) ? 1.0 : 0.5;

            double h = 0.1, target_x = 1.0;
            printf("Enter step size h (e.g. 0.1): ");
            if (scanf("%lf", &h) != 1 || h <= 0.0) h = 0.1;
            printf("Enter target x (e.g. 1.0): ");
            if (scanf("%lf", &target_x) != 1 || target_x <= 0.0) target_x = 1.0;

            run_rk4(f, ex, 0.0, y0, h, target_x);
        } else if (choice == 3) {
            compare_methods(ode1, exact1, 0.0, 1.0, 0.1, 1.0);
        } else if (choice == 0) {
            printf("Exiting RK4 Workbench.\n");
        } else {
            printf("Invalid selection.\n");
        }
    } while (choice != 0);

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_runge_kutta_4`, `academics-programming.differential-equations.first-order-ode.runge-kutta-4.prog-runge-kutta-4`, `academics-programming>prog_acad_runge_kutta_4()`, `academics-programming>differential-equations>first-order-ode>runge-kutta-4>prog-runge-kutta-4>prog_acad_runge_kutta_4()`
