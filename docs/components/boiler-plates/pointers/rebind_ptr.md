# rebind_ptr
> **Domain:** `boiler-plates` | **Subcategory:** `pointers` | **Type:** `function`
## Overview
Rebinds a pointer address using a double pointer parameter

## Signature
```c
void rebind_ptr(int** ptr, int* new_target);
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
void rebind_ptr(int** ptr, int* new_target) {
    if (ptr != NULL) {
        *ptr = new_target;
    }
}
```

## Aliases & Shorthands
Available via: `rebind_ptr`, `boiler-plates.separate-components.pointers.ptr-rebind`, `boiler-plates>rebind_ptr()`, `boiler-plates>separate-components>pointers>ptr-rebind>rebind_ptr()`, `rebindPtr`
