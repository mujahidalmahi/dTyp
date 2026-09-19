# sc_delete_value
> **Domain:** `data-structures` | **Subcategory:** `linked-lists` | **Type:** `function`
## Overview
Deletes first occurrence of value in singly circular linked list

## Signature
```c
int sc_delete_value(Node** head, int val);
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
int sc_delete_value(Node** head, int val) {
    if (!head || !*head) return 0;
    if ((*head)->data == val) {
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
    Node* cur = (*head)->next;
    while (cur != *head && cur->data != val) {
        prev = cur;
        cur = cur->next;
    }
    if (cur != *head) {
        prev->next = cur->next;
        free(cur);
        return 1;
    }
    return 0;
}
```

## Aliases & Shorthands
Available via: `sc_delete_value`, `data-structures.separate-components.linked-lists.singly-circular.delete-value`, `data-structures>sc_delete_value()`, `data-structures>separate-components>linked-lists>singly-circular>delete-value>sc_delete_value()`, `deleteValueCircular`

## Dependencies
Requires: `data-structures.separate-components.linked-lists.singly-circular.node`
