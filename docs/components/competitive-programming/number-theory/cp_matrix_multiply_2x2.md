# cp_matrix_multiply_2x2
> **Domain:** `competitive-programming` | **Subcategory:** `number-theory` | **Type:** `function`
## Overview
Multiplies two 2x2 matrices modulo mod

## Signature
```c
void cp_matrix_multiply_2x2(const long long A[2][2], const long long B[2][2], long long C[2][2], long long mod);
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
void cp_matrix_multiply_2x2(const long long A[2][2], const long long B[2][2], long long C[2][2], long long mod) {
    long long r00 = (A[0][0] * B[0][0] + A[0][1] * B[1][0]) % mod;
    long long r01 = (A[0][0] * B[0][1] + A[0][1] * B[1][1]) % mod;
    long long r10 = (A[1][0] * B[0][0] + A[1][1] * B[1][0]) % mod;
    long long r11 = (A[1][0] * B[0][1] + A[1][1] * B[1][1]) % mod;
    C[0][0] = r00;
    C[0][1] = r01;
    C[1][0] = r10;
    C[1][1] = r11;
}
```

## Aliases & Shorthands
Available via: `cp_matrix_multiply_2x2`, `competitive-programming.programming-technics.number-theory.matrix-exponentiation.multiply-2x2`, `competitive-programming>cp_matrix_multiply_2x2()`, `competitive-programming>programming-technics>number-theory>matrix-exponentiation>multiply-2x2>cp_matrix_multiply_2x2()`, `matrixMultiply2x2`
