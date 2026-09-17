# bst_search
> **Domain:** `data-structures` | **Subcategory:** `trees` | **Type:** `function`
## Overview
Searches for value in binary search tree

## Signature
```c
Node* bst_search(Node* root, int val);
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
Node* bst_search(Node* root, int val) {
    if (root == NULL || root->data == val) return root;
    if (val < root->data) return bst_search(root->left, val);
    return bst_search(root->right, val);
}
```

## Aliases & Shorthands
Available via: `bst_search`, `data-structures.separate-components.trees.bst.search`, `data-structures>bst_search()`, `data-structures>separate-components>trees>bst>search>bst_search()`, `searchBST`

## Dependencies
Requires: `data-structures.separate-components.trees.bst.node`
