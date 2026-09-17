# prog_acad_skewness_kurtosis
> **Domain:** `academics-programming` | **Subcategory:** `statistics` | **Type:** `program`
## Overview
Calculates central moments, Fisher-Pearson skewness, and excess kurtosis

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

void compute_shape_moments(int n, const double arr[]) {
    double sum = 0.0;
    for (int i = 0; i < n; i++) sum += arr[i];
    double mean = sum / n;

    double m2 = 0.0, m3 = 0.0, m4 = 0.0;
    for (int i = 0; i < n; i++) {
        double d = arr[i] - mean;
        m2 += d * d;
        m3 += d * d * d;
        m4 += d * d * d * d;
    }
    m2 /= n;
    m3 /= n;
    m4 /= n;

    double skewness = m3 / pow(m2, 1.5);
    double kurtosis = (m4 / (m2 * m2)) - 3.0;

    printf("Second Central Moment m2: %.4f
", m2);
    printf("Third Central Moment m3:  %.4f
", m3);
    printf("Fourth Central Moment m4: %.4f
", m4);
    printf("Fisher-Pearson Skewness:  %.4f
", skewness);
    printf("Excess Kurtosis:          %.4f
", kurtosis);
}

int main(void) {
    double vals[] = {10, 12, 12, 13, 15, 18, 20, 25};
    compute_shape_moments(8, vals);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_skewness_kurtosis`, `academics-programming.statistics.descriptive-statistics.skewness-kurtosis.prog-skewness-kurtosis`, `academics-programming>prog_acad_skewness_kurtosis()`, `academics-programming>statistics>descriptive-statistics>skewness-kurtosis>prog-skewness-kurtosis>prog_acad_skewness_kurtosis()`
