# bst_postorder
> **Domain:** `data-structures` | **Subcategory:** `trees` | **Type:** `function`
## Overview
Traverses BST post-order (Left, Right, Root) printing values

## Signature
```c
void bst_postorder(const Node* root);
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
void bst_postorder(const Node* root) {
    if (!root) return;
    bst_postorder(root->left);
    bst_postorder(root->right);
    printf("%d ", root->data);
}
```

## Aliases & Shorthands
Available via: `bst_postorder`, `data-structures.separate-components.trees.bst.postorder`, `data-structures>bst_postorder()`, `data-structures>separate-components>trees>bst>postorder>bst_postorder()`, `postorderBST`

## Dependencies
Requires: `data-structures.separate-components.trees.bst.node`
