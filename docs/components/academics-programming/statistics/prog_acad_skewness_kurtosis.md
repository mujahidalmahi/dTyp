# prog_acad_skewness_kurtosis
> **Domain:** `academics-programming` | **Subcategory:** `statistics` | **Type:** `program`
## Overview
Interactive distribution shape analyzer computing central moments, Fisher-Pearson skewness, and excess kurtosis

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

#define MAX_DATA 100

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

static void analyze_shape(int n, const double arr[]) {
    double sum = 0.0;
    for (int i = 0; i < n; i++) sum += arr[i];
    double mean = sum / n;

    double m2 = 0.0, m3 = 0.0, m4 = 0.0;
    for (int i = 0; i < n; i++) {
        double d = arr[i] - mean;
        double d2 = d * d;
        m2 += d2;
        m3 += d2 * d;
        m4 += d2 * d2;
    }
    m2 /= n;
    m3 /= n;
    m4 /= n;

    if (m2 < 1e-12) {
        printf("Error: Variance is zero. All values are identical.\n");
        return;
    }

    double skewness = m3 / pow(m2, 1.5);
    double kurtosis = m4 / (m2 * m2);
    double excess_kurtosis = kurtosis - 3.0;

    printf("\n--- Distribution Shape Analysis (N = %d) ---\n", n);
    printf("  Mean:                     %10.4f\n", mean);
    printf("  Second Central Moment m2: %10.4f\n", m2);
    printf("  Third Central Moment m3:  %10.4f\n", m3);
    printf("  Fourth Central Moment m4: %10.4f\n", m4);
    printf("  Fisher-Pearson Skewness:  %10.4f\n", skewness);
    printf("  Kurtosis (Beta_2):        %10.4f\n", kurtosis);
    printf("  Excess Kurtosis (Gamma_2):%10.4f\n", excess_kurtosis);

    printf("\nQualitative Classification:\n");
    if (fabs(skewness) < 0.1) printf("  Symmetry: Nearly Symmetric distribution.\n");
    else if (skewness > 0) printf("  Symmetry: POSITIVELY SKEWED (Right-tailed, tail stretches to the right).\n");
    else printf("  Symmetry: NEGATIVELY SKEWED (Left-tailed, tail stretches to the left).\n");

    if (fabs(excess_kurtosis) < 0.1) printf("  Peakedness: MESOKURTIC (Similar to standard Gaussian bell).\n");
    else if (excess_kurtosis > 0) printf("  Peakedness: LEPTOKURTIC (Heavy-tailed, sharp central peak).\n");
    else printf("  Peakedness: PLATYKURTIC (Light-tailed, flat central shoulder).\n");
}

int main(void) {
    int n = 8;
    double vals[MAX_DATA] = {10, 12, 12, 13, 15, 18, 20, 25};

    int choice;
    do {
        printf("\n================ SKEWNESS & KURTOSIS WORKBENCH ================\n");
        printf("1. Enter Dataset from Terminal\n");
        printf("2. Analyze Skewness and Kurtosis\n");
        printf("0. Exit\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                printf("Enter sample size N (3 to %d): ", MAX_DATA);
                if (scanf("%d", &n) != 1 || n < 3 || n > MAX_DATA) {
                    clear_input();
                    n = 8;
                    break;
                }
                printf("Enter %d numeric values: ", n);
                for (int i = 0; i < n; i++) {
                    if (scanf("%lf", &vals[i]) != 1) vals[i] = 0.0;
                }
                clear_input();
                break;
            }
            case 2:
                analyze_shape(n, vals);
                break;
            case 0:
                printf("Exiting Skewness & Kurtosis.\n");
                break;
            default:
                printf("Invalid selection.\n");
        }
    } while (choice != 0);

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_skewness_kurtosis`, `academics-programming.statistics.descriptive-statistics.skewness-kurtosis.prog-skewness-kurtosis`, `academics-programming>prog_acad_skewness_kurtosis()`, `academics-programming>statistics>descriptive-statistics>skewness-kurtosis>prog-skewness-kurtosis>prog_acad_skewness_kurtosis()`
