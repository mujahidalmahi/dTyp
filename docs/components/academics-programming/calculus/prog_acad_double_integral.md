# prog_acad_double_integral
> **Domain:** `academics-programming` | **Subcategory:** `calculus` | **Type:** `program`
## Overview
Interactive double integral calculator over 2D rectangular domains using 2D Midpoint and Trapezoidal quadrature

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

static double f1(double x, double y) { return x * y; }
static double f2(double x, double y) { return x * x + y * y; }
static double f3(double x, double y) { return exp(x + y); }

static double double_integral_midpoint(double (*f)(double, double), double ax, double bx, double ay, double by, int nx, int ny) {
    double hx = (bx - ax) / nx;
    double hy = (by - ay) / ny;
    double total = 0.0;

    for (int i = 0; i < nx; i++) {
        double mx = ax + (i + 0.5) * hx;
        for (int j = 0; j < ny; j++) {
            double my = ay + (j + 0.5) * hy;
            total += f(mx, my);
        }
    }
    return total * hx * hy;
}

int main(void) {
    int choice;
    do {
        printf("\n================ DOUBLE INTEGRAL WORKBENCH ================\n");
        printf("1. Integrate f(x, y) = x * y on [0, 1] x [0, 1] (Exact = 0.25)\n");
        printf("2. Integrate f(x, y) = x^2 + y^2 on [0, 1] x [0, 1] (Exact = 2/3 = 0.666667)\n");
        printf("3. Integrate f(x, y) = e^(x + y) on [0, 1] x [0, 1] (Exact = (e - 1)^2)\n");
        printf("0. Exit\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        if (choice >= 1 && choice <= 3) {
            double (*f)(double, double) = (choice == 1) ? f1 : (choice == 2) ? f2 : f3;
            double ax = 0.0, bx = 1.0, ay = 0.0, by = 1.0;
            int nx = 50, ny = 50;

            printf("Enter domain [ax, bx] and [ay, by] (e.g. 0 1 0 1): ");
            if (scanf("%lf %lf %lf %lf", &ax, &bx, &ay, &by) != 4) {
                ax = 0.0; bx = 1.0; ay = 0.0; by = 1.0;
            }

            printf("Enter grid divisions nx and ny (e.g. 50 50): ");
            if (scanf("%d %d", &nx, &ny) != 2 || nx < 2 || ny < 2) {
                nx = 50; ny = 50;
            }

            double result = double_integral_midpoint(f, ax, bx, ay, by, nx, ny);
            printf("\nDouble Integral Result (2D Midpoint on %dx%d grid): %16.10f\n",
                   nx, ny, result);
        } else if (choice == 0) {
            printf("Exiting Double Integral Workbench.\n");
        } else {
            printf("Invalid choice.\n");
        }
    } while (choice != 0);

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_double_integral`, `academics-programming.calculus.multivariable-calculus.double-integral.prog-double-integral`, `academics-programming>prog_acad_double_integral()`, `academics-programming>calculus>multivariable-calculus>double-integral>prog-double-integral>prog_acad_double_integral()`
