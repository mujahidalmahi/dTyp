# bst_height
> **Domain:** `data-structures` | **Subcategory:** `trees` | **Type:** `function`
## Overview
Computes maximum depth/height of binary tree

## Signature
```c
int bst_height(const Node* root);
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
int bst_height(const Node* root) {
    if (!root) return 0;
    int lh = bst_height(root->left);
    int rh = bst_height(root->right);
    return (lh > rh ? lh : rh) + 1;
}
```

## Aliases & Shorthands
Available via: `bst_height`, `data-structures.separate-components.trees.bst.height`, `data-structures>bst_height()`, `data-structures>separate-components>trees>bst>height>bst_height()`, `heightBST`

## Dependencies
Requires: `data-structures.separate-components.trees.bst.node`
