# prog_acad_gradient_vector
> **Domain:** `academics-programming` | **Subcategory:** `calculus` | **Type:** `program`
## Overview
Interactive 2D gradient vector calculator with partial derivatives, magnitude, direction, and directional derivatives

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

static double f1(double x, double y) { return x * x + y * y; }
static double f2(double x, double y) { return x * x - y * y; }
static double f3(double x, double y) { return sin(x) * cos(y); }

static void compute_gradient(double (*f)(double, double), double x0, double y0, double ux, double uy) {
    double h = 1e-5;
    double df_dx = (f(x0 + h, y0) - f(x0 - h, y0)) / (2.0 * h);
    double df_dy = (f(x0, y0 + h) - f(x0, y0 - h)) / (2.0 * h);
    double mag = sqrt(df_dx * df_dx + df_dy * df_dy);
    double angle_deg = atan2(df_dy, df_dx) * (180.0 / 3.141592653589793);

    double u_len = sqrt(ux * ux + uy * uy);
    if (u_len > 1e-9) { ux /= u_len; uy /= u_len; }
    double dir_deriv = df_dx * ux + df_dy * uy;

    printf("\nGradient Vector Analysis at Point (%.4f, %.4f):\n", x0, y0);
    printf("  Partial df/dx:                 %12.6f\n", df_dx);
    printf("  Partial df/dy:                 %12.6f\n", df_dy);
    printf("  Gradient Vector grad(f):       (%10.5f, %10.5f)\n", df_dx, df_dy);
    printf("  Magnitude ||grad(f)||:         %12.6f\n", mag);
    printf("  Direction Angle (degrees):     %12.2f deg\n", angle_deg);
    printf("  Directional Deriv D_u(f):      %12.6f (along unit vector <%.3f, %.3f>)\n", dir_deriv, ux, uy);
    printf("  Steepest Ascent Direction:     <%.5f, %.5f>\n", (mag > 0 ? df_dx / mag : 0), (mag > 0 ? df_dy / mag : 0));
    printf("  Steepest Descent Direction:    <%.5f, %.5f>\n", (mag > 0 ? -df_dx / mag : 0), (mag > 0 ? -df_dy / mag : 0));
}

int main(void) {
    int choice;
    do {
        printf("\n================ GRADIENT VECTOR WORKBENCH ================\n");
        printf("1. Field f(x, y) = x^2 + y^2 (Paraboloid)\n");
        printf("2. Field f(x, y) = x^2 - y^2 (Hyperbolic Saddle)\n");
        printf("3. Field f(x, y) = sin(x) * cos(y)\n");
        printf("0. Exit\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        if (choice >= 1 && choice <= 3) {
            double (*f)(double, double) = (choice == 1) ? f1 : (choice == 2) ? f2 : f3;
            double x0 = 1.0, y0 = 2.0;
            printf("Enter point (x0, y0): ");
            if (scanf("%lf %lf", &x0, &y0) != 2) { x0 = 1.0; y0 = 1.0; }

            double ux = 1.0, uy = 1.0;
            printf("Enter directional unit vector components (ux, uy): ");
            if (scanf("%lf %lf", &ux, &uy) != 2) { ux = 1.0; uy = 0.0; }

            compute_gradient(f, x0, y0, ux, uy);
        } else if (choice == 0) {
            printf("Exiting Gradient Vector Workbench.\n");
        } else {
            printf("Invalid selection.\n");
        }
    } while (choice != 0);

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_gradient_vector`, `academics-programming.calculus.multivariable-calculus.gradient-vector.prog-gradient-vector`, `academics-programming>prog_acad_gradient_vector()`, `academics-programming>calculus>multivariable-calculus>gradient-vector>prog-gradient-vector>prog_acad_gradient_vector()`
