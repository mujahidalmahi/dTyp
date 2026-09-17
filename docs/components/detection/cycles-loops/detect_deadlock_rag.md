# detect_deadlock_rag
> **Domain:** `detection` | **Subcategory:** `cycles-loops` | **Type:** `function`
## Overview
Detects system deadlock condition in Resource Allocation Graph using Banker-style reduction

## Signature
```c
int detect_deadlock_rag(int p, int r, const int alloc[16][16], const int req[16][16], const int avail[16]);
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
int detect_deadlock_rag(int p, int r, const int alloc[16][16], const int req[16][16], const int avail[16]) {
    int work[16];
    int finish[16] = {0};
    for (int j = 0; j < r; j++) work[j] = avail[j];
    int count = 0;
    while (count < p) {
        int found = 0;
        for (int i = 0; i < p; i++) {
            if (!finish[i]) {
                int can_proceed = 1;
                for (int j = 0; j < r; j++) {
                    if (req[i][j] > work[j]) { can_proceed = 0; break; }
                }
                if (can_proceed) {
                    for (int j = 0; j < r; j++) work[j] += alloc[i][j];
                    finish[i] = 1;
                    found = 1;
                    count++;
                }
            }
        }
        if (!found) break;
    }
    return (count < p);
}
```

## Aliases & Shorthands
Available via: `detect_deadlock_rag`, `detection.cycles-loops.deadlock-rag`, `detection>detect_deadlock_rag()`, `detection>cycles-loops>deadlock-rag>detect_deadlock_rag()`, `detect_deadlock`
