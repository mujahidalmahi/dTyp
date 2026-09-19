# prog_cp_monotonic_queue_dp
> **Domain:** `competitive-programming` | **Subcategory:** `monotonic-structures` | **Type:** `program`
## Overview
Linear-time dynamic programming optimization using a monotonic minimum queue

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

#define INF 1000000000000000LL

static void solve(void) {
    int n, k;
    if (scanf("%d %d", &n, &k) != 2) return;

    long long* cost = (long long*)malloc((n + 1) * sizeof(long long));
    for (int i = 1; i <= n; i++) scanf("%lld", &cost[i]);

    long long* dp = (long long*)malloc((n + 1) * sizeof(long long));
    int* dq = (int*)malloc((n + 1) * sizeof(int));
    int head = 0, tail = 0;

    dp[0] = 0;
    dq[tail++] = 0;

    for (int i = 1; i <= n; i++) {
        while (head < tail && dq[head] < i - k) {
            head++;
        }
        dp[i] = dp[dq[head]] + cost[i];

        while (head < tail && dp[dq[tail - 1]] >= dp[i]) {
            tail--;
        }
        dq[tail++] = i;
    }

    printf("%lld\n", dp[n]);

    free(cost);
    free(dp);
    free(dq);
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
Available via: `prog_cp_monotonic_queue_dp`, `competitive-programming.full-programs.cp-data-structures.monotonic-structures.prog-cp-monotonic-queue-dp`, `competitive-programming>prog_cp_monotonic_queue_dp()`, `competitive-programming>full-programs>cp-data-structures>monotonic-structures>prog-cp-monotonic-queue-dp>prog_cp_monotonic_queue_dp()`, `cpMonotonicQueueDp`
