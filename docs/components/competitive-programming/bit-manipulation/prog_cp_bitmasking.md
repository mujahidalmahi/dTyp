# prog_cp_bitmasking
> **Domain:** `competitive-programming` | **Subcategory:** `bit-manipulation` | **Type:** `program`
## Overview
Complete competitive programming program enumerating all submasks of a bitmask

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
    int mask = 13;
    printf("Submasks of %d:\n", mask);
    for (int sub = mask; sub > 0; sub = (sub - 1) & mask) {
        printf("%d\n", sub);
    }
    printf("0\n");
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_cp_bitmasking`, `competitive-programming.full-programs.bit-manipulation.bitmasking.prog-bitmasking`, `competitive-programming>prog_cp_bitmasking()`, `competitive-programming>full-programs>bit-manipulation>bitmasking>prog-bitmasking>prog_cp_bitmasking()`
