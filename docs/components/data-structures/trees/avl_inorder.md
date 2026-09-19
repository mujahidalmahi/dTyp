# avl_inorder
> **Domain:** `data-structures` | **Subcategory:** `trees` | **Type:** `function`
## Overview
In-order traversal of AVL tree printing balance factor and height

## Signature
```c
void avl_inorder(const Node* root);
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
void avl_inorder(const Node* root) {
    if (!root) return;
    avl_inorder(root->left);
    int lh = root->left ? root->left->height : 0;
    int rh = root->right ? root->right->height : 0;
    printf("%d(bf:%d,h:%d) ", root->data, lh - rh, root->height);
    avl_inorder(root->right);
}
```

## Aliases & Shorthands
Available via: `avl_inorder`, `data-structures.separate-components.trees.avl.inorder`, `data-structures>avl_inorder()`, `data-structures>separate-components>trees>avl>inorder>avl_inorder()`, `inorderAVL`

## Dependencies
Requires: `data-structures.separate-components.trees.avl.node`
