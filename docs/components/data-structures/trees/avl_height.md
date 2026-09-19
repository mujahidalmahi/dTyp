# avl_height
> **Domain:** `data-structures` | **Subcategory:** `trees` | **Type:** `function`
## Overview
Retrieves height of AVL node

## Signature
```c
int avl_height(const Node* n);
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
int avl_height(const Node* n) {
    return n ? n->height : 0;
}
```

## Aliases & Shorthands
Available via: `avl_height`, `data-structures.separate-components.trees.avl.height`, `data-structures>avl_height()`, `data-structures>separate-components>trees>avl>height>avl_height()`, `heightAVL`

## Dependencies
Requires: `data-structures.separate-components.trees.avl.node`
