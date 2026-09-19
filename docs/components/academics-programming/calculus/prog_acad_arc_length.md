# prog_acad_arc_length
> **Domain:** `academics-programming` | **Subcategory:** `calculus` | **Type:** `program`
## Overview
Interactive arc length calculator for plane curves using numerical quadrature and chordal polygon approximation

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
static double f3(double x) { return cosh(x); }

static double arc_integrand(double (*f)(double), double x) {
    double h = 1e-5;
    double dy_dx = (f(x + h) - f(x - h)) / (2.0 * h);
    return sqrt(1.0 + dy_dx * dy_dx);
}

static double compute_arc_simpson(double (*f)(double), double a, double b, int n) {
    if (n % 2 != 0) n++;
    double h = (b - a) / n;
    double sum = arc_integrand(f, a) + arc_integrand(f, b);
    for (int i = 1; i < n; i++) {
        double x = a + i * h;
        sum += (i % 2 == 1 ? 4.0 : 2.0) * arc_integrand(f, x);
    }
    return sum * (h / 3.0);
}

static double compute_chord_length(double (*f)(double), double a, double b, int n) {
    double h = (b - a) / n;
    double total = 0.0;
    double prev_x = a;
    double prev_y = f(a);
    for (int i = 1; i <= n; i++) {
        double cur_x = a + i * h;
        double cur_y = f(cur_x);
        double dx = cur_x - prev_x;
        double dy = cur_y - prev_y;
        total += sqrt(dx * dx + dy * dy);
        prev_x = cur_x;
        prev_y = cur_y;
    }
    return total;
}

int main(void) {
    int choice;
    do {
        printf("\n================ ARC LENGTH CALCULATOR ================\n");
        printf("1. Curve y = x^2 (Parabola) on [0, 1]\n");
        printf("2. Curve y = sin(x) on [0, pi]\n");
        printf("3. Curve y = cosh(x) (Catenary) on [0, 1]\n");
        printf("0. Exit\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        if (choice >= 1 && choice <= 3) {
            double (*f)(double) = (choice == 1) ? f1 : (choice == 2) ? f2 : f3;
            double a = 0.0, b = 1.0;
            if (choice == 1) { a = 0.0; b = 1.0; }
            else if (choice == 2) { a = 0.0; b = 3.141592653589793; }
            else { a = 0.0; b = 1.0; }

            double arc_simpson = compute_arc_simpson(f, a, b, 200);
            double chord_approx = compute_chord_length(f, a, b, 200);

            printf("\nArc Length Results on [%.2f, %.2f]:\n", a, b);
            printf("  Numerical Quadrature (Simpson's): %16.10f\n", arc_simpson);
            printf("  Polygonal Chord Sum (200 segments):%16.10f\n", chord_approx);
            if (choice == 3) {
                double exact = sinh(b) - sinh(a);
                printf("  Exact Analytical (sinh(1)):      %16.10f\n", exact);
            }
        } else if (choice == 0) {
            printf("Exiting Arc Length Workbench.\n");
        } else {
            printf("Invalid choice.\n");
        }
    } while (choice != 0);

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_arc_length`, `academics-programming.calculus.integral-calculus.arc-length.prog-arc-length`, `academics-programming>prog_acad_arc_length()`, `academics-programming>calculus>integral-calculus>arc-length>prog-arc-length>prog_acad_arc_length()`
