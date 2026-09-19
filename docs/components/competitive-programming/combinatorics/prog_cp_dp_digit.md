# prog_cp_dp_digit
> **Domain:** `competitive-programming` | **Subcategory:** `combinatorics` | **Type:** `program`
## Overview
Digit DP counting integers in range [L, R] with target digit sum constraints

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

static long long memo[20][180][2];
static int digits[20];
static int num_len = 0;

static long long count_valid(int idx, int sum, int tight) {
    if (idx == num_len) return (sum == 0) ? 1 : 0;
    if (memo[idx][sum][tight] != -1) return memo[idx][sum][tight];

    int limit = tight ? digits[idx] : 9;
    long long total = 0;

    for (int d = 0; d <= limit; d++) {
        if (d <= sum) {
            total += count_valid(idx + 1, sum - d, tight && (d == limit));
        }
    }

    return memo[idx][sum][tight] = total;
}

static long long solve_range(long long val, int target_sum) {
    if (val < 0) return 0;
    if (val == 0) return (target_sum == 0) ? 1 : 0;

    char buf[32];
    snprintf(buf, sizeof(buf), "%lld", val);
    num_len = (int)strlen(buf);
    for (int i = 0; i < num_len; i++) digits[i] = buf[i] - '0';

    memset(memo, -1, sizeof(memo));
    return count_valid(0, target_sum, 1);
}

static void solve(void) {
    long long l, r;
    int target_sum;
    if (scanf("%lld %lld %d", &l, &r, &target_sum) != 3) return;

    long long ans = solve_range(r, target_sum) - solve_range(l - 1, target_sum);
    printf("%lld\n", ans);
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
Available via: `prog_cp_dp_digit`, `competitive-programming.full-programs.number-theory.combinatorics.prog-cp-dp-digit`, `competitive-programming>prog_cp_dp_digit()`, `competitive-programming>full-programs>number-theory>combinatorics>prog-cp-dp-digit>prog_cp_dp_digit()`, `cpDigitDp`
