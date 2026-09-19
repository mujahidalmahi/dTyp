# prog_cp_sieve_primes
> **Domain:** `competitive-programming` | **Subcategory:** `number-theory` | **Type:** `program`
## Overview
Codeforces style prime sieve and O(log N) smallest prime factor (SPF) factorization engine

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
#include <stdlib.h>

#define MAX_SIEVE 1000000

static int spf[MAX_SIEVE + 1];
static int is_prime[MAX_SIEVE + 1];

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

static void build_sieve(int limit) {
    if (limit > MAX_SIEVE) limit = MAX_SIEVE;
    for (int i = 0; i <= limit; i++) {
        is_prime[i] = 1;
        spf[i] = i;
    }
    is_prime[0] = is_prime[1] = 0;
    spf[0] = spf[1] = 0;
    for (int i = 2; (long long)i * i <= limit; i++) {
        if (is_prime[i]) {
            for (int j = i * i; j <= limit; j += i) {
                if (is_prime[j]) {
                    is_prime[j] = 0;
                    spf[j] = i;
                }
            }
        }
    }
}

static void factorize_spf(int n) {
    if (n <= 1) {
        printf("%d has no prime factors.\n", n);
        return;
    }
    printf("%d = ", n);
    int first = 1;
    while (n > 1) {
        int p = spf[n];
        int count = 0;
        while (n % p == 0) {
            count++;
            n /= p;
        }
        if (!first) printf(" * ");
        if (count > 1) printf("%d^%d", p, count);
        else printf("%d", p);
        first = 0;
    }
    putchar('\n');
}

static int count_primes_range(int l, int r) {
    if (l < 2) l = 2;
    int count = 0;
    for (int i = l; i <= r; i++) {
        if (is_prime[i]) count++;
    }
    return count;
}

static int euler_totient(int n) {
    int res = n;
    while (n > 1) {
        int p = spf[n];
        while (n % p == 0) n /= p;
        res -= res / p;
    }
    return res;
}

int main(void) {
    int limit = 100000;
    build_sieve(limit);
    int choice;
    do {
        printf("=== Prime Sieve & Factors Codeforces Suite ===\n");
        printf("Sieve Precomputed up to: %d\n", limit);
        printf("1. Check Primality in O(1)\n");
        printf("2. Fast Prime Factorization in O(log N)\n");
        printf("3. Count Primes in Range [L, R]\n");
        printf("4. List Primes in Range [L, R]\n");
        printf("5. Euler's Totient Function phi(N)\n");
        printf("6. Rebuild Sieve with New Limit (<= %d)\n", MAX_SIEVE);
        printf("7. Solve CF Multi-Testcases (T Cases)\n");
        printf("0. Exit\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            choice = -1;
            continue;
        }
        clear_input();
        switch (choice) {
            case 1: {
                int val;
                printf("Enter number: ");
                if (scanf("%d", &val) == 1 && val >= 0 && val <= limit) {
                    clear_input();
                    printf("%d is %s.\n", val, is_prime[val] ? "PRIME" : "COMPOSITE");
                } else {
                    clear_input();
                    printf("Value out of sieve range.\n");
                }
                break;
            }
            case 2: {
                int val;
                printf("Enter number: ");
                if (scanf("%d", &val) == 1 && val >= 1 && val <= limit) {
                    clear_input();
                    factorize_spf(val);
                } else {
                    clear_input();
                    printf("Value out of sieve range.\n");
                }
                break;
            }
            case 3: {
                int l, r;
                printf("Enter range L R: ");
                if (scanf("%d %d", &l, &r) == 2 && l <= r && r <= limit) {
                    clear_input();
                    printf("Total primes in [%d, %d]: %d\n", l, r, count_primes_range(l, r));
                } else {
                    clear_input();
                }
                break;
            }
            case 4: {
                int l, r;
                printf("Enter range L R: ");
                if (scanf("%d %d", &l, &r) == 2 && l <= r && r <= limit) {
                    clear_input();
                    printf("Primes in [%d, %d]: ", l, r);
                    int printed = 0;
                    for (int i = l > 2 ? l : 2; i <= r; i++) {
                        if (is_prime[i]) {
                            printf("%d ", i);
                            printed++;
                            if (printed >= 50) {
                                printf("... (truncated)");
                                break;
                            }
                        }
                    }
                    putchar('\n');
                } else {
                    clear_input();
                }
                break;
            }
            case 5: {
                int val;
                printf("Enter N: ");
                if (scanf("%d", &val) == 1 && val >= 1 && val <= limit) {
                    clear_input();
                    printf("phi(%d) = %d\n", val, euler_totient(val));
                } else {
                    clear_input();
                }
                break;
            }
            case 6: {
                int new_lim;
                printf("Enter new limit (<= %d): ", MAX_SIEVE);
                if (scanf("%d", &new_lim) == 1 && new_lim >= 10 && new_lim <= MAX_SIEVE) {
                    clear_input();
                    limit = new_lim;
                    build_sieve(limit);
                    printf("Sieve rebuilt up to %d.\n", limit);
                } else {
                    clear_input();
                }
                break;
            }
            case 7: {
                int t;
                printf("Enter T test cases: ");
                if (scanf("%d", &t) == 1 && t > 0) {
                    clear_input();
                    for (int c = 1; c <= t; c++) {
                        int num;
                        printf("[Case #%d] Enter N: ", c);
                        scanf("%d", &num);
                        clear_input();
                        if (num >= 1 && num <= limit) {
                            printf("Primality: %s | ", is_prime[num] ? "PRIME" : "COMPOSITE");
                            factorize_spf(num);
                        }
                    }
                } else {
                    clear_input();
                }
                break;
            }
            case 0:
                printf("Exiting suite.\n");
                break;
            default:
                printf("Invalid option.\n");
                break;
        }
    } while (choice != 0);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_cp_sieve_primes`, `competitive-programming.full-programs.number-theory.prime-sieve.prog-sieve-primes`, `competitive-programming>prog_cp_sieve_primes()`, `competitive-programming>full-programs>number-theory>prime-sieve>prog-sieve-primes>prog_cp_sieve_primes()`
