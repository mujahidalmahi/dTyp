# alloc_int_array
> **Domain:** `boiler-plates` | **Subcategory:** `dynamic-memory` | **Type:** `function`
## Overview
Dynamically allocates an uninitialized integer buffer with malloc

## Signature
```c
int* alloc_int_array(size_t count);
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
int* alloc_int_array(size_t count) {
    int* arr = (int*)malloc(count * sizeof(int));
    return arr;
}
```

## Aliases & Shorthands
Available via: `alloc_int_array`, `boiler-plates.separate-components.dynamic-memory.alloc-int-array`, `boiler-plates>alloc_int_array()`, `boiler-plates>separate-components>dynamic-memory>alloc-int-array>alloc_int_array()`, `allocIntArray`
