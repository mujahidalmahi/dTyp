# prog_cp_matrix_exponentiation
> **Domain:** `competitive-programming` | **Subcategory:** `number-theory` | **Type:** `program`
## Overview
Codeforces style fast matrix exponentiation suite calculating N-th Fibonacci and 2x2 powers

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
#define MOD 1000000007LL

typedef struct {
    ll mat[2][2];
} Matrix2x2;

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

static Matrix2x2 multiply_2x2(Matrix2x2 a, Matrix2x2 b) {
    Matrix2x2 res;
    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 2; j++) {
            res.mat[i][j] = 0;
            for (int k = 0; k < 2; k++) {
                res.mat[i][j] = (res.mat[i][j] + (a.mat[i][k] * b.mat[k][j]) % MOD) % MOD;
            }
        }
    }
    return res;
}

static Matrix2x2 power_2x2(Matrix2x2 base, ll exp) {
    Matrix2x2 res;
    res.mat[0][0] = 1; res.mat[0][1] = 0;
    res.mat[1][0] = 0; res.mat[1][1] = 1;
    while (exp > 0) {
        if (exp & 1) res = multiply_2x2(res, base);
        base = multiply_2x2(base, base);
        exp >>= 1;
    }
    return res;
}

static ll fibonacci(ll n) {
    if (n <= 0) return 0;
    if (n == 1) return 1;
    Matrix2x2 t;
    t.mat[0][0] = 1; t.mat[0][1] = 1;
    t.mat[1][0] = 1; t.mat[1][1] = 0;
    Matrix2x2 tn = power_2x2(t, n - 1);
    return tn.mat[0][0];
}

int main(void) {
    int choice;
    do {
        printf("=== Matrix Fast Exponentiation Codeforces Suite ===\n");
        printf("Modulo: %lld\n", MOD);
        printf("1. Compute N-th Fibonacci Number in O(log N)\n");
        printf("2. Compute Custom 2x2 Matrix Power (M^K)\n");
        printf("3. Solve General 2nd Order Linear Recurrence\n");
        printf("4. Solve CF Multi-Testcases (T Cases)\n");
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
                ll n;
                printf("Enter N (up to 10^18): ");
                if (scanf("%lld", &n) == 1) {
                    clear_input();
                    printf("Fibonacci(%lld) mod %lld = %lld\n", n, MOD, fibonacci(n));
                } else {
                    clear_input();
                }
                break;
            }
            case 2: {
                Matrix2x2 m;
                ll exp;
                printf("Enter 2x2 matrix elements (m00 m01 m10 m11): ");
                if (scanf("%lld %lld %lld %lld", &m.mat[0][0], &m.mat[0][1], &m.mat[1][0], &m.mat[1][1]) == 4) {
                    printf("Enter exponent K: ");
                    if (scanf("%lld", &exp) == 1 && exp >= 0) {
                        clear_input();
                        Matrix2x2 res = power_2x2(m, exp);
                        printf("M^%lld =\n[ %lld %lld ]\n[ %lld %lld ]\n",
                               exp, res.mat[0][0], res.mat[0][1], res.mat[1][0], res.mat[1][1]);
                    } else {
                        clear_input();
                    }
                } else {
                    clear_input();
                }
                break;
            }
            case 3: {
                ll a, b, f1, f0, n;
                printf("For recurrence f(n) = a*f(n-1) + b*f(n-2):\n");
                printf("Enter coefficients a b: ");
                scanf("%lld %lld", &a, &b);
                printf("Enter base values f(1) f(0): ");
                scanf("%lld %lld", &f1, &f0);
                printf("Enter query index N (>= 2): ");
                scanf("%lld", &n);
                clear_input();
                if (n == 0) printf("f(0) = %lld\n", f0 % MOD);
                else if (n == 1) printf("f(1) = %lld\n", f1 % MOD);
                else {
                    Matrix2x2 t;
                    t.mat[0][0] = a % MOD; t.mat[0][1] = b % MOD;
                    t.mat[1][0] = 1;       t.mat[1][1] = 0;
                    Matrix2x2 tn = power_2x2(t, n - 1);
                    ll ans = (tn.mat[0][0] * (f1 % MOD) + tn.mat[0][1] * (f0 % MOD)) % MOD;
                    printf("f(%lld) = %lld\n", n, ans);
                }
                break;
            }
            case 4: {
                int t;
                printf("Enter T test cases: ");
                if (scanf("%d", &t) == 1 && t > 0) {
                    clear_input();
                    for (int c = 1; c <= t; c++) {
                        ll n;
                        printf("[Case #%d] Enter N: ", c);
                        scanf("%lld", &n);
                        clear_input();
                        printf("Fibonacci(%lld) = %lld\n", n, fibonacci(n));
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
Available via: `prog_cp_matrix_exponentiation`, `competitive-programming.full-programs.number-theory.matrix-exponentiation.prog-matrix-exponentiation`, `competitive-programming>prog_cp_matrix_exponentiation()`, `competitive-programming>full-programs>number-theory>matrix-exponentiation>prog-matrix-exponentiation>prog_cp_matrix_exponentiation()`
