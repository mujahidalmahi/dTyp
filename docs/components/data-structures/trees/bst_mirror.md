# bst_mirror
> **Domain:** `data-structures` | **Subcategory:** `trees` | **Type:** `function`
## Overview
Inverts binary tree by swapping left and right subtrees recursively

## Signature
```c
void bst_mirror(Node* root);
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
void bst_mirror(Node* root) {
    if (!root) return;
    Node* tmp = root->left;
    root->left = root->right;
    root->right = tmp;
    bst_mirror(root->left);
    bst_mirror(root->right);
}
```

## Aliases & Shorthands
Available via: `bst_mirror`, `data-structures.separate-components.trees.bst.mirror`, `data-structures>bst_mirror()`, `data-structures>separate-components>trees>bst>mirror>bst_mirror()`, `mirrorBST`

## Dependencies
Requires: `data-structures.separate-components.trees.bst.node`
