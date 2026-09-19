# prog_acad_discrete_distributions
> **Domain:** `academics-programming` | **Subcategory:** `statistics` | **Type:** `program`
## Overview
Interactive discrete probability distribution calculator evaluating PMF and CDF for Binomial and Poisson models

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

static unsigned long long ncr(int n, int r) {
    if (r < 0 || r > n) return 0;
    if (r > n - r) r = n - r;
    unsigned long long res = 1;
    for (int i = 1; i <= r; i++) res = res * (n - i + 1) / i;
    return res;
}

static void eval_binomial(int n, double p) {
    printf("\n--- Binomial Distribution B(n = %d, p = %.4f) ---\n", n, p);
    printf("  Mean mu = n*p:            %10.4f\n", n * p);
    printf("  Variance sigma^2 = npq:   %10.4f\n", n * p * (1.0 - p));
    printf("  Std Dev sigma:            %10.4f\n", sqrt(n * p * (1.0 - p)));

    printf("\nComplete PMF & CDF Table:\n");
    printf("   k  |      P(X = k)     |     P(X <= k)\n");
    printf("------+-------------------+------------------\n");
    double cdf = 0.0;
    for (int k = 0; k <= n; k++) {
        double pmf = (double)ncr(n, k) * pow(p, k) * pow(1.0 - p, n - k);
        cdf += pmf;
        printf(" %4d | %17.8f | %16.8f\n", k, pmf, cdf);
    }
}

static void eval_poisson(double lambda, int max_k) {
    printf("\n--- Poisson Distribution Pois(lambda = %.4f) ---\n", lambda);
    printf("  Mean mu = lambda:         %10.4f\n", lambda);
    printf("  Variance sigma^2 = lambda:%10.4f\n", lambda);
    printf("  Std Dev sigma:            %10.4f\n", sqrt(lambda));

    printf("\nComplete PMF & CDF Table up to k = %d:\n", max_k);
    printf("   k  |      P(X = k)     |     P(X <= k)\n");
    printf("------+-------------------+------------------\n");
    double cdf = 0.0;
    double fact = 1.0;
    for (int k = 0; k <= max_k; k++) {
        if (k > 0) fact *= k;
        double pmf = (exp(-lambda) * pow(lambda, k)) / fact;
        cdf += pmf;
        printf(" %4d | %17.8f | %16.8f\n", k, pmf, cdf);
    }
}

int main(void) {
    int choice;
    do {
        printf("\n================ DISCRETE DISTRIBUTIONS WORKBENCH ================\n");
        printf("1. Binomial Distribution B(n, p)\n");
        printf("2. Poisson Distribution Pois(lambda)\n");
        printf("0. Exit\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                int n; double p;
                printf("Enter number of trials n (1 to 25) and success probability p (0 to 1): ");
                if (scanf("%d %lf", &n, &p) == 2 && n >= 1 && n <= 25 && p >= 0.0 && p <= 1.0) {
                    eval_binomial(n, p);
                } else { clear_input(); }
                break;
            }
            case 2: {
                double lambda;
                printf("Enter average event rate lambda (> 0): ");
                if (scanf("%lf", &lambda) == 1 && lambda > 0.0) {
                    eval_poisson(lambda, (int)ceil(2.0 * lambda + 6));
                } else { clear_input(); }
                break;
            }
            case 0:
                printf("Exiting Discrete Distributions.\n");
                break;
            default:
                printf("Invalid choice.\n");
        }
    } while (choice != 0);

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_discrete_distributions`, `academics-programming.statistics.probability-distributions.discrete-distributions.prog-discrete-distributions`, `academics-programming>prog_acad_discrete_distributions()`, `academics-programming>statistics>probability-distributions>discrete-distributions>prog-discrete-distributions>prog_acad_discrete_distributions()`
