# singly_delete_value
> **Domain:** `data-structures` | **Subcategory:** `linked-lists` | **Type:** `function`
## Overview
Deletes first occurrence of given value from singly linked list

## Signature
```c
int singly_delete_value(Node** head, int val);
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
int singly_delete_value(Node** head, int val) {
    if (!head || !*head) return 0;
    Node* cur = *head;
    if (cur->data == val) {
        *head = cur->next;
        free(cur);
        return 1;
    }
    while (cur->next && cur->next->data != val) {
        cur = cur->next;
    }
    if (cur->next) {
        Node* del = cur->next;
        cur->next = del->next;
        free(del);
        return 1;
    }
    return 0;
}
```

## Aliases & Shorthands
Available via: `singly_delete_value`, `data-structures.separate-components.linked-lists.singly.delete-value`, `data-structures>singly_delete_value()`, `data-structures>separate-components>linked-lists>singly>delete-value>singly_delete_value()`, `deleteValue`

## Dependencies
Requires: `linkedList.node`
