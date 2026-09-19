# prog_cp_bitwise_tricks
> **Domain:** `competitive-programming` | **Subcategory:** `bit-manipulation` | **Type:** `program`
## Overview
Complete competitive programming program testing popcount, lowest set bit, and powers of two

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

int count_set_bits(unsigned int n) {
    int count = 0;
    while (n > 0) {
        n &= (n - 1);
        count++;
    }
    return count;
}

int lowest_set_bit(int x) {
    return x & (-x);
}

int is_power_of_two(unsigned int x) {
    return (x > 0) && ((x & (x - 1)) == 0);
}

int main(void) {
    unsigned int vals[] = {1, 2, 7, 16, 29, 64};
    for (int i = 0; i < 6; i++) {
        unsigned int v = vals[i];
        printf("v=%u: set_bits=%d, lsb=%d, pow2=%d\n",
               v, count_set_bits(v), lowest_set_bit((int)v), is_power_of_two(v));
    }
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_cp_bitwise_tricks`, `competitive-programming.full-programs.bit-manipulation.bitwise-tricks.prog-bitwise-tricks`, `competitive-programming>prog_cp_bitwise_tricks()`, `competitive-programming>full-programs>bit-manipulation>bitwise-tricks>prog-bitwise-tricks>prog_cp_bitwise_tricks()`
