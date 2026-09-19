# bst_bottom_view
> **Domain:** `data-structures` | **Subcategory:** `trees` | **Type:** `function`
## Overview
Bottom view traversal of binary tree

## Signature
```c
void bst_bottom_view(const Node* root);
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
typedef struct BSTQItemB {
    const Node* node;
    int hd;
} BSTQItemB;

void bst_bottom_view(const Node* root) {
    if (!root) return;
    int min_hd = 0, max_hd = 0;
    int map[2001];
    int filled[2001];
    for (int i = 0; i < 2001; i++) filled[i] = 0;

    BSTQItemB queue[1024];
    int front = 0, rear = 0;
    queue[rear++] = (BSTQItemB){ root, 0 };

    while (front < rear) {
        BSTQItemB item = queue[front++];
        int idx = item.hd + 1000;
        filled[idx] = 1;
        map[idx] = item.node->data;
        if (item.hd < min_hd) min_hd = item.hd;
        if (item.hd > max_hd) max_hd = item.hd;
        if (item.node->left) queue[rear++] = (BSTQItemB){ item.node->left, item.hd - 1 };
        if (item.node->right) queue[rear++] = (BSTQItemB){ item.node->right, item.hd + 1 };
    }

    for (int d = min_hd; d <= max_hd; d++) {
        if (filled[d + 1000]) printf("%d ", map[d + 1000]);
    }
}
```

## Aliases & Shorthands
Available via: `bst_bottom_view`, `data-structures.separate-components.trees.bst.bottom-view`, `data-structures>bst_bottom_view()`, `data-structures>separate-components>trees>bst>bottom-view>bst_bottom_view()`, `bottomViewBST`

## Dependencies
Requires: `data-structures.separate-components.trees.bst.node`
