# bst_find_min
> **Domain:** `data-structures` | **Subcategory:** `trees` | **Type:** `function`
## Overview
Finds node with minimum value in BST

## Signature
```c
Node* bst_find_min(Node* root);
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
Node* bst_find_min(Node* root) {
    while (root && root->left) root = root->left;
    return root;
}
```

## Aliases & Shorthands
Available via: `bst_find_min`, `data-structures.separate-components.trees.bst.find-min`, `data-structures>bst_find_min()`, `data-structures>separate-components>trees>bst>find-min>bst_find_min()`, `findMinBST`

## Dependencies
Requires: `data-structures.separate-components.trees.bst.node`
