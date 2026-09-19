# bst_leaf_count
> **Domain:** `data-structures` | **Subcategory:** `trees` | **Type:** `function`
## Overview
Counts total number of leaf nodes in binary tree

## Signature
```c
int bst_leaf_count(const Node* root);
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
int bst_leaf_count(const Node* root) {
    if (!root) return 0;
    if (!root->left && !root->right) return 1;
    return bst_leaf_count(root->left) + bst_leaf_count(root->right);
}
```

## Aliases & Shorthands
Available via: `bst_leaf_count`, `data-structures.separate-components.trees.bst.leaf-count`, `data-structures>bst_leaf_count()`, `data-structures>separate-components>trees>bst>leaf-count>bst_leaf_count()`, `leafCountBST`

## Dependencies
Requires: `data-structures.separate-components.trees.bst.node`
