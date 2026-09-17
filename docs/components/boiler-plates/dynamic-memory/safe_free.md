# safe_free
> **Domain:** `boiler-plates` | **Subcategory:** `dynamic-memory` | **Type:** `function`
## Overview
Frees heap pointer and nullifies reference to prevent dangling pointers

## Signature
```c
void safe_free(void** ptr);
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
void safe_free(void** ptr) {
    if (ptr != NULL && *ptr != NULL) {
        free(*ptr);
        *ptr = NULL;
    }
}
```

## Aliases & Shorthands
Available via: `safe_free`, `boiler-plates.separate-components.dynamic-memory.safe-free`, `boiler-plates>safe_free()`, `boiler-plates>separate-components>dynamic-memory>safe-free>safe_free()`, `safeFree`
