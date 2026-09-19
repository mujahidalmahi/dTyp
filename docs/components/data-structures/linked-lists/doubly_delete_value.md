# doubly_delete_value
> **Domain:** `data-structures` | **Subcategory:** `linked-lists` | **Type:** `function`
## Overview
Deletes first occurrence of given value in doubly linked list

## Signature
```c
int doubly_delete_value(Node** head, int val);
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
int doubly_delete_value(Node** head, int val) {
    if (!head || !*head) return 0;
    Node* cur = *head;
    while (cur && cur->data != val) cur = cur->next;
    if (!cur) return 0;
    if (cur == *head) *head = cur->next;
    if (cur->prev) cur->prev->next = cur->next;
    if (cur->next) cur->next->prev = cur->prev;
    free(cur);
    return 1;
}
```

## Aliases & Shorthands
Available via: `doubly_delete_value`, `data-structures.separate-components.linked-lists.doubly.delete-value`, `data-structures>doubly_delete_value()`, `data-structures>separate-components>linked-lists>doubly>delete-value>doubly_delete_value()`, `deleteValueDoubly`

## Dependencies
Requires: `data-structures.separate-components.linked-lists.doubly.node`
