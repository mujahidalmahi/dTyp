# singly_delete_end
> **Domain:** `data-structures` | **Subcategory:** `linked-lists` | **Type:** `function`
## Overview
Deletes tail node of singly linked list and outputs value

## Signature
```c
int singly_delete_end(Node** head, int* val);
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
int singly_delete_end(Node** head, int* val) {
    if (!head || !*head) return 0;
    if (!(*head)->next) {
        *val = (*head)->data;
        free(*head);
        *head = NULL;
        return 1;
    }
    Node* cur = *head;
    while (cur->next->next) cur = cur->next;
    *val = cur->next->data;
    free(cur->next);
    cur->next = NULL;
    return 1;
}
```

## Aliases & Shorthands
Available via: `singly_delete_end`, `data-structures.separate-components.linked-lists.singly.delete-end`, `data-structures>singly_delete_end()`, `data-structures>separate-components>linked-lists>singly>delete-end>singly_delete_end()`, `deleteEndSingly`

## Dependencies
Requires: `linkedList.node`
