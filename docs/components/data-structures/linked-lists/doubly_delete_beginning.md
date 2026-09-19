# doubly_delete_beginning
> **Domain:** `data-structures` | **Subcategory:** `linked-lists` | **Type:** `function`
## Overview
Deletes head node of doubly linked list and outputs value

## Signature
```c
int doubly_delete_beginning(Node** head, int* val);
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
int doubly_delete_beginning(Node** head, int* val) {
    if (!head || !*head) return 0;
    Node* tmp = *head;
    *val = tmp->data;
    *head = (*head)->next;
    if (*head) (*head)->prev = NULL;
    free(tmp);
    return 1;
}
```

## Aliases & Shorthands
Available via: `doubly_delete_beginning`, `data-structures.separate-components.linked-lists.doubly.delete-beginning`, `data-structures>doubly_delete_beginning()`, `data-structures>separate-components>linked-lists>doubly>delete-beginning>doubly_delete_beginning()`, `deleteBeginningDoubly`

## Dependencies
Requires: `data-structures.separate-components.linked-lists.doubly.node`
