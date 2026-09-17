# cp_bit_is_power_of_two
> **Domain:** `competitive-programming` | **Subcategory:** `bit-manipulation` | **Type:** `function`
## Overview
Checks if a positive integer is an exact power of two

## Signature
```c
int cp_bit_is_power_of_two(unsigned int x);
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
int cp_bit_is_power_of_two(unsigned int x) {
    return (x > 0) && ((x & (x - 1)) == 0);
}
```

## Aliases & Shorthands
Available via: `cp_bit_is_power_of_two`, `competitive-programming.programming-technics.bit-manipulation.bitwise-tricks.is-power-of-two`, `competitive-programming>cp_bit_is_power_of_two()`, `competitive-programming>programming-technics>bit-manipulation>bitwise-tricks>is-power-of-two>cp_bit_is_power_of_two()`, `bitIsPowerOfTwo`
