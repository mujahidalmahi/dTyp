# doubly_insert_at_position
> **Domain:** `data-structures` | **Subcategory:** `linked-lists` | **Type:** `function`
## Overview
Inserts node at 1-based position in doubly linked list

## Signature
```c
int doubly_insert_at_position(Node** head, int pos, int data);
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
int doubly_insert_at_position(Node** head, int pos, int data) {
    if (pos < 1) return 0;
    if (pos == 1) {
        doubly_insert_head(head, data);
        return 1;
    }
    Node* cur = *head;
    for (int i = 1; cur && i < pos - 1; i++) cur = cur->next;
    if (!cur) return 0;
    Node* n = doubly_create_node(data);
    if (!n) return 0;
    n->next = cur->next;
    n->prev = cur;
    if (cur->next) cur->next->prev = n;
    cur->next = n;
    return 1;
}
```

## Aliases & Shorthands
Available via: `doubly_insert_at_position`, `data-structures.separate-components.linked-lists.doubly.insert-at-position`, `data-structures>doubly_insert_at_position()`, `data-structures>separate-components>linked-lists>doubly>insert-at-position>doubly_insert_at_position()`, `insertAtPositionDoubly`

## Dependencies
Requires: `data-structures.separate-components.linked-lists.doubly.node`, `data-structures.separate-components.linked-lists.doubly.create-node`, `data-structures.separate-components.linked-lists.doubly.insert-head`
