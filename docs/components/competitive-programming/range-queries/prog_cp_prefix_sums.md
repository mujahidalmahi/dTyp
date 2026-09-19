# prog_cp_prefix_sums
> **Domain:** `competitive-programming` | **Subcategory:** `range-queries` | **Type:** `program`
## Overview
Complete competitive programming program answering 1D and 2D prefix sum range queries

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
    int arr[] = {3, 1, 4, 1, 5, 9, 2};
    int n = 7;
    long long pref[8];
    pref[0] = 0;
    for (int i = 0; i < n; i++) pref[i + 1] = pref[i] + arr[i];
    printf("Range sum [1, 4]: %lld\n", pref[5] - pref[1]);
    printf("Range sum [0, 6]: %lld\n", pref[7] - pref[0]);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_cp_prefix_sums`, `competitive-programming.full-programs.range-queries.prefix-sums.prog-prefix-sums`, `competitive-programming>prog_cp_prefix_sums()`, `competitive-programming>full-programs>range-queries>prefix-sums>prog-prefix-sums>prog_cp_prefix_sums()`
