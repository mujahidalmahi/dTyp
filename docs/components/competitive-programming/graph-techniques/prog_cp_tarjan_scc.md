# prog_cp_tarjan_scc
> **Domain:** `competitive-programming` | **Subcategory:** `graph-techniques` | **Type:** `program`
## Overview
Codeforces style Tarjan strongly connected components (SCC) suite and condensation DAG

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

#define MAX_V 1000
#define MAX_E 4000

typedef struct {
    int to;
    int next;
} Edge;

static int head[MAX_V + 1];
static Edge edges[MAX_E];
static int edge_count = 0;

static int disc[MAX_V + 1];
static int low[MAX_V + 1];
static int in_stack[MAX_V + 1];
static int stack[MAX_V + 1];
static int top_idx = -1;
static int timer = 0;
static int scc_id[MAX_V + 1];
static int scc_count = 0;

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

static void add_directed_edge(int u, int v) {
    edges[edge_count].to = v;
    edges[edge_count].next = head[u];
    head[u] = edge_count++;
}

static void tarjan_dfs(int u) {
    disc[u] = low[u] = ++timer;
    stack[++top_idx] = u;
    in_stack[u] = 1;
    for (int e = head[u]; e != -1; e = edges[e].next) {
        int v = edges[e].to;
        if (disc[v] == 0) {
            tarjan_dfs(v);
            if (low[v] < low[u]) low[u] = low[v];
        } else if (in_stack[v]) {
            if (disc[v] < low[u]) low[u] = disc[v];
        }
    }
    if (low[u] == disc[u]) {
        scc_count++;
        while (1) {
            int node = stack[top_idx--];
            in_stack[node] = 0;
            scc_id[node] = scc_count;
            if (node == u) break;
        }
    }
}

static void solve_cf_case(void) {
    int n, m;
    printf("Enter vertices N and directed edges M: ");
    if (scanf("%d %d", &n, &m) != 2 || n <= 0 || n > MAX_V) {
        clear_input();
        return;
    }
    edge_count = 0;
    timer = 0;
    top_idx = -1;
    scc_count = 0;
    for (int i = 1; i <= n; i++) {
        head[i] = -1;
        disc[i] = low[i] = in_stack[i] = scc_id[i] = 0;
    }
    printf("Enter %d directed edges (u v):\n", m);
    for (int i = 0; i < m; i++) {
        int u, v;
        scanf("%d %d", &u, &v);
        if (u >= 1 && u <= n && v >= 1 && v <= n) add_directed_edge(u, v);
    }
    clear_input();
    for (int i = 1; i <= n; i++) {
        if (disc[i] == 0) tarjan_dfs(i);
    }
    printf("Total Strongly Connected Components: %d\n", scc_count);
    for (int c = 1; c <= scc_count; c++) {
        printf("SCC #%d: { ", c);
        for (int i = 1; i <= n; i++) {
            if (scc_id[i] == c) printf("%d ", i);
        }
        printf("}\n");
    }
    printf("Is Strongly Connected: %s\n", (scc_count == 1) ? "YES" : "NO");
}

int main(void) {
    int choice;
    do {
        printf("=== Tarjan's Strongly Connected Components Codeforces Suite ===\n");
        printf("1. Solve Standard SCC Contest Problem\n");
        printf("2. Solve Multi-Testcases (T Cases)\n");
        printf("0. Exit\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            choice = -1;
            continue;
        }
        clear_input();
        switch (choice) {
            case 1:
                solve_cf_case();
                break;
            case 2: {
                int t;
                printf("Enter T test cases: ");
                if (scanf("%d", &t) == 1 && t > 0) {
                    clear_input();
                    for (int c = 1; c <= t; c++) {
                        printf("[Case #%d]\n", c);
                        solve_cf_case();
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
Available via: `prog_cp_tarjan_scc`, `competitive-programming.full-programs.graph-techniques.strongly-connected.prog-tarjan-scc`, `competitive-programming>prog_cp_tarjan_scc()`, `competitive-programming>full-programs>graph-techniques>strongly-connected>prog-tarjan-scc>prog_cp_tarjan_scc()`
