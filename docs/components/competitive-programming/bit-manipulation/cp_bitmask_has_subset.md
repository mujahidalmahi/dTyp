# cp_bitmask_has_subset
> **Domain:** `competitive-programming` | **Subcategory:** `bit-manipulation` | **Type:** `function`
## Overview
Checks if supermask contains all set bits present in submask

## Signature
```c
int cp_bitmask_has_subset(int supermask, int submask);
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
int cp_bitmask_has_subset(int supermask, int submask) {
    return (supermask & submask) == submask;
}
```

## Aliases & Shorthands
Available via: `cp_bitmask_has_subset`, `competitive-programming.programming-technics.bit-manipulation.bitmasking.has-subset`, `competitive-programming>cp_bitmask_has_subset()`, `competitive-programming>programming-technics>bit-manipulation>bitmasking>has-subset>cp_bitmask_has_subset()`, `bitmaskHasSubset`
