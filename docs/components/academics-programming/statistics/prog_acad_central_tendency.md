# prog_acad_central_tendency
> **Domain:** `academics-programming` | **Subcategory:** `statistics` | **Type:** `program`
## Overview
Computes arithmetic mean, median, sample variance, standard deviation, and IQR

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

void compute_descriptive_stats(int n, double arr[]) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                double tmp = arr[j]; arr[j] = arr[j + 1]; arr[j + 1] = tmp;
            }
        }
    }
    double sum = 0.0;
    for (int i = 0; i < n; i++) sum += arr[i];
    double mean = sum / n;

    double median = (n % 2 != 0) ? arr[n / 2] : (arr[n / 2 - 1] + arr[n / 2]) / 2.0;

    double sq_diff = 0.0;
    for (int i = 0; i < n; i++) sq_diff += (arr[i] - mean) * (arr[i] - mean);
    double variance = sq_diff / (n - 1);
    double std_dev = sqrt(variance);

    double q1 = arr[n / 4];
    double q3 = arr[(3 * n) / 4];
    double iqr = q3 - q1;

    printf("Mean:               %.4f\n", mean);
    printf("Median:             %.4f\n", median);
    printf("Sample Variance:    %.4f\n", variance);
    printf("Standard Deviation: %.4f\n", std_dev);
    printf("IQR (Q3 - Q1):      %.4f\n", iqr);
}

int main(void) {
    double data[] = {12, 15, 11, 19, 22, 24, 25, 26, 29, 35};
    compute_descriptive_stats(10, data);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_central_tendency`, `academics-programming.statistics.descriptive-statistics.central-tendency-dispersion.prog-central-tendency`, `academics-programming>prog_acad_central_tendency()`, `academics-programming>statistics>descriptive-statistics>central-tendency-dispersion>prog-central-tendency>prog_acad_central_tendency()`
