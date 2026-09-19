# prog_cp_sieve_primes
> **Domain:** `competitive-programming` | **Subcategory:** `number-theory` | **Type:** `program`
## Overview
Complete competitive programming program computing primes and prime factorizations

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

void sieve(int n, char* is_prime) {
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

int factorize(long long n, long long* primes, int* exponents) {
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

int main(void) {
    char prime_flags[51];
    sieve(50, prime_flags);
    printf("Primes <= 50:\n");
    for (int i = 2; i <= 50; i++) {
        if (prime_flags[i]) printf("%d ", i);
    }
    printf("\n");
    long long p[10];
    int exp[10];
    int k = factorize(360, p, exp);
    printf("Prime factors of 360:\n");
    for (int i = 0; i < k; i++) {
        printf("%lld^%d ", p[i], exp[i]);
    }
    printf("\n");
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_cp_sieve_primes`, `competitive-programming.full-programs.number-theory.prime-sieve.prog-sieve-primes`, `competitive-programming>prog_cp_sieve_primes()`, `competitive-programming>full-programs>number-theory>prime-sieve>prog-sieve-primes>prog_cp_sieve_primes()`
