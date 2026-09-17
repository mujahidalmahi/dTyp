# tensor_3d_alloc
> **Domain:** `data-structures` | **Subcategory:** `arrays` | **Type:** `function`
## Overview
Allocates 3D tensor with contiguous flat buffer

## Signature
```c
Tensor3D* tensor_3d_alloc(int d1, int d2, int d3);
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
Tensor3D* tensor_3d_alloc(int d1, int d2, int d3) {
    Tensor3D* t = (Tensor3D*)malloc(sizeof(Tensor3D));
    if (!t) return NULL;
    t->d1 = d1;
    t->d2 = d2;
    t->d3 = d3;
    t->data = (int*)calloc(d1 * d2 * d3, sizeof(int));
    return t;
}
```

## Aliases & Shorthands
Available via: `tensor_3d_alloc`, `data-structures.separate-components.arrays.3d-array.alloc`, `data-structures>tensor_3d_alloc()`, `data-structures>separate-components>arrays>3d-array>alloc>tensor_3d_alloc()`, `allocTensor3D`

## Dependencies
Requires: `data-structures.separate-components.arrays.3d-array.tensor-struct`
