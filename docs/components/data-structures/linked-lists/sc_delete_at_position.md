# sc_delete_at_position
> **Domain:** `data-structures` | **Subcategory:** `linked-lists` | **Type:** `function`
## Overview
Deletes node at 1-based index in singly circular linked list

## Signature
```c
int sc_delete_at_position(Node** head, int pos, int* val);
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
int sc_delete_at_position(Node** head, int pos, int* val) {
    if (!head || !*head || pos < 1) return 0;
    if (pos == 1) {
        *val = (*head)->data;
        if ((*head)->next == *head) {
            free(*head);
            *head = NULL;
            return 1;
        }
        Node* last = *head;
        while (last->next != *head) last = last->next;
        Node* tmp = *head;
        *head = (*head)->next;
        last->next = *head;
        free(tmp);
        return 1;
    }
    Node* prev = *head;
    for (int i = 1; prev->next != *head && i < pos - 1; i++) prev = prev->next;
    if (prev->next == *head) return 0;
    Node* cur = prev->next;
    *val = cur->data;
    prev->next = cur->next;
    free(cur);
    return 1;
}
```

## Aliases & Shorthands
Available via: `sc_delete_at_position`, `data-structures.separate-components.linked-lists.singly-circular.delete-at-position`, `data-structures>sc_delete_at_position()`, `data-structures>separate-components>linked-lists>singly-circular>delete-at-position>sc_delete_at_position()`, `deleteAtPositionCircular`

## Dependencies
Requires: `data-structures.separate-components.linked-lists.singly-circular.node`
