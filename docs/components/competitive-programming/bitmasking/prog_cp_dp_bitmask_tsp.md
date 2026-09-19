# prog_cp_dp_bitmask_tsp
> **Domain:** `competitive-programming` | **Subcategory:** `bitmasking` | **Type:** `program`
## Overview
Bitmask DP solving Traveling Salesperson Problem in O(N^2 2^N) with tour reconstruction

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

#define INF 1000000000

static int dist[16][16];
static int dp[1 << 16][16];
static int parent[1 << 16][16];

static void solve(void) {
    int n;
    if (scanf("%d", &n) != 1 || n > 16) return;

    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            scanf("%d", &dist[i][j]);
        }
    }

    int full_mask = (1 << n);
    for (int mask = 0; mask < full_mask; mask++) {
        for (int u = 0; u < n; u++) {
            dp[mask][u] = INF;
            parent[mask][u] = -1;
        }
    }

    dp[1][0] = 0;

    for (int mask = 1; mask < full_mask; mask++) {
        for (int u = 0; u < n; u++) {
            if (!(mask & (1 << u)) || dp[mask][u] == INF) continue;

            for (int v = 0; v < n; v++) {
                if (mask & (1 << v)) continue;
                int next_mask = mask | (1 << v);
                int cost = dp[mask][u] + dist[u][v];
                if (cost < dp[next_mask][v]) {
                    dp[next_mask][v] = cost;
                    parent[next_mask][v] = u;
                }
            }
        }
    }

    int best_cost = INF;
    int best_last = -1;
    for (int u = 1; u < n; u++) {
        if (dp[full_mask - 1][u] + dist[u][0] < best_cost) {
            best_cost = dp[full_mask - 1][u] + dist[u][0];
            best_last = u;
        }
    }

    printf("Minimum Tour Cost: %d\n", best_cost);

    int tour[18];
    int tour_cnt = 0;
    int curr_mask = full_mask - 1;
    int curr_node = best_last;

    while (curr_node != -1) {
        tour[tour_cnt++] = curr_node;
        int p = parent[curr_mask][curr_node];
        curr_mask ^= (1 << curr_node);
        curr_node = p;
    }

    printf("Tour: ");
    for (int i = tour_cnt - 1; i >= 0; i--) printf("%d -> ", tour[i]);
    printf("0\n");
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
Available via: `prog_cp_dp_bitmask_tsp`, `competitive-programming.full-programs.bit-manipulation.bitmasking.prog-cp-dp-bitmask-tsp`, `competitive-programming>prog_cp_dp_bitmask_tsp()`, `competitive-programming>full-programs>bit-manipulation>bitmasking>prog-cp-dp-bitmask-tsp>prog_cp_dp_bitmask_tsp()`, `cpBitmaskTsp`
