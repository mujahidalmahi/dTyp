# Node
> **Domain:** `data-structures` | **Subcategory:** `trees` | **Type:** `struct`
## Overview
Self-balancing AVL Tree node struct with height field

## Signature
```c
typedef struct Node { int data; int height; struct Node* left; struct Node* right; } Node; typedef Node AVLNode;
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
typedef struct Node {
    int data;
    int height;
    struct Node* left;
    struct Node* right;
} Node;
typedef Node AVLNode;
```

## Aliases & Shorthands
Available via: `Node`, `data-structures.separate-components.trees.avl.node`, `data-structures>Node()`, `data-structures>separate-components>trees>avl>node>Node()`, `AVLNode`, `avl_node`
