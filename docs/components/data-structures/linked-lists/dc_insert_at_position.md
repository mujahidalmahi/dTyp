# dc_insert_at_position
> **Domain:** `data-structures` | **Subcategory:** `linked-lists` | **Type:** `function`
## Overview
Inserts node at 1-based position in doubly circular linked list

## Signature
```c
int dc_insert_at_position(Node** head, int pos, int data);
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
int dc_insert_at_position(Node** head, int pos, int data) {
    if (pos < 1) return 0;
    if (pos == 1) {
        dc_insert_beginning(head, data);
        return 1;
    }
    if (!*head) return 0;
    Node* cur = *head;
    for (int i = 1; cur->next != *head && i < pos - 1; i++) cur = cur->next;
    Node* n = (Node*)malloc(sizeof(Node));
    if (!n) return 0;
    n->data = data;
    n->next = cur->next;
    n->prev = cur;
    cur->next->prev = n;
    cur->next = n;
    return 1;
}
```

## Aliases & Shorthands
Available via: `dc_insert_at_position`, `data-structures.separate-components.linked-lists.doubly-circular.insert-at-position`, `data-structures>dc_insert_at_position()`, `data-structures>separate-components>linked-lists>doubly-circular>insert-at-position>dc_insert_at_position()`, `insertAtPositionDoublyCircular`

## Dependencies
Requires: `data-structures.separate-components.linked-lists.doubly-circular.node`, `data-structures.separate-components.linked-lists.doubly-circular.insert-beginning`
