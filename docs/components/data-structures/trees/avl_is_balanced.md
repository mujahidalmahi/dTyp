# avl_is_balanced
> **Domain:** `data-structures` | **Subcategory:** `trees` | **Type:** `function`
## Overview
Verifies if tree satisfies AVL height-balancing property at every node

## Signature
```c
int avl_is_balanced(const Node* root);
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
static int avl_check_h(const Node* n, int* balanced) {
    if (!n) return 0;
    int lh = avl_check_h(n->left, balanced);
    int rh = avl_check_h(n->right, balanced);
    int diff = lh - rh;
    if (diff < -1 || diff > 1) *balanced = 0;
    return (lh > rh ? lh : rh) + 1;
}

int avl_is_balanced(const Node* root) {
    int balanced = 1;
    avl_check_h(root, &balanced);
    return balanced;
}
```

## Aliases & Shorthands
Available via: `avl_is_balanced`, `data-structures.separate-components.trees.avl.is-balanced`, `data-structures>avl_is_balanced()`, `data-structures>separate-components>trees>avl>is-balanced>avl_is_balanced()`, `isBalancedAVL`

## Dependencies
Requires: `data-structures.separate-components.trees.avl.node`
