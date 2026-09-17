# grow_int_array
> **Domain:** `boiler-plates` | **Subcategory:** `dynamic-memory` | **Type:** `function`
## Overview
Expands capacity of a dynamically allocated array with realloc

## Signature
```c
int* grow_int_array(int* arr, size_t* capacity);
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
int* grow_int_array(int* arr, size_t* capacity) {
    size_t new_cap = (*capacity == 0) ? 8 : (*capacity * 2);
    int* next = (int*)realloc(arr, new_cap * sizeof(int));
    if (next != NULL) {
        *capacity = new_cap;
    }
    return next;
}
```

## Aliases & Shorthands
Available via: `grow_int_array`, `boiler-plates.separate-components.dynamic-memory.grow-int-array`, `boiler-plates>grow_int_array()`, `boiler-plates>separate-components>dynamic-memory>grow-int-array>grow_int_array()`, `growIntArray`
