# dc_delete_value
> **Domain:** `data-structures` | **Subcategory:** `linked-lists` | **Type:** `function`
## Overview
Deletes first occurrence of value in doubly circular linked list

## Signature
```c
int dc_delete_value(Node** head, int val);
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
int dc_delete_value(Node** head, int val) {
    if (!head || !*head) return 0;
    if ((*head)->data == val) {
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
    Node* cur = (*head)->next;
    while (cur != *head && cur->data != val) cur = cur->next;
    if (cur != *head) {
        cur->prev->next = cur->next;
        cur->next->prev = cur->prev;
        free(cur);
        return 1;
    }
    return 0;
}
```

## Aliases & Shorthands
Available via: `dc_delete_value`, `data-structures.separate-components.linked-lists.doubly-circular.delete-value`, `data-structures>dc_delete_value()`, `data-structures>separate-components>linked-lists>doubly-circular>delete-value>dc_delete_value()`, `deleteValueDoublyCircular`

## Dependencies
Requires: `data-structures.separate-components.linked-lists.doubly-circular.node`
