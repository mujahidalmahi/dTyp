# avl_search
> **Domain:** `data-structures` | **Subcategory:** `trees` | **Type:** `function`
## Overview
Searches for value in balanced AVL tree in O(log n) time

## Signature
```c
Node* avl_search(Node* root, int val);
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
Node* avl_search(Node* root, int val) {
    if (!root || root->data == val) return root;
    if (val < root->data) return avl_search(root->left, val);
    return avl_search(root->right, val);
}
```

## Aliases & Shorthands
Available via: `avl_search`, `data-structures.separate-components.trees.avl.search`, `data-structures>avl_search()`, `data-structures>separate-components>trees>avl>search>avl_search()`, `searchAVL`

## Dependencies
Requires: `data-structures.separate-components.trees.avl.node`
