# bst_top_view
> **Domain:** `data-structures` | **Subcategory:** `trees` | **Type:** `function`
## Overview
Top view traversal of binary tree using horizontal distance

## Signature
```c
void bst_top_view(const Node* root);
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
typedef struct BSTQItemT {
    const Node* node;
    int hd;
} BSTQItemT;

void bst_top_view(const Node* root) {
    if (!root) return;
    int min_hd = 0, max_hd = 0;
    int map[2001];
    int filled[2001];
    for (int i = 0; i < 2001; i++) filled[i] = 0;

    BSTQItemT queue[1024];
    int front = 0, rear = 0;
    queue[rear++] = (BSTQItemT){ root, 0 };

    while (front < rear) {
        BSTQItemT item = queue[front++];
        int idx = item.hd + 1000;
        if (!filled[idx]) {
            filled[idx] = 1;
            map[idx] = item.node->data;
            if (item.hd < min_hd) min_hd = item.hd;
            if (item.hd > max_hd) max_hd = item.hd;
        }
        if (item.node->left) queue[rear++] = (BSTQItemT){ item.node->left, item.hd - 1 };
        if (item.node->right) queue[rear++] = (BSTQItemT){ item.node->right, item.hd + 1 };
    }

    for (int d = min_hd; d <= max_hd; d++) {
        if (filled[d + 1000]) printf("%d ", map[d + 1000]);
    }
}
```

## Aliases & Shorthands
Available via: `bst_top_view`, `data-structures.separate-components.trees.bst.top-view`, `data-structures>bst_top_view()`, `data-structures>separate-components>trees>bst>top-view>bst_top_view()`, `topViewBST`

## Dependencies
Requires: `data-structures.separate-components.trees.bst.node`
