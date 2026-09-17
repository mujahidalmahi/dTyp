# cp_bit_iterate_submasks
> **Domain:** `competitive-programming` | **Subcategory:** `bit-manipulation` | **Type:** `function`
## Overview
Iterates through all non-empty submasks of a bitmask

## Signature
```c
int cp_bit_iterate_submasks(int mask, int* out_submasks, int max_capacity);
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
int cp_bit_iterate_submasks(int mask, int* out_submasks, int max_capacity) {
    int count = 0;
    for (int sub = mask; sub > 0; sub = (sub - 1) & mask) {
        if (count < max_capacity) {
            out_submasks[count++] = sub;
        }
    }
    return count;
}
```

## Aliases & Shorthands
Available via: `cp_bit_iterate_submasks`, `competitive-programming.programming-technics.bit-manipulation.bitmasking.iterate-submasks`, `competitive-programming>cp_bit_iterate_submasks()`, `competitive-programming>programming-technics>bit-manipulation>bitmasking>iterate-submasks>cp_bit_iterate_submasks()`, `bitIterateSubmasks`
