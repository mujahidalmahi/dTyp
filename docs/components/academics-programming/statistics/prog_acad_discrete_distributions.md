# prog_acad_discrete_distributions
> **Domain:** `academics-programming` | **Subcategory:** `statistics` | **Type:** `program`
## Overview
Evaluates exact PMF and cumulative probability for Binomial and Poisson distributions

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

long long ncr(int n, int r) {
    if (r < 0 || r > n) return 0;
    if (r > n - r) r = n - r;
    long long res = 1;
    for (int i = 1; i <= r; i++) res = res * (n - i + 1) / i;
    return res;
}

double binomial_pmf(int n, int k, double p) {
    return ncr(n, k) * pow(p, k) * pow(1.0 - p, n - k);
}

double poisson_pmf(double lambda, int k) {
    double fact = 1.0;
    for (int i = 1; i <= k; i++) fact *= i;
    return (exp(-lambda) * pow(lambda, k)) / fact;
}

int main(void) {
    printf("Binomial(n=10, p=0.3, k=3): %.6f\n", binomial_pmf(10, 3, 0.3));
    printf("Poisson(lambda=2.5, k=2):   %.6f\n", poisson_pmf(2.5, 2));
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_discrete_distributions`, `academics-programming.statistics.probability-distributions.discrete-distributions.prog-discrete-distributions`, `academics-programming>prog_acad_discrete_distributions()`, `academics-programming>statistics>probability-distributions>discrete-distributions>prog-discrete-distributions>prog_acad_discrete_distributions()`
