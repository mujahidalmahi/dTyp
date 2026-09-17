# cp_sieve_eratosthenes
> **Domain:** `competitive-programming` | **Subcategory:** `number-theory` | **Type:** `function`
## Overview
Generates primality array up to n using the Sieve of Eratosthenes

## Signature
```c
void cp_sieve_eratosthenes(int n, char* is_prime);
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
void cp_sieve_eratosthenes(int n, char* is_prime) {
    for (int i = 0; i <= n; i++) is_prime[i] = 1;
    is_prime[0] = 0;
    if (n >= 1) is_prime[1] = 0;
    for (int p = 2; p * p <= n; p++) {
        if (is_prime[p]) {
            for (int i = p * p; i <= n; i += p) {
                is_prime[i] = 0;
            }
        }
    }
}
```

## Aliases & Shorthands
Available via: `cp_sieve_eratosthenes`, `competitive-programming.programming-technics.number-theory.prime-sieve.sieve-eratosthenes`, `competitive-programming>cp_sieve_eratosthenes()`, `competitive-programming>programming-technics>number-theory>prime-sieve>sieve-eratosthenes>cp_sieve_eratosthenes()`, `sieveEratosthenes`
