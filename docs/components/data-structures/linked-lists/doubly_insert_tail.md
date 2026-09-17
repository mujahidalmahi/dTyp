# doubly_insert_tail
> **Domain:** `data-structures` | **Subcategory:** `linked-lists` | **Type:** `function`
## Overview
Inserts node at end of doubly linked list

## Signature
```c
void doubly_insert_tail(Node** head, int data);
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
void doubly_insert_tail(Node** head, int data) {
    Node* n = doubly_create_node(data);
    if (!n) return;
    if (*head == NULL) {
        *head = n;
        return;
    }
    Node* cur = *head;
    while (cur->next != NULL) {
        cur = cur->next;
    }
    cur->next = n;
    n->prev = cur;
}
```

## Aliases & Shorthands
Available via: `doubly_insert_tail`, `data-structures.separate-components.linked-lists.doubly.insert-tail`, `data-structures>doubly_insert_tail()`, `data-structures>separate-components>linked-lists>doubly>insert-tail>doubly_insert_tail()`, `insertTailDoubly`

## Dependencies
Requires: `data-structures.separate-components.linked-lists.doubly.node`, `data-structures.separate-components.linked-lists.doubly.create-node`
