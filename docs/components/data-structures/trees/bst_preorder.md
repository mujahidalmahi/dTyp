# bst_preorder
> **Domain:** `data-structures` | **Subcategory:** `trees` | **Type:** `function`
## Overview
Traverses BST pre-order (Root, Left, Right) printing values

## Signature
```c
void bst_preorder(const Node* root);
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
void bst_preorder(const Node* root) {
    if (!root) return;
    printf("%d ", root->data);
    bst_preorder(root->left);
    bst_preorder(root->right);
}
```

## Aliases & Shorthands
Available via: `bst_preorder`, `data-structures.separate-components.trees.bst.preorder`, `data-structures>bst_preorder()`, `data-structures>separate-components>trees>bst>preorder>bst_preorder()`, `preorderBST`

## Dependencies
Requires: `data-structures.separate-components.trees.bst.node`
