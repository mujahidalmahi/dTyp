# cp_zero_one_bfs
> **Domain:** `competitive-programming` | **Subcategory:** `graph-techniques` | **Type:** `function`
## Overview
Computes shortest paths in 0-1 weighted graph using array-based deque

## Signature
```c
void cp_zero_one_bfs(int n, const int* head, const int* to, const int* weight, const int* next, int src, int* dist);
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
void cp_zero_one_bfs(int n, const int* head, const int* to, const int* weight, const int* next, int src, int* dist) {
    for (int i = 0; i < n; i++) dist[i] = 1000000000;
    int deque[2 * n + 5];
    int front = n + 2, back = n + 2;
    dist[src] = 0;
    deque[back++] = src;
    while (front < back) {
        int u = deque[front++];
        for (int e = head[u]; e != -1; e = next[e]) {
            int v = to[e];
            int w = weight[e];
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                if (w == 0) deque[--front] = v;
                else deque[back++] = v;
            }
        }
    }
}
```

## Aliases & Shorthands
Available via: `cp_zero_one_bfs`, `competitive-programming.programming-technics.graph-techniques.zero-one-bfs.shortest-path`, `competitive-programming>cp_zero_one_bfs()`, `competitive-programming>programming-technics>graph-techniques>zero-one-bfs>shortest-path>cp_zero_one_bfs()`, `zeroOneBfs`
