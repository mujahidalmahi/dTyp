# doubly_insert_before
> **Domain:** `data-structures` | **Subcategory:** `linked-lists` | **Type:** `function`
## Overview
Inserts node immediately before given target in doubly linked list

## Signature
```c
void doubly_insert_before(Node** head, Node* target, int data);
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
void doubly_insert_before(Node** head, Node* target, int data) {
    if (!head || !target) return;
    if (*head == target) {
        doubly_insert_head(head, data);
        return;
    }
    Node* n = doubly_create_node(data);
    if (!n) return;
    n->prev = target->prev;
    n->next = target;
    if (target->prev) target->prev->next = n;
    target->prev = n;
}
```

## Aliases & Shorthands
Available via: `doubly_insert_before`, `data-structures.separate-components.linked-lists.doubly.insert-before`, `data-structures>doubly_insert_before()`, `data-structures>separate-components>linked-lists>doubly>insert-before>doubly_insert_before()`, `insertBeforeDoubly`

## Dependencies
Requires: `data-structures.separate-components.linked-lists.doubly.node`, `data-structures.separate-components.linked-lists.doubly.create-node`, `data-structures.separate-components.linked-lists.doubly.insert-head`
