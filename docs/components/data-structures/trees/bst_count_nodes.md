# bst_count_nodes
> **Domain:** `data-structures` | **Subcategory:** `trees` | **Type:** `function`
## Overview
Recursively counts total number of nodes in binary tree

## Signature
```c
int bst_count_nodes(const Node* root);
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
int bst_count_nodes(const Node* root) {
    if (!root) return 0;
    return 1 + bst_count_nodes(root->left) + bst_count_nodes(root->right);
}
```

## Aliases & Shorthands
Available via: `bst_count_nodes`, `data-structures.separate-components.trees.bst.count-nodes`, `data-structures>bst_count_nodes()`, `data-structures>separate-components>trees>bst>count-nodes>bst_count_nodes()`, `countNodesBST`

## Dependencies
Requires: `data-structures.separate-components.trees.bst.node`
