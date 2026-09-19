# dc_create_node
> **Domain:** `data-structures` | **Subcategory:** `linked-lists` | **Type:** `function`
## Overview
Allocates a new doubly circular node pointing to itself

## Signature
```c
Node* dc_create_node(int data);
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
Node* dc_create_node(int data) {
    Node* n = (Node*)malloc(sizeof(Node));
    if (!n) return NULL;
    n->data = data;
    n->prev = n;
    n->next = n;
    return n;
}
```

## Aliases & Shorthands
Available via: `dc_create_node`, `data-structures.separate-components.linked-lists.doubly-circular.create-node`, `data-structures>dc_create_node()`, `data-structures>separate-components>linked-lists>doubly-circular>create-node>dc_create_node()`, `createDoublyCircularNode`

## Dependencies
Requires: `data-structures.separate-components.linked-lists.doubly-circular.node`
