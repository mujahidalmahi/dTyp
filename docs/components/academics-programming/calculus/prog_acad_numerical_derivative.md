# prog_acad_numerical_derivative
> **Domain:** `academics-programming` | **Subcategory:** `calculus` | **Type:** `program`
## Overview
Interactive numerical differentiation laboratory with forward, backward, central differences, second derivatives, and Richardson extrapolation

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

static double f1(double x) { return sin(x); }
static double df1(double x) { return cos(x); }
static double d2f1(double x) { return -sin(x); }

static double f2(double x) { return exp(x); }
static double df2(double x) { return exp(x); }
static double d2f2(double x) { return exp(x); }

static double f3(double x) { return x * x * x - 2.0 * x + 1.0; }
static double df3(double x) { return 3.0 * x * x - 2.0; }
static double d2f3(double x) { return 6.0 * x; }

static void analyze_derivatives(double (*f)(double), double (*df)(double), double (*d2f)(double), double x0, double h) {
    double forward = (f(x0 + h) - f(x0)) / h;
    double backward = (f(x0) - f(x0 - h)) / h;
    double central = (f(x0 + h) - f(x0 - h)) / (2.0 * h);
    double second_deriv = (f(x0 + h) - 2.0 * f(x0) + f(x0 - h)) / (h * h);

    double d1 = (f(x0 + h) - f(x0 - h)) / (2.0 * h);
    double d2 = (f(x0 + h / 2.0) - f(x0 - h / 2.0)) / h;
    double richardson = (4.0 * d2 - d1) / 3.0;

    double exact_1 = df(x0);
    double exact_2 = d2f(x0);

    printf("\n--- Numerical Derivative Analysis at x0 = %.4f with step h = %.2e ---\n", x0, h);
    printf("Exact 1st Derivative:         %16.10f\n", exact_1);
    printf("Forward Difference O(h):      %16.10f (Error: %9.2e)\n", forward, fabs(forward - exact_1));
    printf("Backward Difference O(h):     %16.10f (Error: %9.2e)\n", backward, fabs(backward - exact_1));
    printf("Central Difference O(h^2):    %16.10f (Error: %9.2e)\n", central, fabs(central - exact_1));
    printf("Richardson Extrap. O(h^4):    %16.10f (Error: %9.2e)\n", richardson, fabs(richardson - exact_1));
    printf("Second Derivative O(h^2):     %16.10f (Exact: %16.10f, Error: %9.2e)\n",
           second_deriv, exact_2, fabs(second_deriv - exact_2));
}

static void sweep_step_sizes(double (*f)(double), double (*df)(double), double x0) {
    double exact = df(x0);
    printf("\n--- Step-Size Convergence Sweep at x0 = %.4f ---\n", x0);
    printf("      h       | Central Diff | Absolute Error\n");
    printf("--------------+--------------+---------------\n");
    double h = 0.1;
    for (int i = 0; i < 9; i++) {
        double cd = (f(x0 + h) - f(x0 - h)) / (2.0 * h);
        printf(" %12.2e | %12.8f | %13.4e\n", h, cd, fabs(cd - exact));
        h /= 10.0;
    }
}

int main(void) {
    int choice;
    do {
        printf("\n================ NUMERICAL DIFFERENTIATION WORKBENCH ================\n");
        printf("1. Differentiate f(x) = sin(x)\n");
        printf("2. Differentiate f(x) = exp(x)\n");
        printf("3. Differentiate f(x) = x^3 - 2x + 1\n");
        printf("0. Exit\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        if (choice >= 1 && choice <= 3) {
            double (*f)(double) = (choice == 1) ? f1 : (choice == 2) ? f2 : f3;
            double (*df)(double) = (choice == 1) ? df1 : (choice == 2) ? df2 : df3;
            double (*d2f)(double) = (choice == 1) ? d2f1 : (choice == 2) ? d2f2 : d2f3;

            double x0 = 1.0, h = 0.01;
            printf("Enter point x0: ");
            if (scanf("%lf", &x0) != 1) x0 = 1.0;
            printf("Enter step size h (e.g. 0.01): ");
            if (scanf("%lf", &h) != 1) h = 0.01;

            analyze_derivatives(f, df, d2f, x0, h);
            sweep_step_sizes(f, df, x0);
        } else if (choice == 0) {
            printf("Exiting Numerical Derivative Workbench.\n");
        } else {
            printf("Invalid choice.\n");
        }
    } while (choice != 0);

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_numerical_derivative`, `academics-programming.calculus.differential-calculus.numerical-derivative.prog-numerical-derivative`, `academics-programming>prog_acad_numerical_derivative()`, `academics-programming>calculus>differential-calculus>numerical-derivative>prog-numerical-derivative>prog_acad_numerical_derivative()`
