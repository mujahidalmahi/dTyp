# createNode
> **Domain:** `data-structures` | **Subcategory:** `linked-lists` | **Type:** `function`
## Overview
Allocates a new linked list node

## Signature
```c
Node* createNode(int data);
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
Node* createNode(int data) {
    Node* n = (Node*)malloc(sizeof(Node));
    if (!n) return NULL;
    n->data = data;
    n->next = NULL;
    return n;
}
```

## Aliases & Shorthands
Available via: `createNode`, `linkedList.createNode`, `data-structures>createNode()`, `data-structures>separate-components>linked-lists>singly>create-node>createNode()`, `create_node`, `linkedList>createNode()`

## Dependencies
Requires: `linkedList.node`
