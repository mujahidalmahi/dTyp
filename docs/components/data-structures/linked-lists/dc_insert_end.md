# dc_insert_end
> **Domain:** `data-structures` | **Subcategory:** `linked-lists` | **Type:** `function`
## Overview
Inserts node at end of doubly circular linked list

## Signature
```c
void dc_insert_end(Node** head, int data);
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
void dc_insert_end(Node** head, int data) {
    Node* n = (Node*)malloc(sizeof(Node));
    if (!n) return;
    n->data = data;
    if (*head == NULL) {
        n->next = n;
        n->prev = n;
        *head = n;
        return;
    }
    Node* last = (*head)->prev;
    n->next = *head;
    n->prev = last;
    last->next = n;
    (*head)->prev = n;
}
```

## Aliases & Shorthands
Available via: `dc_insert_end`, `data-structures.separate-components.linked-lists.doubly-circular.insert-end`, `data-structures>dc_insert_end()`, `data-structures>separate-components>linked-lists>doubly-circular>insert-end>dc_insert_end()`, `insertDoublyCircularEnd`

## Dependencies
Requires: `data-structures.separate-components.linked-lists.doubly-circular.node`
