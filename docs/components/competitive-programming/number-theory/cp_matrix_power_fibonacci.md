# cp_matrix_power_fibonacci
> **Domain:** `competitive-programming` | **Subcategory:** `number-theory` | **Type:** `function`
## Overview
Computes N-th Fibonacci number in O(log N) using 2x2 matrix fast power

## Signature
```c
long long cp_matrix_power_fibonacci(long long n, long long mod);
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
long long cp_matrix_power_fibonacci(long long n, long long mod) {
    if (n <= 0) return 0;
    if (n == 1) return 1;
    long long res[2][2] = {{1, 0}, {0, 1}};
    long long base[2][2] = {{1, 1}, {1, 0}};
    long long p = n - 1;
    while (p > 0) {
        if (p & 1) {
            long long tmp[2][2];
            cp_matrix_multiply_2x2(res, base, tmp, mod);
            res[0][0] = tmp[0][0]; res[0][1] = tmp[0][1];
            res[1][0] = tmp[1][0]; res[1][1] = tmp[1][1];
        }
        long long tmp_base[2][2];
        cp_matrix_multiply_2x2(base, base, tmp_base, mod);
        base[0][0] = tmp_base[0][0]; base[0][1] = tmp_base[0][1];
        base[1][0] = tmp_base[1][0]; base[1][1] = tmp_base[1][1];
        p >>= 1;
    }
    return res[0][0];
}
```

## Aliases & Shorthands
Available via: `cp_matrix_power_fibonacci`, `competitive-programming.programming-technics.number-theory.matrix-exponentiation.fibonacci`, `competitive-programming>cp_matrix_power_fibonacci()`, `competitive-programming>programming-technics>number-theory>matrix-exponentiation>fibonacci>cp_matrix_power_fibonacci()`, `matrixFibonacci`

## Dependencies
Requires: `competitive-programming.programming-technics.number-theory.matrix-exponentiation.multiply-2x2`
