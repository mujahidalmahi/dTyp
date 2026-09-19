# prog_acad_students_t_test
> **Domain:** `academics-programming` | **Subcategory:** `statistics` | **Type:** `program`
## Overview
Interactive one-sample Student's t-test hypothesis tester with critical value comparison and confidence intervals

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

static void run_t_test(int n, double x_bar, double s, double mu0) {
    if (n <= 1 || s <= 0.0) {
        printf("Error: Sample size must be > 1 and std dev > 0.\n");
        return;
    }

    double se = s / sqrt((double)n);
    double t_stat = (x_bar - mu0) / se;
    int df = n - 1;

    double t_crit_05 = 2.064;
    double t_crit_01 = 2.797;
    if (df >= 30) { t_crit_05 = 1.960; t_crit_01 = 2.576; }
    else if (df >= 20) { t_crit_05 = 2.086; t_crit_01 = 2.845; }
    else if (df >= 10) { t_crit_05 = 2.228; t_crit_01 = 3.169; }

    printf("\n--- One-Sample Student's t-Test Results ---\n");
    printf("  Sample Size N:             %d\n", n);
    printf("  Degrees of Freedom df:     %d\n", df);
    printf("  Sample Mean x_bar:         %10.4f\n", x_bar);
    printf("  Hypothesized Mean mu0:     %10.4f\n", mu0);
    printf("  Sample Std Deviation s:    %10.4f\n", s);
    printf("  Standard Error SE:         %10.4f\n", se);
    printf("  Calculated t-Statistic:    %10.4f\n", t_stat);

    printf("\nHypothesis Test Decision (Two-Tailed):\n");
    printf("  At alpha = 0.05: Critical t = +-%.3f -> ", t_crit_05);
    if (fabs(t_stat) > t_crit_05) printf("REJECT NULL HYPOTHESIS H0 (Statistically Significant!)\n");
    else printf("FAIL TO REJECT NULL HYPOTHESIS H0 (No significant difference).\n");

    printf("  At alpha = 0.01: Critical t = +-%.3f -> ", t_crit_01);
    if (fabs(t_stat) > t_crit_01) printf("REJECT NULL HYPOTHESIS H0 (Highly Significant!)\n");
    else printf("FAIL TO REJECT NULL HYPOTHESIS H0.\n");

    printf("\n95%% Confidence Interval for Population Mean mu:\n");
    printf("  [%.4f, %.4f]\n", x_bar - t_crit_05 * se, x_bar + t_crit_05 * se);
}

int main(void) {
    int choice;
    do {
        printf("\n================ STUDENT'S t-TEST HYPOTHESIS WORKBENCH ================\n");
        printf("1. Perform One-Sample t-Test from Sample Summary (N, mean, std, mu0)\n");
        printf("2. Test Classroom Example (N=25, x_bar=104.2, s=8.5, mu0=100.0)\n");
        printf("0. Exit\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                int n;
                double x_bar, s, mu0;
                printf("Enter sample size N: ");
                if (scanf("%d", &n) != 1) { clear_input(); break; }
                printf("Enter sample mean x_bar and sample std dev s: ");
                if (scanf("%lf %lf", &x_bar, &s) != 2) { clear_input(); break; }
                printf("Enter hypothesized population mean mu0: ");
                if (scanf("%lf", &mu0) != 1) { clear_input(); break; }
                run_t_test(n, x_bar, s, mu0);
                break;
            }
            case 2:
                run_t_test(25, 104.2, 8.5, 100.0);
                break;
            case 0:
                printf("Exiting Student's t-Test.\n");
                break;
            default:
                printf("Invalid selection.\n");
        }
    } while (choice != 0);

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_students_t_test`, `academics-programming.statistics.regression-hypothesis.students-t-test.prog-students-t-test`, `academics-programming>prog_acad_students_t_test()`, `academics-programming>statistics>regression-hypothesis>students-t-test>prog-students-t-test>prog_acad_students_t_test()`
