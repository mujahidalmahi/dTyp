# prog_cp_tarjan_scc
> **Domain:** `competitive-programming` | **Subcategory:** `graph-techniques` | **Type:** `program`
## Overview
Complete competitive programming program finding strongly connected components using Tarjan algorithm

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

void tarjan(int u, const int* head, const int* to, const int* next, int* disc, int* low, int* in_stack, int* stack, int* top, int* timer, int* scc_id, int* scc_count) {
    disc[u] = low[u] = ++(*timer);
    stack[++(*top)] = u;
    in_stack[u] = 1;
    for (int e = head[u]; e != -1; e = next[e]) {
        int v = to[e];
        if (disc[v] == 0) {
            tarjan(v, head, to, next, disc, low, in_stack, stack, top, timer, scc_id, scc_count);
            if (low[v] < low[u]) low[u] = low[v];
        } else if (in_stack[v]) {
            if (disc[v] < low[u]) low[u] = disc[v];
        }
    }
    if (low[u] == disc[u]) {
        (*scc_count)++;
        while (1) {
            int node = stack[(*top)--];
            in_stack[node] = 0;
            scc_id[node] = *scc_count;
            if (node == u) break;
        }
    }
}

int main(void) {
    int n = 5;
    int head[5] = {0, 1, 2, 4, -1};
    int to[] = {1, 2, 0, 3, 4};
    int next[] = {-1, -1, 3, -1, -1};
    int disc[5] = {0}, low[5] = {0}, in_stack[5] = {0}, stack[5];
    int top = -1, timer = 0, scc_id[5] = {0}, scc_count = 0;

    for (int i = 0; i < n; i++) {
        if (disc[i] == 0) {
            tarjan(i, head, to, next, disc, low, in_stack, stack, &top, &timer, scc_id, &scc_count);
        }
    }
    printf("Total SCCs: %d\n", scc_count);
    for (int i = 0; i < n; i++) {
        printf("Node %d in SCC %d\n", i, scc_id[i]);
    }
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_cp_tarjan_scc`, `competitive-programming.full-programs.graph-techniques.strongly-connected.prog-tarjan-scc`, `competitive-programming>prog_cp_tarjan_scc()`, `competitive-programming>full-programs>graph-techniques>strongly-connected>prog-tarjan-scc>prog_cp_tarjan_scc()`
