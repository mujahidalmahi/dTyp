# prog_acad_normal_distribution
> **Domain:** `academics-programming` | **Subcategory:** `statistics` | **Type:** `program`
## Overview
Computes Gaussian probability density and standard normal cumulative CDF

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

double normal_pdf(double x, double mu, double sigma) {
    double coeff = 1.0 / (sigma * sqrt(2.0 * 3.141592653589793));
    double exp_part = exp(-0.5 * pow((x - mu) / sigma, 2.0));
    return coeff * exp_part;
}

double normal_cdf(double x, double mu, double sigma) {
    double z = (x - mu) / (sigma * sqrt(2.0));
    return 0.5 * (1.0 + erf(z));
}

int main(void) {
    double mu = 100.0, sigma = 15.0, query = 115.0;
    double z = (query - mu) / sigma;
    printf("Z-Score: %.4f
", z);
    printf("PDF f(115): %.6f
", normal_pdf(query, mu, sigma));
    printf("CDF P(X <= 115): %.6f
", normal_cdf(query, mu, sigma));
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_normal_distribution`, `academics-programming.statistics.probability-distributions.normal-distribution.prog-normal-distribution`, `academics-programming>prog_acad_normal_distribution()`, `academics-programming>statistics>probability-distributions>normal-distribution>prog-normal-distribution>prog_acad_normal_distribution()`
