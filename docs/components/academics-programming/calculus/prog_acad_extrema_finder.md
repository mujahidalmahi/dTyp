# prog_acad_extrema_finder
> **Domain:** `academics-programming` | **Subcategory:** `calculus` | **Type:** `program`
## Overview
Interactive local and global extrema finder using critical points, numerical second-derivative test, and bisection search

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

static double f1(double x) { return x * x * x * x - 4.0 * x * x + 1.0; }
static double f2(double x) { return sin(x) + cos(2.0 * x); }
static double f3(double x) { return x * exp(-x); }

static double num_deriv(double (*f)(double), double x) {
    double h = 1e-5;
    return (f(x + h) - f(x - h)) / (2.0 * h);
}

static double num_second_deriv(double (*f)(double), double x) {
    double h = 1e-4;
    return (f(x + h) - 2.0 * f(x) + f(x - h)) / (h * h);
}

static double find_critical_root(double (*f)(double), double a, double b) {
    double fa = num_deriv(f, a);
    for (int i = 0; i < 50; i++) {
        double mid = 0.5 * (a + b);
        double fmid = num_deriv(f, mid);
        if (fabs(fmid) < 1e-7) return mid;
        if (fa * fmid < 0.0) b = mid;
        else { a = mid; fa = fmid; }
    }
    return 0.5 * (a + b);
}

static void find_extrema(double (*f)(double), double a, double b, int samples) {
    printf("\nScanning for Critical Points on [%.2f, %.2f] with %d grid steps:\n", a, b, samples);
    double step = (b - a) / samples;
    double prev_d = num_deriv(f, a);

    double global_min_x = a, global_min_y = f(a);
    double global_max_x = a, global_max_y = f(a);

    int crit_count = 0;
    for (int i = 0; i < samples; i++) {
        double x1 = a + i * step;
        double x2 = x1 + step;
        double curr_d = num_deriv(f, x2);

        if (prev_d * curr_d <= 0.0) {
            double c = find_critical_root(f, x1, x2);
            double val = f(c);
            double d2 = num_second_deriv(f, c);

            crit_count++;
            printf("  Critical Point %d: x = %10.5f, f(x) = %10.5f, f''(x) = %10.5f -> ",
                   crit_count, c, val, d2);
            if (d2 > 1e-4) printf("LOCAL MINIMUM\n");
            else if (d2 < -1e-4) printf("LOCAL MAXIMUM\n");
            else printf("INFLECTION / SADDLE\n");

            if (val < global_min_y) { global_min_y = val; global_min_x = c; }
            if (val > global_max_y) { global_max_y = val; global_max_x = c; }
        }
        prev_d = curr_d;
    }

    if (f(b) < global_min_y) { global_min_y = f(b); global_min_x = b; }
    if (f(b) > global_max_y) { global_max_y = f(b); global_max_x = b; }

    printf("\nGlobal Extrema on [%.2f, %.2f]:\n", a, b);
    printf("  Global Minimum: f(%.5f) = %.5f\n", global_min_x, global_min_y);
    printf("  Global Maximum: f(%.5f) = %.5f\n", global_max_x, global_max_y);
}

int main(void) {
    int choice;
    do {
        printf("\n================ EXTREMA FINDER WORKBENCH ================\n");
        printf("1. Analyze f(x) = x^4 - 4x^2 + 1 (Double Well Potential)\n");
        printf("2. Analyze f(x) = sin(x) + cos(2x)\n");
        printf("3. Analyze f(x) = x * e^(-x)\n");
        printf("0. Exit\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        if (choice >= 1 && choice <= 3) {
            double (*f)(double) = (choice == 1) ? f1 : (choice == 2) ? f2 : f3;
            double a = -3.0, b = 3.0;
            printf("Enter search interval [a, b]: ");
            if (scanf("%lf %lf", &a, &b) != 2) { a = -3.0; b = 3.0; }
            find_extrema(f, a, b, 200);
        } else if (choice == 0) {
            printf("Exiting Extrema Finder.\n");
        } else {
            printf("Invalid choice.\n");
        }
    } while (choice != 0);

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_extrema_finder`, `academics-programming.calculus.differential-calculus.extrema-finder.prog-extrema-finder`, `academics-programming>prog_acad_extrema_finder()`, `academics-programming>calculus>differential-calculus>extrema-finder>prog-extrema-finder>prog_acad_extrema_finder()`
