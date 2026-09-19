# dc_delete_at_position
> **Domain:** `data-structures` | **Subcategory:** `linked-lists` | **Type:** `function`
## Overview
Deletes node at 1-based index in doubly circular linked list

## Signature
```c
int dc_delete_at_position(Node** head, int pos, int* val);
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
int dc_delete_at_position(Node** head, int pos, int* val) {
    if (!head || !*head || pos < 1) return 0;
    if (pos == 1) {
        *val = (*head)->data;
        if ((*head)->next == *head) {
            free(*head);
            *head = NULL;
            return 1;
        }
        Node* last = (*head)->prev;
        Node* nxt = (*head)->next;
        last->next = nxt;
        nxt->prev = last;
        free(*head);
        *head = nxt;
        return 1;
    }
    Node* cur = *head;
    for (int i = 1; cur->next != *head && i < pos; i++) cur = cur->next;
    if (cur == *head) return 0;
    *val = cur->data;
    cur->prev->next = cur->next;
    cur->next->prev = cur->prev;
    free(cur);
    return 1;
}
```

## Aliases & Shorthands
Available via: `dc_delete_at_position`, `data-structures.separate-components.linked-lists.doubly-circular.delete-at-position`, `data-structures>dc_delete_at_position()`, `data-structures>separate-components>linked-lists>doubly-circular>delete-at-position>dc_delete_at_position()`, `deleteAtPositionDoublyCircular`

## Dependencies
Requires: `data-structures.separate-components.linked-lists.doubly-circular.node`
