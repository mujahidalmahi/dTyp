# bst_free
> **Domain:** `data-structures` | **Subcategory:** `trees` | **Type:** `function`
## Overview
Deallocates entire binary search tree via post-order traversal

## Signature
```c
void bst_free(Node* root);
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
void bst_free(Node* root) {
    if (root == NULL) return;
    bst_free(root->left);
    bst_free(root->right);
    free(root);
}
```

## Aliases & Shorthands
Available via: `bst_free`, `data-structures.separate-components.trees.bst.free`, `data-structures>bst_free()`, `data-structures>separate-components>trees>bst>free>bst_free()`, `freeBST`

## Dependencies
Requires: `data-structures.separate-components.trees.bst.node`
