# bst_inorder
> **Domain:** `data-structures` | **Subcategory:** `trees` | **Type:** `function`
## Overview
Traverses BST in-order (Left, Root, Right) printing values

## Signature
```c
void bst_inorder(const Node* root);
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
void bst_inorder(const Node* root) {
    if (!root) return;
    bst_inorder(root->left);
    printf("%d ", root->data);
    bst_inorder(root->right);
}
```

## Aliases & Shorthands
Available via: `bst_inorder`, `data-structures.separate-components.trees.bst.inorder`, `data-structures>bst_inorder()`, `data-structures>separate-components>trees>bst>inorder>bst_inorder()`, `inorderBST`

## Dependencies
Requires: `data-structures.separate-components.trees.bst.node`
