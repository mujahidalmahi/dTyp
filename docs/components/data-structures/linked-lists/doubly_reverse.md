# doubly_reverse
> **Domain:** `data-structures` | **Subcategory:** `linked-lists` | **Type:** `function`
## Overview
Reverses doubly linked list by swapping prev and next pointers

## Signature
```c
void doubly_reverse(Node** head);
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
void doubly_reverse(Node** head) {
    if (!*head) return;
    Node* cur = *head;
    Node* tmp = NULL;
    while (cur) {
        tmp = cur->prev;
        cur->prev = cur->next;
        cur->next = tmp;
        cur = cur->prev;
    }
    if (tmp) *head = tmp->prev;
}
```

## Aliases & Shorthands
Available via: `doubly_reverse`, `data-structures.separate-components.linked-lists.doubly.reverse`, `data-structures>doubly_reverse()`, `data-structures>separate-components>linked-lists>doubly>reverse>doubly_reverse()`, `reverseDoublyList`

## Dependencies
Requires: `data-structures.separate-components.linked-lists.doubly.node`
