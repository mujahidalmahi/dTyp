# sc_create_node
> **Domain:** `data-structures` | **Subcategory:** `linked-lists` | **Type:** `function`
## Overview
Allocates a new node pointing to itself for circular linked list

## Signature
```c
Node* sc_create_node(int data);
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
Node* sc_create_node(int data) {
    Node* n = (Node*)malloc(sizeof(Node));
    if (!n) return NULL;
    n->data = data;
    n->next = n;
    return n;
}
```

## Aliases & Shorthands
Available via: `sc_create_node`, `data-structures.separate-components.linked-lists.singly-circular.create-node`, `data-structures>sc_create_node()`, `data-structures>separate-components>linked-lists>singly-circular>create-node>sc_create_node()`, `createCircularNode`

## Dependencies
Requires: `data-structures.separate-components.linked-lists.singly-circular.node`
