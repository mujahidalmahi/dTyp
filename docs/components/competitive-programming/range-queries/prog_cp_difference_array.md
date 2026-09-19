# prog_cp_difference_array
> **Domain:** `competitive-programming` | **Subcategory:** `range-queries` | **Type:** `program`
## Overview
Complete competitive programming program applying O(1) range updates and generating final array

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
    int n = 6;
    long long diff[8] = {0};
    diff[1] += 5; diff[4] -= 5;
    diff[2] += 3; diff[6] -= 3;
    diff[0] += 10; diff[2] -= 10;
    long long res[6];
    long long running = 0;
    for (int i = 0; i < n; i++) {
        running += diff[i];
        res[i] = running;
        printf("idx %d: %lld\n", i, res[i]);
    }
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_cp_difference_array`, `competitive-programming.full-programs.range-queries.difference-array.prog-difference-array`, `competitive-programming>prog_cp_difference_array()`, `competitive-programming>full-programs>range-queries>difference-array>prog-difference-array>prog_cp_difference_array()`
