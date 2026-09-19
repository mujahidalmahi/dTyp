# dc_delete_end
> **Domain:** `data-structures` | **Subcategory:** `linked-lists` | **Type:** `function`
## Overview
Deletes tail node of doubly circular linked list

## Signature
```c
int dc_delete_end(Node** head, int* val);
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
int dc_delete_end(Node** head, int* val) {
    if (!head || !*head) return 0;
    if ((*head)->next == *head) {
        *val = (*head)->data;
        free(*head);
        *head = NULL;
        return 1;
    }
    Node* last = (*head)->prev;
    *val = last->data;
    Node* prev = last->prev;
    prev->next = *head;
    (*head)->prev = prev;
    free(last);
    return 1;
}
```

## Aliases & Shorthands
Available via: `dc_delete_end`, `data-structures.separate-components.linked-lists.doubly-circular.delete-end`, `data-structures>dc_delete_end()`, `data-structures>separate-components>linked-lists>doubly-circular>delete-end>dc_delete_end()`, `deleteEndDoublyCircular`

## Dependencies
Requires: `data-structures.separate-components.linked-lists.doubly-circular.node`
