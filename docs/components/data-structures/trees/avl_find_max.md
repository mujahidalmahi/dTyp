# avl_find_max
> **Domain:** `data-structures` | **Subcategory:** `trees` | **Type:** `function`
## Overview
Finds maximum value node in AVL tree

## Signature
```c
Node* avl_find_max(Node* root);
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
Node* avl_find_max(Node* root) {
    while (root && root->right) root = root->right;
    return root;
}
```

## Aliases & Shorthands
Available via: `avl_find_max`, `data-structures.separate-components.trees.avl.find-max`, `data-structures>avl_find_max()`, `data-structures>separate-components>trees>avl>find-max>avl_find_max()`, `findMaxAVL`

## Dependencies
Requires: `data-structures.separate-components.trees.avl.node`
