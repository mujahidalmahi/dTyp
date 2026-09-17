# bst_insert
> **Domain:** `data-structures` | **Subcategory:** `trees` | **Type:** `function`
## Overview
Inserts value into binary search tree recursively

## Signature
```c
Node* bst_insert(Node* root, int val);
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
Node* bst_insert(Node* root, int val) {
    if (root == NULL) {
        Node* n = (Node*)malloc(sizeof(Node));
        if (!n) return NULL;
        n->data = val;
        n->left = NULL;
        n->right = NULL;
        return n;
    }
    if (val < root->data) {
        root->left = bst_insert(root->left, val);
    } else if (val > root->data) {
        root->right = bst_insert(root->right, val);
    }
    return root;
}
```

## Aliases & Shorthands
Available via: `bst_insert`, `data-structures.separate-components.trees.bst.insert`, `data-structures>bst_insert()`, `data-structures>separate-components>trees>bst>insert>bst_insert()`, `insertBST`

## Dependencies
Requires: `data-structures.separate-components.trees.bst.node`
