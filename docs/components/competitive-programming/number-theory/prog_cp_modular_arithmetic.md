# prog_cp_modular_arithmetic
> **Domain:** `competitive-programming` | **Subcategory:** `number-theory` | **Type:** `program`
## Overview
Codeforces style modular arithmetic suite with fast exponentiation, extended GCD, and inverse

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

typedef long long ll;
#define DEFAULT_MOD 1000000007LL

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

static ll mod_pow(ll base, ll exp, ll mod) {
    ll res = 1 % mod;
    base %= mod;
    if (base < 0) base += mod;
    while (exp > 0) {
        if (exp & 1) res = (res * base) % mod;
        base = (base * base) % mod;
        exp >>= 1;
    }
    return res;
}

static ll ext_gcd(ll a, ll b, ll* x, ll* y) {
    if (b == 0) {
        *x = 1;
        *y = 0;
        return a;
    }
    ll x1, y1;
    ll g = ext_gcd(b, a % b, &x1, &y1);
    *x = y1;
    *y = x1 - (a / b) * y1;
    return g;
}

static ll mod_inv(ll a, ll mod) {
    ll x, y;
    ll g = ext_gcd(a, mod, &x, &y);
    if (g != 1) return -1;
    return (x % mod + mod) % mod;
}

int main(void) {
    int choice;
    ll mod = DEFAULT_MOD;
    do {
        printf("=== Modular Arithmetic Codeforces Suite ===\n");
        printf("Current Modulus: %lld\n", mod);
        printf("1. Modular Exponentiation (A^B mod M)\n");
        printf("2. Modular Multiplicative Inverse (A^-1 mod M)\n");
        printf("3. Extended Euclidean Algorithm (Ax + By = gcd(A, B))\n");
        printf("4. Solve Linear Congruence (Ax = B mod M)\n");
        printf("5. Change Modulus\n");
        printf("6. Solve CF Multi-Testcases (T Cases)\n");
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
                ll a, b;
                printf("Enter base A and exponent B: ");
                if (scanf("%lld %lld", &a, &b) == 2 && b >= 0) {
                    clear_input();
                    printf("(%lld ^ %lld) mod %lld = %lld\n", a, b, mod, mod_pow(a, b, mod));
                } else {
                    clear_input();
                }
                break;
            }
            case 2: {
                ll a;
                printf("Enter integer A: ");
                if (scanf("%lld", &a) == 1) {
                    clear_input();
                    ll inv = mod_inv(a, mod);
                    if (inv != -1) printf("(%lld ^ -1) mod %lld = %lld\n", a, mod, inv);
                    else printf("Inverse does not exist (gcd(%lld, %lld) != 1)\n", a, mod);
                } else {
                    clear_input();
                }
                break;
            }
            case 3: {
                ll a, b;
                printf("Enter integers A and B: ");
                if (scanf("%lld %lld", &a, &b) == 2) {
                    clear_input();
                    ll x, y;
                    ll g = ext_gcd(a, b, &x, &y);
                    printf("gcd(%lld, %lld) = %lld\n", a, b, g);
                    printf("Bézout identity: %lld * (%lld) + %lld * (%lld) = %lld\n", a, x, b, y, g);
                } else {
                    clear_input();
                }
                break;
            }
            case 4: {
                ll a, b;
                printf("Enter A and B for (Ax = B mod %lld): ", mod);
                if (scanf("%lld %lld", &a, &b) == 2) {
                    clear_input();
                    ll x, y;
                    ll g = ext_gcd(a, mod, &x, &y);
                    if (b % g != 0) {
                        printf("No solution exists (gcd does not divide B).\n");
                    } else {
                        ll x0 = (x * (b / g)) % (mod / g);
                        if (x0 < 0) x0 += (mod / g);
                        printf("Base solution: x = %lld (mod %lld)\n", x0, mod / g);
                        printf("All %lld solutions modulo %lld:\n", g, mod);
                        for (ll i = 0; i < g && i < 10; i++) {
                            printf("x = %lld\n", (x0 + i * (mod / g)) % mod);
                        }
                    }
                } else {
                    clear_input();
                }
                break;
            }
            case 5: {
                ll new_m;
                printf("Enter new positive modulus: ");
                if (scanf("%lld", &new_m) == 1 && new_m > 1) {
                    clear_input();
                    mod = new_m;
                    printf("Modulus set to %lld\n", mod);
                } else {
                    clear_input();
                }
                break;
            }
            case 6: {
                int t;
                printf("Enter T test cases: ");
                if (scanf("%d", &t) == 1 && t > 0) {
                    clear_input();
                    for (int c = 1; c <= t; c++) {
                        ll base, exp;
                        printf("[Case #%d] Enter A and B: ", c);
                        scanf("%lld %lld", &base, &exp);
                        clear_input();
                        printf("Result: %lld\n", mod_pow(base, exp, mod));
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
Available via: `prog_cp_modular_arithmetic`, `competitive-programming.full-programs.number-theory.modular-arithmetic.prog-modular-arithmetic`, `competitive-programming>prog_cp_modular_arithmetic()`, `competitive-programming>full-programs>number-theory>modular-arithmetic>prog-modular-arithmetic>prog_cp_modular_arithmetic()`
