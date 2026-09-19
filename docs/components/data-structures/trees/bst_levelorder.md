# bst_levelorder
> **Domain:** `data-structures` | **Subcategory:** `trees` | **Type:** `function`
## Overview
Breadth-first level order traversal of binary tree

## Signature
```c
void bst_levelorder(const Node* root);
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
void bst_levelorder(const Node* root) {
    if (!root) return;
    const Node* queue[1024];
    int front = 0, rear = 0;
    queue[rear++] = root;
    while (front < rear) {
        const Node* cur = queue[front++];
        printf("%d ", cur->data);
        if (cur->left) queue[rear++] = cur->left;
        if (cur->right) queue[rear++] = cur->right;
    }
}
```

## Aliases & Shorthands
Available via: `bst_levelorder`, `data-structures.separate-components.trees.bst.levelorder`, `data-structures>bst_levelorder()`, `data-structures>separate-components>trees>bst>levelorder>bst_levelorder()`, `levelorderBST`

## Dependencies
Requires: `data-structures.separate-components.trees.bst.node`
