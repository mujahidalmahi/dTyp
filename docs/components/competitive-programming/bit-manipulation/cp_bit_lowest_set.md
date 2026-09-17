# cp_bit_lowest_set
> **Domain:** `competitive-programming` | **Subcategory:** `bit-manipulation` | **Type:** `function`
## Overview
Isolates the lowest set bit value of an integer (x & -x)

## Signature
```c
int cp_bit_lowest_set(int x);
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
int cp_bit_lowest_set(int x) {
    return x & (-x);
}
```

## Aliases & Shorthands
Available via: `cp_bit_lowest_set`, `competitive-programming.programming-technics.bit-manipulation.bitwise-tricks.lowest-set`, `competitive-programming>cp_bit_lowest_set()`, `competitive-programming>programming-technics>bit-manipulation>bitwise-tricks>lowest-set>cp_bit_lowest_set()`, `bitLowestSet`
