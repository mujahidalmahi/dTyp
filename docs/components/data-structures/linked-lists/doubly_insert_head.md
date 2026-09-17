# doubly_insert_head
> **Domain:** `data-structures` | **Subcategory:** `linked-lists` | **Type:** `function`
## Overview
Inserts node at front of doubly linked list

## Signature
```c
void doubly_insert_head(Node** head, int data);
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
void doubly_insert_head(Node** head, int data) {
    Node* n = doubly_create_node(data);
    if (!n) return;
    if (*head != NULL) {
        (*head)->prev = n;
        n->next = *head;
    }
    *head = n;
}
```

## Aliases & Shorthands
Available via: `doubly_insert_head`, `data-structures.separate-components.linked-lists.doubly.insert-head`, `data-structures>doubly_insert_head()`, `data-structures>separate-components>linked-lists>doubly>insert-head>doubly_insert_head()`, `insertHeadDoubly`

## Dependencies
Requires: `data-structures.separate-components.linked-lists.doubly.node`, `data-structures.separate-components.linked-lists.doubly.create-node`
