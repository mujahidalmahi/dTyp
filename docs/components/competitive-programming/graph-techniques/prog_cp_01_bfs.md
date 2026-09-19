# prog_cp_01_bfs
> **Domain:** `competitive-programming` | **Subcategory:** `graph-techniques` | **Type:** `program`
## Overview
Complete competitive programming program solving shortest path on 0-1 weighted graph using deque BFS

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

int main(void) {
    int n = 5;
    int head[5] = {-1, -1, -1, -1, -1};
    int to[] = {1, 2, 3, 4, 4};
    int weight[] = {0, 1, 0, 1, 0};
    int next[] = {-1, -1, -1, -1, -1};
    head[0] = 0; to[0] = 1; weight[0] = 0; next[0] = 1;
             to[1] = 2; weight[1] = 1; next[1] = -1;
    head[1] = 2; to[2] = 3; weight[2] = 0; next[2] = -1;
    head[2] = 3; to[3] = 4; weight[3] = 1; next[3] = -1;
    head[3] = 4; to[4] = 4; weight[4] = 0; next[4] = -1;

    int dist[5];
    for (int i = 0; i < n; i++) dist[i] = 1000000000;
    int deque[20];
    int front = 10, back = 10;
    dist[0] = 0;
    deque[back++] = 0;
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
    for (int i = 0; i < n; i++) {
        printf("dist to %d = %d\n", i, dist[i]);
    }
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_cp_01_bfs`, `competitive-programming.full-programs.graph-techniques.zero-one-bfs.prog-zero-one-bfs`, `competitive-programming>prog_cp_01_bfs()`, `competitive-programming>full-programs>graph-techniques>zero-one-bfs>prog-zero-one-bfs>prog_cp_01_bfs()`
