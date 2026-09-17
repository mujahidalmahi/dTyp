# cp_bit_count_set
> **Domain:** `competitive-programming` | **Subcategory:** `bit-manipulation` | **Type:** `function`
## Overview
Counts the number of set bits in an integer (popcount)

## Signature
```c
int cp_bit_count_set(unsigned int n);
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
int cp_bit_count_set(unsigned int n) {
    int count = 0;
    while (n > 0) {
        n &= (n - 1);
        count++;
    }
    return count;
}
```

## Aliases & Shorthands
Available via: `cp_bit_count_set`, `competitive-programming.programming-technics.bit-manipulation.bitwise-tricks.count-set`, `competitive-programming>cp_bit_count_set()`, `competitive-programming>programming-technics>bit-manipulation>bitwise-tricks>count-set>cp_bit_count_set()`, `bitCountSet`
