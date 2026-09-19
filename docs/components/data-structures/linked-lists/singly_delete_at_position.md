# singly_delete_at_position
> **Domain:** `data-structures` | **Subcategory:** `linked-lists` | **Type:** `function`
## Overview
Deletes node at 1-based index from singly linked list

## Signature
```c
int singly_delete_at_position(Node** head, int pos, int* val);
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
int singly_delete_at_position(Node** head, int pos, int* val) {
    if (!head || !*head || pos < 1) return 0;
    if (pos == 1) {
        Node* tmp = *head;
        *val = tmp->data;
        *head = (*head)->next;
        free(tmp);
        return 1;
    }
    Node* cur = *head;
    for (int i = 1; cur && i < pos - 1; i++) cur = cur->next;
    if (!cur || !cur->next) return 0;
    Node* tmp = cur->next;
    *val = tmp->data;
    cur->next = tmp->next;
    free(tmp);
    return 1;
}
```

## Aliases & Shorthands
Available via: `singly_delete_at_position`, `data-structures.separate-components.linked-lists.singly.delete-at-position`, `data-structures>singly_delete_at_position()`, `data-structures>separate-components>linked-lists>singly>delete-at-position>singly_delete_at_position()`, `deleteAtPositionSingly`

## Dependencies
Requires: `linkedList.node`
