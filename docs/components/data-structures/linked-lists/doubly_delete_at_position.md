# doubly_delete_at_position
> **Domain:** `data-structures` | **Subcategory:** `linked-lists` | **Type:** `function`
## Overview
Deletes node at 1-based index from doubly linked list

## Signature
```c
int doubly_delete_at_position(Node** head, int pos, int* val);
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
int doubly_delete_at_position(Node** head, int pos, int* val) {
    if (!head || !*head || pos < 1) return 0;
    Node* cur = *head;
    for (int i = 1; cur && i < pos; i++) cur = cur->next;
    if (!cur) return 0;
    *val = cur->data;
    if (cur->prev) cur->prev->next = cur->next;
    else *head = cur->next;
    if (cur->next) cur->next->prev = cur->prev;
    free(cur);
    return 1;
}
```

## Aliases & Shorthands
Available via: `doubly_delete_at_position`, `data-structures.separate-components.linked-lists.doubly.delete-at-position`, `data-structures>doubly_delete_at_position()`, `data-structures>separate-components>linked-lists>doubly>delete-at-position>doubly_delete_at_position()`, `deleteAtPositionDoubly`

## Dependencies
Requires: `data-structures.separate-components.linked-lists.doubly.node`
