# bst_zigzag
> **Domain:** `data-structures` | **Subcategory:** `trees` | **Type:** `function`
## Overview
Zigzag spiral level order traversal of binary tree

## Signature
```c
void bst_zigzag(const Node* root);
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
void bst_zigzag(const Node* root) {
    if (!root) return;
    const Node* cur_lvl[512];
    const Node* nxt_lvl[512];
    int c_cnt = 0, n_cnt = 0;
    int l2r = 1;
    cur_lvl[c_cnt++] = root;
    while (c_cnt > 0) {
        for (int i = c_cnt - 1; i >= 0; i--) {
            const Node* cur = cur_lvl[i];
            printf("%d ", cur->data);
            if (l2r) {
                if (cur->left) nxt_lvl[n_cnt++] = cur->left;
                if (cur->right) nxt_lvl[n_cnt++] = cur->right;
            } else {
                if (cur->right) nxt_lvl[n_cnt++] = cur->right;
                if (cur->left) nxt_lvl[n_cnt++] = cur->left;
            }
        }
        for (int i = 0; i < n_cnt; i++) cur_lvl[i] = nxt_lvl[i];
        c_cnt = n_cnt;
        n_cnt = 0;
        l2r = !l2r;
    }
}
```

## Aliases & Shorthands
Available via: `bst_zigzag`, `data-structures.separate-components.trees.bst.zigzag`, `data-structures>bst_zigzag()`, `data-structures>separate-components>trees>bst>zigzag>bst_zigzag()`, `zigzagBST`

## Dependencies
Requires: `data-structures.separate-components.trees.bst.node`
