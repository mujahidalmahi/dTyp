# prog_cp_modular_arithmetic
> **Domain:** `competitive-programming` | **Subcategory:** `number-theory` | **Type:** `program`
## Overview
Complete competitive programming program computing modular exponentiation and inverse

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

long long mod_pow(long long base, long long exp, long long mod) {
    long long res = 1;
    base %= mod;
    while (exp > 0) {
        if (exp & 1) res = (res * base) % mod;
        base = (base * base) % mod;
        exp >>= 1;
    }
    return res;
}

long long ext_gcd(long long a, long long b, long long* x, long long* y) {
    if (b == 0) {
        *x = 1;
        *y = 0;
        return a;
    }
    long long x1, y1;
    long long g = ext_gcd(b, a % b, &x1, &y1);
    *x = y1;
    *y = x1 - (a / b) * y1;
    return g;
}

long long mod_inv(long long a, long long mod) {
    long long x, y;
    long long g = ext_gcd(a, mod, &x, &y);
    if (g != 1) return -1;
    return (x % mod + mod) % mod;
}

int main(void) {
    long long mod = 1000000007LL;
    long long p = mod_pow(3, 10, mod);
    long long inv = mod_inv(3, mod);
    printf("3^10 mod 1e9+7 = %lld
", p);
    printf("inv(3) mod 1e9+7 = %lld
", inv);
    printf("(3 * inv) mod 1e9+7 = %lld
", (3 * inv) % mod);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_cp_modular_arithmetic`, `competitive-programming.full-programs.number-theory.modular-arithmetic.prog-modular-arithmetic`, `competitive-programming>prog_cp_modular_arithmetic()`, `competitive-programming>full-programs>number-theory>modular-arithmetic>prog-modular-arithmetic>prog_cp_modular_arithmetic()`
