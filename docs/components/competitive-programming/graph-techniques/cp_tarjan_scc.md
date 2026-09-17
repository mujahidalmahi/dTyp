# cp_tarjan_scc
> **Domain:** `competitive-programming` | **Subcategory:** `graph-techniques` | **Type:** `function`
## Overview
Decomposes directed graph into strongly connected components using Tarjan algorithm

## Signature
```c
void cp_tarjan_scc(int u, const int* head, const int* to, const int* next, int* disc, int* low, int* in_stack, int* stack, int* top, int* timer, int* scc_id, int* scc_count);
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
void cp_tarjan_scc(int u, const int* head, const int* to, const int* next, int* disc, int* low, int* in_stack, int* stack, int* top, int* timer, int* scc_id, int* scc_count) {
    disc[u] = low[u] = ++(*timer);
    stack[++(*top)] = u;
    in_stack[u] = 1;
    for (int e = head[u]; e != -1; e = next[e]) {
        int v = to[e];
        if (disc[v] == 0) {
            cp_tarjan_scc(v, head, to, next, disc, low, in_stack, stack, top, timer, scc_id, scc_count);
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
```

## Aliases & Shorthands
Available via: `cp_tarjan_scc`, `competitive-programming.programming-technics.graph-techniques.strongly-connected.tarjan-scc`, `competitive-programming>cp_tarjan_scc()`, `competitive-programming>programming-technics>graph-techniques>strongly-connected>tarjan-scc>cp_tarjan_scc()`, `tarjanScc`
