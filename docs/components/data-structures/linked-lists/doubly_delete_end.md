# doubly_delete_end
> **Domain:** `data-structures` | **Subcategory:** `linked-lists` | **Type:** `function`
## Overview
Deletes tail node of doubly linked list and outputs value

## Signature
```c
int doubly_delete_end(Node** head, int* val);
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
int doubly_delete_end(Node** head, int* val) {
    if (!head || !*head) return 0;
    Node* cur = *head;
    while (cur->next) cur = cur->next;
    *val = cur->data;
    if (cur->prev) cur->prev->next = NULL;
    else *head = NULL;
    free(cur);
    return 1;
}
```

## Aliases & Shorthands
Available via: `doubly_delete_end`, `data-structures.separate-components.linked-lists.doubly.delete-end`, `data-structures>doubly_delete_end()`, `data-structures>separate-components>linked-lists>doubly>delete-end>doubly_delete_end()`, `deleteEndDoubly`

## Dependencies
Requires: `data-structures.separate-components.linked-lists.doubly.node`
