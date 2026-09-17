# dc_free
> **Domain:** `data-structures` | **Subcategory:** `linked-lists` | **Type:** `function`
## Overview
Frees all nodes in doubly circular linked list

## Signature
```c
void dc_free(Node** head);
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
void dc_free(Node** head) {
    if (!head || !*head) return;
    Node* cur = *head;
    Node* last = (*head)->prev;
    while (cur != last) {
        Node* nxt = cur->next;
        free(cur);
        cur = nxt;
    }
    free(last);
    *head = NULL;
}
```

## Aliases & Shorthands
Available via: `dc_free`, `data-structures.separate-components.linked-lists.doubly-circular.free`, `data-structures>dc_free()`, `data-structures>separate-components>linked-lists>doubly-circular>free>dc_free()`, `freeDoublyCircularList`

## Dependencies
Requires: `data-structures.separate-components.linked-lists.doubly-circular.node`
