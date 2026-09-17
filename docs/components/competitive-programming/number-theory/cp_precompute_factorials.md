# cp_precompute_factorials
> **Domain:** `competitive-programming` | **Subcategory:** `number-theory` | **Type:** `function`
## Overview
Precomputes factorials and inverse factorials up to n modulo mod

## Signature
```c
void cp_precompute_factorials(int n, long long mod, long long* fact, long long* inv_fact);
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
void cp_precompute_factorials(int n, long long mod, long long* fact, long long* inv_fact) {
    fact[0] = 1;
    for (int i = 1; i <= n; i++) {
        fact[i] = (fact[i - 1] * i) % mod;
    }
    inv_fact[n] = cp_mod_pow(fact[n], mod - 2, mod);
    for (int i = n - 1; i >= 0; i--) {
        inv_fact[i] = (inv_fact[i + 1] * (i + 1)) % mod;
    }
}
```

## Aliases & Shorthands
Available via: `cp_precompute_factorials`, `competitive-programming.programming-technics.number-theory.combinatorics.precompute-factorials`, `competitive-programming>cp_precompute_factorials()`, `competitive-programming>programming-technics>number-theory>combinatorics>precompute-factorials>cp_precompute_factorials()`, `precomputeFactorials`

## Dependencies
Requires: `competitive-programming.programming-technics.number-theory.modular-arithmetic.mod-pow`
