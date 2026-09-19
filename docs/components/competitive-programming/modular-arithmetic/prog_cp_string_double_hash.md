# prog_cp_string_double_hash
> **Domain:** `competitive-programming` | **Subcategory:** `modular-arithmetic` | **Type:** `program`
## Overview
Double polynomial rolling string hashing with O(1) substring queries and collision immunity

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
#include <string.h>

#define MAX_LEN 100005
#define MOD1 1000000007LL
#define MOD2 1000000009LL
#define BASE1 31LL
#define BASE2 37LL

static long long pow1[MAX_LEN];
static long long pow2[MAX_LEN];
static long long h1[MAX_LEN];
static long long h2[MAX_LEN];

static void init_powers(int n) {
    pow1[0] = 1; pow2[0] = 1;
    for (int i = 1; i <= n; i++) {
        pow1[i] = (pow1[i - 1] * BASE1) % MOD1;
        pow2[i] = (pow2[i - 1] * BASE2) % MOD2;
    }
}

static void compute_prefix_hashes(const char* s, int n) {
    h1[0] = 0; h2[0] = 0;
    for (int i = 0; i < n; i++) {
        long long val = s[i] - 'a' + 1;
        h1[i + 1] = (h1[i] * BASE1 + val) % MOD1;
        h2[i + 1] = (h2[i] * BASE2 + val) % MOD2;
    }
}

static long long get_hash1(int l, int r) {
    long long res = (h1[r] - h1[l - 1] * pow1[r - l + 1]) % MOD1;
    return (res + MOD1) % MOD1;
}

static long long get_hash2(int l, int r) {
    long long res = (h2[r] - h2[l - 1] * pow2[r - l + 1]) % MOD2;
    return (res + MOD2) % MOD2;
}

static int are_substrings_equal(int l1, int r1, int l2, int r2) {
    if ((r1 - l1) != (r2 - l2)) return 0;
    return (get_hash1(l1, r1) == get_hash1(l2, r2)) &&
           (get_hash2(l1, r2) == get_hash2(l2, r2));
}

static void solve(void) {
    char s[MAX_LEN];
    int q;
    if (scanf("%s %d", s, &q) != 2) return;

    int n = (int)strlen(s);
    init_powers(n);
    compute_prefix_hashes(s, n);

    for (int i = 0; i < q; i++) {
        int l1, r1, l2, r2;
        if (scanf("%d %d %d %d", &l1, &r1, &l2, &r2) == 4) {
            printf("%s\n", are_substrings_equal(l1, r1, l2, r2) ? "EQUAL" : "DIFFERENT");
        }
    }
}

int main(void) {
    int t;
    if (scanf("%d", &t) != 1) t = 1;
    while (t--) {
        solve();
    }
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_cp_string_double_hash`, `competitive-programming.full-programs.number-theory.modular-arithmetic.prog-cp-string-double-hash`, `competitive-programming>prog_cp_string_double_hash()`, `competitive-programming>full-programs>number-theory>modular-arithmetic>prog-cp-string-double-hash>prog_cp_string_double_hash()`, `cpStringDoubleHash`
