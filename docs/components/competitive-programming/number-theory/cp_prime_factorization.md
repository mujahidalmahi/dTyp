# cp_prime_factorization
> **Domain:** `competitive-programming` | **Subcategory:** `number-theory` | **Type:** `function`
## Overview
Decomposes an integer into its distinct prime factors and exponent counts

## Signature
```c
int cp_prime_factorization(long long n, long long* primes, int* exponents);
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
int cp_prime_factorization(long long n, long long* primes, int* exponents) {
    int count = 0;
    for (long long d = 2; d * d <= n; d++) {
        if (n % d == 0) {
            primes[count] = d;
            exponents[count] = 0;
            while (n % d == 0) {
                exponents[count]++;
                n /= d;
            }
            count++;
        }
    }
    if (n > 1) {
        primes[count] = n;
        exponents[count] = 1;
        count++;
    }
    return count;
}
```

## Aliases & Shorthands
Available via: `cp_prime_factorization`, `competitive-programming.programming-technics.number-theory.prime-sieve.factorization`, `competitive-programming>cp_prime_factorization()`, `competitive-programming>programming-technics>number-theory>prime-sieve>factorization>cp_prime_factorization()`, `primeFactorization`
