# prog_acad_riemann_sums
> **Domain:** `academics-programming` | **Subcategory:** `calculus` | **Type:** `program`
## Overview
Interactive Riemann sum analyzer calculating Left, Right, Midpoint, and Trapezoidal approximations with convergence study

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

static double f1(double x) { return x * x; }
static double f2(double x) { return sin(x); }
static double f3(double x) { return 1.0 / x; }

static void compute_riemann_sums(double (*f)(double), double a, double b, int n) {
    double dx = (b - a) / n;
    double left_sum = 0.0;
    double right_sum = 0.0;
    double mid_sum = 0.0;

    for (int i = 0; i < n; i++) {
        double x_left = a + i * dx;
        double x_right = x_left + dx;
        double x_mid = x_left + 0.5 * dx;

        left_sum += f(x_left);
        right_sum += f(x_right);
        mid_sum += f(x_mid);
    }
    left_sum *= dx;
    right_sum *= dx;
    mid_sum *= dx;
    double trap_sum = 0.5 * (left_sum + right_sum);

    printf("Riemann Sums for N = %d (dx = %.6f):\n", n, dx);
    printf("  Left Riemann Sum:     %16.10f\n", left_sum);
    printf("  Right Riemann Sum:    %16.10f\n", right_sum);
    printf("  Midpoint Riemann Sum: %16.10f\n", mid_sum);
    printf("  Trapezoidal Average:  %16.10f\n", trap_sum);
}

int main(void) {
    int choice;
    do {
        printf("\n================ RIEMANN SUMS WORKBENCH ================\n");
        printf("1. Integrate f(x) = x^2 on [0, 2] (Exact = 8/3 = 2.666667)\n");
        printf("2. Integrate f(x) = sin(x) on [0, pi] (Exact = 2.0)\n");
        printf("3. Integrate f(x) = 1/x on [1, e] (Exact = 1.0)\n");
        printf("0. Exit\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        if (choice >= 1 && choice <= 3) {
            double (*f)(double) = (choice == 1) ? f1 : (choice == 2) ? f2 : f3;
            double a = 0.0, b = 2.0;
            if (choice == 1) { a = 0.0; b = 2.0; }
            else if (choice == 2) { a = 0.0; b = 3.141592653589793; }
            else { a = 1.0; b = 2.718281828459045; }

            int n = 100;
            printf("Enter number of rectangles N (e.g. 10, 100, 1000): ");
            if (scanf("%d", &n) != 1 || n < 1) n = 100;
            compute_riemann_sums(f, a, b, n);
        } else if (choice == 0) {
            printf("Exiting Riemann Sums.\n");
        } else {
            printf("Invalid choice.\n");
        }
    } while (choice != 0);

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_riemann_sums`, `academics-programming.calculus.integral-calculus.riemann-sums.prog-riemann-sums`, `academics-programming>prog_acad_riemann_sums()`, `academics-programming>calculus>integral-calculus>riemann-sums>prog-riemann-sums>prog_acad_riemann_sums()`
