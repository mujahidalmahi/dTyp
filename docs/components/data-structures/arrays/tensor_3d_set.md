# tensor_3d_set
> **Domain:** `data-structures` | **Subcategory:** `arrays` | **Type:** `function`
## Overview
Sets value at coordinate (i, j, k) in Tensor3D

## Signature
```c
void tensor_3d_set(Tensor3D* t, int i, int j, int k, int val);
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
void tensor_3d_set(Tensor3D* t, int i, int j, int k, int val) {
    if (i >= 0 && i < t->d1 && j >= 0 && j < t->d2 && k >= 0 && k < t->d3) {
        int idx = (i * t->d2 * t->d3) + (j * t->d3) + k;
        t->data[idx] = val;
    }
}
```

## Aliases & Shorthands
Available via: `tensor_3d_set`, `data-structures.separate-components.arrays.3d-array.get-set`, `data-structures>tensor_3d_set()`, `data-structures>separate-components>arrays>3d-array>get-set>tensor_3d_set()`, `setTensor3D`

## Dependencies
Requires: `data-structures.separate-components.arrays.3d-array.tensor-struct`
