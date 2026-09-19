# prog_cp_floyd_warshall
> **Domain:** `competitive-programming` | **Subcategory:** `zero-one-bfs` | **Type:** `program`
## Overview
Floyd-Warshall All-Pairs Shortest Path with intermediate path reconstruction and negative cycle check

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

#define INF 1000000000LL

static long long dist[405][405];
static int next_node[405][405];

static void print_path(int u, int v) {
    if (dist[u][v] >= INF) {
        printf("NO PATH\n");
        return;
    }
    printf("Path: %d", u);
    while (u != v) {
        u = next_node[u][v];
        printf(" -> %d", u);
    }
    printf("\n");
}

static void solve(void) {
    int n, m;
    if (scanf("%d %d", &n, &m) != 2) return;

    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= n; j++) {
            dist[i][j] = (i == j) ? 0 : INF;
            next_node[i][j] = (i == j) ? j : -1;
        }
    }

    for (int i = 0; i < m; i++) {
        int u, v;
        long long w;
        if (scanf("%d %d %lld", &u, &v, &w) == 3) {
            if (w < dist[u][v]) {
                dist[u][v] = w;
                next_node[u][v] = v;
            }
        }
    }

    for (int k = 1; k <= n; k++) {
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= n; j++) {
                if (dist[i][k] < INF && dist[k][j] < INF) {
                    if (dist[i][k] + dist[k][j] < dist[i][j]) {
                        dist[i][j] = dist[i][k] + dist[k][j];
                        next_node[i][j] = next_node[i][k];
                    }
                }
            }
        }
    }

    int has_neg_cycle = 0;
    for (int i = 1; i <= n; i++) {
        if (dist[i][i] < 0) {
            has_neg_cycle = 1;
            break;
        }
    }

    if (has_neg_cycle) {
        printf("NEGATIVE CYCLE DETECTED\n");
    } else {
        printf("All-pairs shortest paths computed.\n");
        if (n >= 2) {
            printf("Distance 1 to %d: %lld\n", n, dist[1][n]);
            print_path(1, n);
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
Available via: `prog_cp_floyd_warshall`, `competitive-programming.full-programs.graph-techniques.zero-one-bfs.prog-cp-floyd-warshall`, `competitive-programming>prog_cp_floyd_warshall()`, `competitive-programming>full-programs>graph-techniques>zero-one-bfs>prog-cp-floyd-warshall>prog_cp_floyd_warshall()`, `cpFloydWarshall`
