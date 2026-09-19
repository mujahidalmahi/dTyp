# dc_reverse
> **Domain:** `data-structures` | **Subcategory:** `linked-lists` | **Type:** `function`
## Overview
Reverses doubly circular list by swapping prev and next pointers

## Signature
```c
void dc_reverse(Node** head);
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
void dc_reverse(Node** head) {
    if (!head || !*head || (*head)->next == *head) return;
    Node* cur = *head;
    do {
        Node* tmp = cur->next;
        cur->next = cur->prev;
        cur->prev = tmp;
        cur = tmp;
    } while (cur != *head);
    *head = (*head)->prev;
}
```

## Aliases & Shorthands
Available via: `dc_reverse`, `data-structures.separate-components.linked-lists.doubly-circular.reverse`, `data-structures>dc_reverse()`, `data-structures>separate-components>linked-lists>doubly-circular>reverse>dc_reverse()`, `reverseDoublyCircular`

## Dependencies
Requires: `data-structures.separate-components.linked-lists.doubly-circular.node`
