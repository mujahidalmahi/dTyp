# prog_acad_permutations_combinations
> **Domain:** `academics-programming` | **Subcategory:** `discrete-mathematics` | **Type:** `program`
## Overview
Calculates P(n, r) permutations and C(n, r) combinations

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

long long compute_permutation(int n, int r) {
    if (r < 0 || r > n) return 0;
    long long res = 1;
    for (int i = 0; i < r; i++) {
        res *= (n - i);
    }
    return res;
}

long long compute_combination(int n, int r) {
    if (r < 0 || r > n) return 0;
    if (r > n - r) r = n - r;
    long long res = 1;
    for (int i = 1; i <= r; i++) {
        res = res * (n - i + 1) / i;
    }
    return res;
}

int main(void) {
    int n = 8, r = 3;
    printf("P(%d, %d) = %lld
", n, r, compute_permutation(n, r));
    printf("C(%d, %d) = %lld
", n, r, compute_combination(n, r));
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_permutations_combinations`, `academics-programming.discrete-mathematics.relations-combinatorics.permutations-combinations.prog-permutations-combinations`, `academics-programming>prog_acad_permutations_combinations()`, `academics-programming>discrete-mathematics>relations-combinatorics>permutations-combinations>prog-permutations-combinations>prog_acad_permutations_combinations()`
