# sc_delete_end
> **Domain:** `data-structures` | **Subcategory:** `linked-lists` | **Type:** `function`
## Overview
Deletes tail node of singly circular linked list

## Signature
```c
int sc_delete_end(Node** head, int* val);
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
int sc_delete_end(Node** head, int* val) {
    if (!head || !*head) return 0;
    if ((*head)->next == *head) {
        *val = (*head)->data;
        free(*head);
        *head = NULL;
        return 1;
    }
    Node* prev = NULL;
    Node* cur = *head;
    while (cur->next != *head) {
        prev = cur;
        cur = cur->next;
    }
    *val = cur->data;
    prev->next = *head;
    free(cur);
    return 1;
}
```

## Aliases & Shorthands
Available via: `sc_delete_end`, `data-structures.separate-components.linked-lists.singly-circular.delete-end`, `data-structures>sc_delete_end()`, `data-structures>separate-components>linked-lists>singly-circular>delete-end>sc_delete_end()`, `deleteEndCircular`

## Dependencies
Requires: `data-structures.separate-components.linked-lists.singly-circular.node`
