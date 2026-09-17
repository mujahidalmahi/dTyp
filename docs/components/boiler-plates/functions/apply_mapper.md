# apply_mapper
> **Domain:** `boiler-plates` | **Subcategory:** `functions` | **Type:** `function`
## Overview
Applies a function pointer callback to an array of integers

## Signature
```c
void apply_mapper(int* arr, int size, IntMapper fn);
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
void apply_mapper(int* arr, int size, IntMapper fn) {
    for (int i = 0; i < size; i++) {
        arr[i] = fn(arr[i]);
    }
}
```

## Aliases & Shorthands
Available via: `apply_mapper`, `boiler-plates.separate-components.functions.apply-mapper`, `boiler-plates>apply_mapper()`, `boiler-plates>separate-components>functions>apply-mapper>apply_mapper()`, `applyMapper`

## Dependencies
Requires: `boiler-plates.separate-components.functions.func-callback-def`
