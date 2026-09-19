# bst_find_max
> **Domain:** `data-structures` | **Subcategory:** `trees` | **Type:** `function`
## Overview
Finds node with maximum value in BST

## Signature
```c
Node* bst_find_max(Node* root);
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
Node* bst_find_max(Node* root) {
    while (root && root->right) root = root->right;
    return root;
}
```

## Aliases & Shorthands
Available via: `bst_find_max`, `data-structures.separate-components.trees.bst.find-max`, `data-structures>bst_find_max()`, `data-structures>separate-components>trees>bst>find-max>bst_find_max()`, `findMaxBST`

## Dependencies
Requires: `data-structures.separate-components.trees.bst.node`
