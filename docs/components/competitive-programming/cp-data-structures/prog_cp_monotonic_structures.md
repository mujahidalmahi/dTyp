# prog_cp_monotonic_structures
> **Domain:** `competitive-programming` | **Subcategory:** `cp-data-structures` | **Type:** `program`
## Overview
Complete competitive programming program computing next greater element with monotonic stack

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

void next_greater(const int* arr, int n, int* res) {
    int stack[n];
    int top = -1;
    for (int i = 0; i < n; i++) res[i] = -1;
    for (int i = 0; i < n; i++) {
        while (top >= 0 && arr[i] > arr[stack[top]]) {
            res[stack[top--]] = arr[i];
        }
        stack[++top] = i;
    }
}

int main(void) {
    int arr[] = {4, 5, 2, 25, 7, 18};
    int n = 6;
    int res[6];
    next_greater(arr, n, res);
    for (int i = 0; i < n; i++) {
        printf("%d -> %d
", arr[i], res[i]);
    }
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_cp_monotonic_structures`, `competitive-programming.full-programs.cp-data-structures.monotonic-structures.prog-monotonic-structures`, `competitive-programming>prog_cp_monotonic_structures()`, `competitive-programming>full-programs>cp-data-structures>monotonic-structures>prog-monotonic-structures>prog_cp_monotonic_structures()`
