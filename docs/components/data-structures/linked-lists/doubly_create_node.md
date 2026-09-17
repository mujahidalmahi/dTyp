# doubly_create_node
> **Domain:** `data-structures` | **Subcategory:** `linked-lists` | **Type:** `function`
## Overview
Allocates a new doubly linked list node

## Signature
```c
Node* doubly_create_node(int data);
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
Node* doubly_create_node(int data) {
    Node* n = (Node*)malloc(sizeof(Node));
    if (!n) return NULL;
    n->data = data;
    n->prev = NULL;
    n->next = NULL;
    return n;
}
```

## Aliases & Shorthands
Available via: `doubly_create_node`, `data-structures.separate-components.linked-lists.doubly.create-node`, `data-structures>doubly_create_node()`, `data-structures>separate-components>linked-lists>doubly>create-node>doubly_create_node()`, `createDoublyNode`

## Dependencies
Requires: `data-structures.separate-components.linked-lists.doubly.node`
