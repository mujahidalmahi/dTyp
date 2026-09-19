# avl_balance_factor
> **Domain:** `data-structures` | **Subcategory:** `trees` | **Type:** `function`
## Overview
Calculates balance factor (height(left) - height(right)) of node

## Signature
```c
int avl_balance_factor(const Node* n);
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
int avl_balance_factor(const Node* n) {
    if (!n) return 0;
    int lh = n->left ? n->left->height : 0;
    int rh = n->right ? n->right->height : 0;
    return lh - rh;
}
```

## Aliases & Shorthands
Available via: `avl_balance_factor`, `data-structures.separate-components.trees.avl.balance-factor`, `data-structures>avl_balance_factor()`, `data-structures>separate-components>trees>avl>balance-factor>avl_balance_factor()`, `balanceFactorAVL`

## Dependencies
Requires: `data-structures.separate-components.trees.avl.node`
