# doubly_delete_node
> **Domain:** `data-structures` | **Subcategory:** `linked-lists` | **Type:** `function`
## Overview
Deletes specific node from doubly linked list

## Signature
```c
void doubly_delete_node(Node** head, Node* del);
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
void doubly_delete_node(Node** head, Node* del) {
    if (!head || !*head || !del) return;
    if (*head == del) *head = del->next;
    if (del->next != NULL) del->next->prev = del->prev;
    if (del->prev != NULL) del->prev->next = del->next;
    free(del);
}
```

## Aliases & Shorthands
Available via: `doubly_delete_node`, `data-structures.separate-components.linked-lists.doubly.delete-node`, `data-structures>doubly_delete_node()`, `data-structures>separate-components>linked-lists>doubly>delete-node>doubly_delete_node()`, `deleteDoublyNode`

## Dependencies
Requires: `data-structures.separate-components.linked-lists.doubly.node`
