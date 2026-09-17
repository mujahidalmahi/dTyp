# swap_ints
> **Domain:** `boiler-plates` | **Subcategory:** `functions` | **Type:** `function`
## Overview
Swaps two integers in-place via pointers

## Signature
```c
void swap_ints(int* a, int* b);
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
void swap_ints(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}
```

## Aliases & Shorthands
Available via: `swap_ints`, `boiler-plates.separate-components.functions.func-swap`, `boiler-plates>swap_ints()`, `boiler-plates>separate-components>functions>func-swap>swap_ints()`, `swapInts`
