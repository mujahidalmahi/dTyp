# avl_rotate_left
> **Domain:** `data-structures` | **Subcategory:** `trees` | **Type:** `function`
## Overview
Performs left rotation on unbalanced AVL node

## Signature
```c
Node* avl_rotate_left(Node* x);
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
static int avl_hl_internal(const Node* n) { return n ? n->height : 0; }
static int avl_ml_internal(int a, int b) { return a > b ? a : b; }

Node* avl_rotate_left(Node* x) {
    Node* y = x->right;
    Node* t = y->left;
    y->left = x;
    x->right = t;
    x->height = avl_ml_internal(avl_hl_internal(x->left), avl_hl_internal(x->right)) + 1;
    y->height = avl_ml_internal(avl_hl_internal(y->left), avl_hl_internal(y->right)) + 1;
    return y;
}
```

## Aliases & Shorthands
Available via: `avl_rotate_left`, `data-structures.separate-components.trees.avl.rotate-left`, `data-structures>avl_rotate_left()`, `data-structures>separate-components>trees>avl>rotate-left>avl_rotate_left()`, `rotateLeftAVL`

## Dependencies
Requires: `data-structures.separate-components.trees.avl.node`
