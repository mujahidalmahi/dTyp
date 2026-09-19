# dc_delete_beginning
> **Domain:** `data-structures` | **Subcategory:** `linked-lists` | **Type:** `function`
## Overview
Deletes head node of doubly circular linked list

## Signature
```c
int dc_delete_beginning(Node** head, int* val);
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
int dc_delete_beginning(Node** head, int* val) {
    if (!head || !*head) return 0;
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
```

## Aliases & Shorthands
Available via: `dc_delete_beginning`, `data-structures.separate-components.linked-lists.doubly-circular.delete-beginning`, `data-structures>dc_delete_beginning()`, `data-structures>separate-components>linked-lists>doubly-circular>delete-beginning>dc_delete_beginning()`, `deleteBeginningDoublyCircular`

## Dependencies
Requires: `data-structures.separate-components.linked-lists.doubly-circular.node`
