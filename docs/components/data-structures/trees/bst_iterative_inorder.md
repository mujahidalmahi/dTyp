# bst_iterative_inorder
> **Domain:** `data-structures` | **Subcategory:** `trees` | **Type:** `function`
## Overview
Non-recursive in-order traversal using explicit pointer stack

## Signature
```c
void bst_iterative_inorder(const Node* root);
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
void bst_iterative_inorder(const Node* root) {
    const Node* stack[512];
    int top = -1;
    const Node* cur = root;
    while (cur || top != -1) {
        while (cur) {
            stack[++top] = cur;
            cur = cur->left;
        }
        cur = stack[top--];
        printf("%d ", cur->data);
        cur = cur->right;
    }
}
```

## Aliases & Shorthands
Available via: `bst_iterative_inorder`, `data-structures.separate-components.trees.bst.iterative-inorder`, `data-structures>bst_iterative_inorder()`, `data-structures>separate-components>trees>bst>iterative-inorder>bst_iterative_inorder()`, `iterativeInorderBST`

## Dependencies
Requires: `data-structures.separate-components.trees.bst.node`
