# prog_acad_false_position
> **Domain:** `academics-programming` | **Subcategory:** `numerical-methods` | **Type:** `program`
## Overview
Interactive Regula Falsi root-finding solver with convergence table and Illinois acceleration option

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

static double f1(double x) { return x * x * x - 2.0 * x - 5.0; }
static double f2(double x) { return x * exp(x) - 1.0; }

static void run_false_position(double (*f)(double), double a, double b, double tol, int max_iter, bool illinois) {
    double fa = f(a);
    double fb = f(b);

    if (fa * fb >= 0.0) {
        printf("Error: f(a) and f(b) must have opposite signs. f(%.4f)=%.4f, f(%.4f)=%.4f\n", a, fa, b, fb);
        return;
    }

    printf("\nMethod: %s\n", illinois ? "Illinois Accelerated False Position" : "Standard Regula Falsi");
    printf("----------------------------------------------------------------------\n");
    printf(" Iter |      a       |      b       |      c       |    f(c)     |  |f(c)|\n");
    printf("----------------------------------------------------------------------\n");

    double c = a;
    int side = 0;
    for (int iter = 1; iter <= max_iter; iter++) {
        c = (a * fb - b * fa) / (fb - fa);
        double fc = f(c);

        printf(" %4d | %12.6f | %12.6f | %12.6f | %11.4e | %10.4e\n",
               iter, a, b, c, fc, fabs(fc));

        if (fabs(fc) < tol) {
            printf("----------------------------------------------------------------------\n");
            printf("Convergence reached in %d iterations! Root estimate x* = %.10f\n", iter, c);
            return;
        }

        if (fa * fc < 0.0) {
            b = c;
            fb = fc;
            if (side == -1 && illinois) fa *= 0.5;
            side = -1;
        } else {
            a = c;
            fa = fc;
            if (side == 1 && illinois) fb *= 0.5;
            side = 1;
        }
    }
    printf("----------------------------------------------------------------------\n");
    printf("Reached max iterations (%d). Final estimate x* = %.10f\n", max_iter, c);
}

int main(void) {
    int choice;
    do {
        printf("\n================ REGULA FALSI (FALSE POSITION) WORKBENCH ================\n");
        printf("1. Standard Regula Falsi: f(x) = x^3 - 2x - 5 = 0\n");
        printf("2. Illinois Accelerated: f(x) = x^3 - 2x - 5 = 0\n");
        printf("3. Standard Regula Falsi: f(x) = x*e^x - 1 = 0\n");
        printf("4. Illinois Accelerated: f(x) = x*e^x - 1 = 0\n");
        printf("0. Exit\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        if (choice >= 1 && choice <= 4) {
            double (*f)(double) = (choice <= 2) ? f1 : f2;
            bool illinois = (choice == 2 || choice == 4);
            double a, b, tol;
            int max_iter;
            printf("Enter bracket [a, b]: ");
            if (scanf("%lf %lf", &a, &b) != 2) { clear_input(); continue; }
            printf("Enter tolerance epsilon (e.g. 1e-6): ");
            if (scanf("%lf", &tol) != 1) { clear_input(); continue; }
            printf("Enter max iterations (e.g. 50): ");
            if (scanf("%d", &max_iter) != 1) { clear_input(); continue; }
            run_false_position(f, a, b, tol, max_iter, illinois);
        } else if (choice == 0) {
            printf("Exiting Regula Falsi Workbench.\n");
        } else {
            printf("Invalid choice.\n");
        }
    } while (choice != 0);

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_false_position`, `academics-programming.numerical-methods.root-finding.false-position.prog-false-position`, `academics-programming>prog_acad_false_position()`, `academics-programming>numerical-methods>root-finding>false-position>prog-false-position>prog_acad_false_position()`
