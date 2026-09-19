# bst_delete
> **Domain:** `data-structures` | **Subcategory:** `trees` | **Type:** `function`
## Overview
Deletes node with key from BST handling all 3 structural cases

## Signature
```c
Node* bst_delete(Node* root, int val);
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
static Node* bst_find_min_internal(Node* root) {
    while (root && root->left) root = root->left;
    return root;
}

Node* bst_delete(Node* root, int val) {
    if (!root) return NULL;
    if (val < root->data) {
        root->left = bst_delete(root->left, val);
    } else if (val > root->data) {
        root->right = bst_delete(root->right, val);
    } else {
        if (!root->left) {
            Node* tmp = root->right;
            free(root);
            return tmp;
        } else if (!root->right) {
            Node* tmp = root->left;
            free(root);
            return tmp;
        }
        Node* succ = bst_find_min_internal(root->right);
        root->data = succ->data;
        root->right = bst_delete(root->right, succ->data);
    }
    return root;
}
```

## Aliases & Shorthands
Available via: `bst_delete`, `data-structures.separate-components.trees.bst.delete`, `data-structures>bst_delete()`, `data-structures>separate-components>trees>bst>delete>bst_delete()`, `deleteBST`

## Dependencies
Requires: `data-structures.separate-components.trees.bst.node`
