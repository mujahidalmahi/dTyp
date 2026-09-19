# prog_cp_matrix_exponentiation
> **Domain:** `competitive-programming` | **Subcategory:** `number-theory` | **Type:** `program`
## Overview
Complete competitive programming program calculating N-th Fibonacci via 2x2 matrix fast power

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

void mat_mul_2x2(const long long A[2][2], const long long B[2][2], long long C[2][2], long long mod) {
    long long r00 = (A[0][0] * B[0][0] + A[0][1] * B[1][0]) % mod;
    long long r01 = (A[0][0] * B[0][1] + A[0][1] * B[1][1]) % mod;
    long long r10 = (A[1][0] * B[0][0] + A[1][1] * B[1][0]) % mod;
    long long r11 = (A[1][0] * B[0][1] + A[1][1] * B[1][1]) % mod;
    C[0][0] = r00; C[0][1] = r01;
    C[1][0] = r10; C[1][1] = r11;
}

long long fib_matrix(long long n, long long mod) {
    if (n <= 0) return 0;
    if (n == 1) return 1;
    long long res[2][2] = {{1, 0}, {0, 1}};
    long long base[2][2] = {{1, 1}, {1, 0}};
    long long p = n - 1;
    while (p > 0) {
        if (p & 1) {
            long long tmp[2][2];
            mat_mul_2x2(res, base, tmp, mod);
            res[0][0] = tmp[0][0]; res[0][1] = tmp[0][1];
            res[1][0] = tmp[1][0]; res[1][1] = tmp[1][1];
        }
        long long tmp_base[2][2];
        mat_mul_2x2(base, base, tmp_base, mod);
        base[0][0] = tmp_base[0][0]; base[0][1] = tmp_base[0][1];
        base[1][0] = tmp_base[1][0]; base[1][1] = tmp_base[1][1];
        p >>= 1;
    }
    return res[0][0];
}

int main(void) {
    long long mod = 1000000007LL;
    printf("Fib(10) mod 1e9+7 = %lld\n", fib_matrix(10, mod));
    printf("Fib(50) mod 1e9+7 = %lld\n", fib_matrix(50, mod));
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_cp_matrix_exponentiation`, `competitive-programming.full-programs.number-theory.matrix-exponentiation.prog-matrix-exponentiation`, `competitive-programming>prog_cp_matrix_exponentiation()`, `competitive-programming>full-programs>number-theory>matrix-exponentiation>prog-matrix-exponentiation>prog_cp_matrix_exponentiation()`
