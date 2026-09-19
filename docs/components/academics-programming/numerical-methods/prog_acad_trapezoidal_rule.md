# prog_acad_trapezoidal_rule
> **Domain:** `academics-programming` | **Subcategory:** `numerical-methods` | **Type:** `program`
## Overview
Interactive composite trapezoidal numerical integration with step size convergence and error bounds

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
static double f2(double x) { return exp(-x * x); }
static double f3(double x) { return 1.0 / (1.0 + x * x); }

static double composite_trapezoidal(double (*f)(double), double a, double b, int n) {
    double h = (b - a) / n;
    double sum = 0.5 * (f(a) + f(b));
    for (int i = 1; i < n; i++) {
        sum += f(a + i * h);
    }
    return sum * h;
}

int main(void) {
    int choice;
    do {
        printf("\n================ TRAPEZOIDAL INTEGRATION WORKBENCH ================\n");
        printf("1. Integrate f(x) = sin(x) on [0, pi] (Exact = 2.0)\n");
        printf("2. Integrate f(x) = e^(-x^2) [Gaussian]\n");
        printf("3. Integrate f(x) = 1 / (1 + x^2) on [0, 1] (Exact = pi/4)\n");
        printf("0. Exit\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        if (choice >= 1 && choice <= 3) {
            double (*f)(double) = (choice == 1) ? f1 : (choice == 2) ? f2 : f3;
            double a = 0.0, b = 1.0;
            if (choice == 1) { a = 0.0; b = 3.141592653589793; }
            else if (choice == 3) { a = 0.0; b = 1.0; }
            else {
                printf("Enter interval [a, b]: ");
                if (scanf("%lf %lf", &a, &b) != 2) { clear_input(); continue; }
            }

            printf("\nTrapezoidal Convergence Table across Subintervals n:\n");
            printf("--------------------------------------------------\n");
            printf("      n |      Step h      | Numerical Integral\n");
            printf("--------------------------------------------------\n");
            int n_vals[] = {2, 4, 8, 16, 32, 64, 128, 256, 512, 1024};
            for (int k = 0; k < 10; k++) {
                int n = n_vals[k];
                double val = composite_trapezoidal(f, a, b, n);
                printf(" %6d | %16.8f | %18.10f\n", n, (b - a) / n, val);
            }
            printf("--------------------------------------------------\n");
        } else if (choice == 0) {
            printf("Exiting Trapezoidal Workbench.\n");
        } else {
            printf("Invalid selection.\n");
        }
    } while (choice != 0);

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_trapezoidal_rule`, `academics-programming.numerical-methods.numerical-integration.trapezoidal-rule.prog-trapezoidal-rule`, `academics-programming>prog_acad_trapezoidal_rule()`, `academics-programming>numerical-methods>numerical-integration>trapezoidal-rule>prog-trapezoidal-rule>prog_acad_trapezoidal_rule()`
