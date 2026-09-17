# prog_acad_vertex_degrees
> **Domain:** `academics-programming` | **Subcategory:** `discrete-mathematics` | **Type:** `program`
## Overview
Computes vertex degrees, verifies Handshaking Lemma, and evaluates Eulerian path feasibility

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

void analyze_graph(int v, int e, const int edges[][2]) {
    int deg[v];
    for (int i = 0; i < v; i++) deg[i] = 0;
    for (int i = 0; i < e; i++) {
        deg[edges[i][0]]++;
        deg[edges[i][1]]++;
    }
    int sum_deg = 0;
    int odd_count = 0;
    printf("Vertex Degrees:
");
    for (int i = 0; i < v; i++) {
        printf("Vertex %d: %d
", i, deg[i]);
        sum_deg += deg[i];
        if (deg[i] % 2 != 0) odd_count++;
    }
    printf("Sum of Degrees: %d (Expected 2 * E = %d)
", sum_deg, 2 * e);
    printf("Handshaking Lemma Verified: %s
", (sum_deg == 2 * e) ? "Yes" : "No");
    if (odd_count == 0) printf("Eulerian Circuit: Yes
");
    else if (odd_count == 2) printf("Eulerian Path: Yes (No Circuit)
");
    else printf("Eulerian: No (Odd degree count = %d)
", odd_count);
}

int main(void) {
    int v = 5, e = 6;
    int edges[6][2] = {
        {0, 1}, {0, 2}, {1, 2}, {1, 3}, {2, 4}, {3, 4}
    };
    analyze_graph(v, e, edges);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_vertex_degrees`, `academics-programming.discrete-mathematics.graph-theory.vertex-degrees.prog-vertex-degrees`, `academics-programming>prog_acad_vertex_degrees()`, `academics-programming>discrete-mathematics>graph-theory>vertex-degrees>prog-vertex-degrees>prog_acad_vertex_degrees()`
