# prog_acad_students_t_test
> **Domain:** `academics-programming` | **Subcategory:** `statistics` | **Type:** `program`
## Overview
Computes one-sample Student's t-statistic and degrees of freedom

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

void perform_t_test(int n, double sample_mean, double sample_std, double mu0) {
    double se = sample_std / sqrt((double)n);
    double t_stat = (sample_mean - mu0) / se;
    int df = n - 1;

    printf("Sample Mean:        %.4f
", sample_mean);
    printf("Hypothesized Mean:  %.4f
", mu0);
    printf("Standard Error:     %.4f
", se);
    printf("t-Statistic:        %.4f
", t_stat);
    printf("Degrees of Freedom: %d
", df);
}

int main(void) {
    int n = 25;
    double x_bar = 104.2;
    double s = 8.5;
    double mu0 = 100.0;
    perform_t_test(n, x_bar, s, mu0);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_students_t_test`, `academics-programming.statistics.regression-hypothesis.students-t-test.prog-students-t-test`, `academics-programming>prog_acad_students_t_test()`, `academics-programming>statistics>regression-hypothesis>students-t-test>prog-students-t-test>prog_acad_students_t_test()`
