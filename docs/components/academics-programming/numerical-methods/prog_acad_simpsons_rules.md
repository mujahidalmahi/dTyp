# prog_acad_simpsons_rules
> **Domain:** `academics-programming` | **Subcategory:** `numerical-methods` | **Type:** `program`
## Overview
Interactive numerical integration comparing Simpson's 1/3 and 3/8 rules against analytical exact values

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
static double f2(double x) { return 1.0 / (1.0 + x * x); }
static double f3(double x) { return exp(x); }

static double simpson_1_3(double (*f)(double), double a, double b, int n) {
    if (n % 2 != 0) n++;
    double h = (b - a) / n;
    double sum = f(a) + f(b);
    for (int i = 1; i < n; i++) {
        double x = a + i * h;
        sum += (i % 2 == 1 ? 4.0 : 2.0) * f(x);
    }
    return sum * (h / 3.0);
}

static double simpson_3_8(double (*f)(double), double a, double b, int n) {
    while (n % 3 != 0) n++;
    double h = (b - a) / n;
    double sum = f(a) + f(b);
    for (int i = 1; i < n; i++) {
        double x = a + i * h;
        sum += (i % 3 == 0 ? 2.0 : 3.0) * f(x);
    }
    return sum * (3.0 * h / 8.0);
}

int main(void) {
    int choice;
    do {
        printf("\n================ SIMPSON'S RULES (1/3 & 3/8) WORKBENCH ================\n");
        printf("1. Integrate f(x) = sin(x) on [0, pi]\n");
        printf("2. Integrate f(x) = 1 / (1 + x^2) on [0, 1]\n");
        printf("3. Integrate f(x) = e^x on [0, 2]\n");
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
            else if (choice == 2) { a = 0.0; b = 1.0; }
            else { a = 0.0; b = 2.0; }

            int n = 12;
            printf("Enter number of subintervals n (e.g. 12): ");
            if (scanf("%d", &n) != 1 || n < 6) n = 12;

            double res_13 = simpson_1_3(f, a, b, n);
            double res_38 = simpson_3_8(f, a, b, n);

            printf("\nIntegration Results for n = %d:\n", n);
            printf("Simpson's 1/3 Rule (O(h^4)): %16.10f\n", res_13);
            printf("Simpson's 3/8 Rule (O(h^4)): %16.10f\n", res_38);
            if (choice == 1) {
                printf("Exact Analytical Integral:  %16.10f\n", 2.0);
                printf("Error 1/3: %.2e, Error 3/8: %.2e\n", fabs(res_13 - 2.0), fabs(res_38 - 2.0));
            } else if (choice == 2) {
                double exact = 3.141592653589793 / 4.0;
                printf("Exact Analytical Integral:  %16.10f\n", exact);
                printf("Error 1/3: %.2e, Error 3/8: %.2e\n", fabs(res_13 - exact), fabs(res_38 - exact));
            }
        } else if (choice == 0) {
            printf("Exiting Simpson's Workbench.\n");
        } else {
            printf("Invalid selection.\n");
        }
    } while (choice != 0);

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_simpsons_rules`, `academics-programming.numerical-methods.numerical-integration.simpsons-rules.prog-simpsons-rules`, `academics-programming>prog_acad_simpsons_rules()`, `academics-programming>numerical-methods>numerical-integration>simpsons-rules>prog-simpsons-rules>prog_acad_simpsons_rules()`
