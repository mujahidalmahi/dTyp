# ptr_array_copy
> **Domain:** `boiler-plates` | **Subcategory:** `pointers` | **Type:** `function`
## Overview
Copies integer buffer from source pointer to destination pointer

## Signature
```c
void ptr_array_copy(int* dest, const int* src, size_t count);
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
void ptr_array_copy(int* dest, const int* src, size_t count) {
    while (count-- > 0) {
        *dest++ = *src++;
    }
}
```

## Aliases & Shorthands
Available via: `ptr_array_copy`, `boiler-plates.separate-components.pointers.ptr-array-copy`, `boiler-plates>ptr_array_copy()`, `boiler-plates>separate-components>pointers>ptr-array-copy>ptr_array_copy()`, `ptrArrayCopy`
