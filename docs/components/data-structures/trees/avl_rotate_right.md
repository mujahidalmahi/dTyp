# avl_rotate_right
> **Domain:** `data-structures` | **Subcategory:** `trees` | **Type:** `function`
## Overview
Performs right rotation on unbalanced AVL node

## Signature
```c
Node* avl_rotate_right(Node* y);
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
static int avl_hr_internal(const Node* n) { return n ? n->height : 0; }
static int avl_mr_internal(int a, int b) { return a > b ? a : b; }

Node* avl_rotate_right(Node* y) {
    Node* x = y->left;
    Node* t = x->right;
    x->right = y;
    y->left = t;
    y->height = avl_mr_internal(avl_hr_internal(y->left), avl_hr_internal(y->right)) + 1;
    x->height = avl_mr_internal(avl_hr_internal(x->left), avl_hr_internal(x->right)) + 1;
    return x;
}
```

## Aliases & Shorthands
Available via: `avl_rotate_right`, `data-structures.separate-components.trees.avl.rotate-right`, `data-structures>avl_rotate_right()`, `data-structures>separate-components>trees>avl>rotate-right>avl_rotate_right()`, `rotateRightAVL`

## Dependencies
Requires: `data-structures.separate-components.trees.avl.node`
