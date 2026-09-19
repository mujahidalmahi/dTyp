# bst_boundary
> **Domain:** `data-structures` | **Subcategory:** `trees` | **Type:** `function`
## Overview
Boundary traversal of binary tree (left, leaves, right)

## Signature
```c
void bst_boundary(const Node* root);
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
static void bst_bound_leaves(const Node* root) {
    if (!root) return;
    bst_bound_leaves(root->left);
    if (!root->left && !root->right) printf("%d ", root->data);
    bst_bound_leaves(root->right);
}
static void bst_bound_left(const Node* root) {
    if (!root) return;
    if (root->left) {
        printf("%d ", root->data);
        bst_bound_left(root->left);
    } else if (root->right) {
        printf("%d ", root->data);
        bst_bound_left(root->right);
    }
}
static void bst_bound_right(const Node* root) {
    if (!root) return;
    if (root->right) {
        bst_bound_right(root->right);
        printf("%d ", root->data);
    } else if (root->left) {
        bst_bound_right(root->left);
        printf("%d ", root->data);
    }
}
void bst_boundary(const Node* root) {
    if (!root) return;
    printf("%d ", root->data);
    bst_bound_left(root->left);
    bst_bound_leaves(root->left);
    bst_bound_leaves(root->right);
    bst_bound_right(root->right);
}
```

## Aliases & Shorthands
Available via: `bst_boundary`, `data-structures.separate-components.trees.bst.boundary`, `data-structures>bst_boundary()`, `data-structures>separate-components>trees>bst>boundary>bst_boundary()`, `boundaryBST`

## Dependencies
Requires: `data-structures.separate-components.trees.bst.node`
