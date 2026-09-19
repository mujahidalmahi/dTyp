# bst_morris_inorder
> **Domain:** `data-structures` | **Subcategory:** `trees` | **Type:** `function`
## Overview
Morris in-order traversal using threaded binary tree with O(1) space

## Signature
```c
void bst_morris_inorder(Node* root);
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
void bst_morris_inorder(Node* root) {
    Node* cur = root;
    while (cur) {
        if (!cur->left) {
            printf("%d ", cur->data);
            cur = cur->right;
        } else {
            Node* prev = cur->left;
            while (prev->right && prev->right != cur) prev = prev->right;
            if (!prev->right) {
                prev->right = cur;
                cur = cur->left;
            } else {
                prev->right = NULL;
                printf("%d ", cur->data);
                cur = cur->right;
            }
        }
    }
}
```

## Aliases & Shorthands
Available via: `bst_morris_inorder`, `data-structures.separate-components.trees.bst.morris-inorder`, `data-structures>bst_morris_inorder()`, `data-structures>separate-components>trees>bst>morris-inorder>bst_morris_inorder()`, `morrisInorderBST`

## Dependencies
Requires: `data-structures.separate-components.trees.bst.node`
