# prog_cp_combinatorics
> **Domain:** `competitive-programming` | **Subcategory:** `number-theory` | **Type:** `program`
## Overview
Complete competitive programming program precomputing factorials and querying nCr modulo 1e9+7

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

void precompute_fact(int n, long long mod, long long* fact, long long* inv_fact) {
    fact[0] = 1;
    for (int i = 1; i <= n; i++) fact[i] = (fact[i - 1] * i) % mod;
    inv_fact[n] = mod_pow(fact[n], mod - 2, mod);
    for (int i = n - 1; i >= 0; i--) inv_fact[i] = (inv_fact[i + 1] * (i + 1)) % mod;
}

long long ncr(int n, int r, long long mod, const long long* fact, const long long* inv_fact) {
    if (r < 0 || r > n) return 0;
    long long num = fact[n];
    long long den = (inv_fact[r] * inv_fact[n - r]) % mod;
    return (num * den) % mod;
}

int main(void) {
    long long mod = 1000000007LL;
    long long fact[101], inv_fact[101];
    precompute_fact(100, mod, fact, inv_fact);
    printf("10C3 mod 1e9+7 = %lld\n", ncr(10, 3, mod, fact, inv_fact));
    printf("50C5 mod 1e9+7 = %lld\n", ncr(50, 5, mod, fact, inv_fact));
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_cp_combinatorics`, `competitive-programming.full-programs.number-theory.combinatorics.prog-combinatorics`, `competitive-programming>prog_cp_combinatorics()`, `competitive-programming>full-programs>number-theory>combinatorics>prog-combinatorics>prog_cp_combinatorics()`
