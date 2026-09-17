# Vector
> **Domain:** `data-structures` | **Subcategory:** `arrays` | **Type:** `struct`
## Overview
Auto-resizing dynamic array vector structure

## Signature
```c
typedef struct Vector { int* items; size_t size; size_t capacity; } Vector;
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
typedef struct Vector {
    int* items;
    size_t size;
    size_t capacity;
} Vector;
```

## Aliases & Shorthands
Available via: `Vector`, `data-structures.separate-components.arrays.dynamic-array.vector-struct`, `data-structures>Vector()`, `data-structures>separate-components>arrays>dynamic-array>vector-struct>Vector()`, `vector_struct`
