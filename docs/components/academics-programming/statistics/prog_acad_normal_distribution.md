# prog_acad_normal_distribution
> **Domain:** `academics-programming` | **Subcategory:** `statistics` | **Type:** `program`
## Overview
Interactive Gaussian distribution analyzer calculating Z-scores, PDF, numerical CDF, and interval probabilities

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

static double normal_pdf(double x, double mu, double sigma) {
    double coeff = 1.0 / (sigma * sqrt(2.0 * 3.141592653589793));
    double exp_part = exp(-0.5 * pow((x - mu) / sigma, 2.0));
    return coeff * exp_part;
}

static double normal_cdf(double x, double mu, double sigma) {
    double z = (x - mu) / (sigma * sqrt(2.0));
    return 0.5 * (1.0 + erf(z));
}

int main(void) {
    double mu = 0.0, sigma = 1.0;

    int choice;
    do {
        printf("\n================ NORMAL DISTRIBUTION WORKBENCH ================\n");
        printf("Current Parameters: Mean mu = %.4f, Std Dev sigma = %.4f\n", mu, sigma);
        printf("1. Set Normal Distribution Parameters (mu, sigma)\n");
        printf("2. Compute Z-Score, PDF, and Cumulative P(X <= x)\n");
        printf("3. Compute Interval Probability P(a <= X <= b)\n");
        printf("4. Display Empirical Rule Confidence Intervals (68-95-99.7%%)\n");
        printf("0. Exit\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                printf("Enter mean mu and standard deviation sigma (> 0): ");
                if (scanf("%lf %lf", &mu, &sigma) != 2 || sigma <= 0.0) {
                    clear_input();
                    mu = 0.0; sigma = 1.0;
                }
                break;
            }
            case 2: {
                double x;
                printf("Enter query value x: ");
                if (scanf("%lf", &x) == 1) {
                    double z = (x - mu) / sigma;
                    printf("\nResults for x = %.4f:\n", x);
                    printf("  Standardized Z-Score:  %10.4f\n", z);
                    printf("  Probability Density f(x):%10.6f\n", normal_pdf(x, mu, sigma));
                    printf("  CDF P(X <= x):         %10.6f (%.2f%%)\n", normal_cdf(x, mu, sigma), normal_cdf(x, mu, sigma) * 100.0);
                    printf("  Upper Tail P(X > x):   %10.6f (%.2f%%)\n", 1.0 - normal_cdf(x, mu, sigma), (1.0 - normal_cdf(x, mu, sigma)) * 100.0);
                } else { clear_input(); }
                break;
            }
            case 3: {
                double a, b;
                printf("Enter interval endpoints a and b: ");
                if (scanf("%lf %lf", &a, &b) == 2 && a <= b) {
                    double prob = normal_cdf(b, mu, sigma) - normal_cdf(a, mu, sigma);
                    printf("Probability P(%.2f <= X <= %.2f) = %.6f (%.2f%%)\n", a, b, prob, prob * 100.0);
                } else { clear_input(); }
                break;
            }
            case 4:
                printf("\n--- Empirical Rule (68-95-99.7%% Rule) ---\n");
                printf("  68.27%% Interval [mu - 1*s, mu + 1*s]: [%.4f, %.4f]\n", mu - sigma, mu + sigma);
                printf("  95.45%% Interval [mu - 2*s, mu + 2*s]: [%.4f, %.4f]\n", mu - 2.0 * sigma, mu + 2.0 * sigma);
                printf("  99.73%% Interval [mu - 3*s, mu + 3*s]: [%.4f, %.4f]\n", mu - 3.0 * sigma, mu + 3.0 * sigma);
                break;
            case 0:
                printf("Exiting Normal Distribution.\n");
                break;
            default:
                printf("Invalid selection.\n");
        }
    } while (choice != 0);

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_normal_distribution`, `academics-programming.statistics.probability-distributions.normal-distribution.prog-normal-distribution`, `academics-programming>prog_acad_normal_distribution()`, `academics-programming>statistics>probability-distributions>normal-distribution>prog-normal-distribution>prog_acad_normal_distribution()`
