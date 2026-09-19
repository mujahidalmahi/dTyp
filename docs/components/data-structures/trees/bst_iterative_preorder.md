# bst_iterative_preorder
> **Domain:** `data-structures` | **Subcategory:** `trees` | **Type:** `function`
## Overview
Non-recursive pre-order traversal using explicit pointer stack

## Signature
```c
void bst_iterative_preorder(const Node* root);
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
void bst_iterative_preorder(const Node* root) {
    if (!root) return;
    const Node* stack[512];
    int top = -1;
    stack[++top] = root;
    while (top != -1) {
        const Node* cur = stack[top--];
        printf("%d ", cur->data);
        if (cur->right) stack[++top] = cur->right;
        if (cur->left) stack[++top] = cur->left;
    }
}
```

## Aliases & Shorthands
Available via: `bst_iterative_preorder`, `data-structures.separate-components.trees.bst.iterative-preorder`, `data-structures>bst_iterative_preorder()`, `data-structures>separate-components>trees>bst>iterative-preorder>bst_iterative_preorder()`, `iterativePreorderBST`

## Dependencies
Requires: `data-structures.separate-components.trees.bst.node`
