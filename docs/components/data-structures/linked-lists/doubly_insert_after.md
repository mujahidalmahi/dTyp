# doubly_insert_after
> **Domain:** `data-structures` | **Subcategory:** `linked-lists` | **Type:** `function`
## Overview
Inserts node immediately after given target in doubly linked list

## Signature
```c
void doubly_insert_after(Node* target, int data);
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
void doubly_insert_after(Node* target, int data) {
    if (!target) return;
    Node* n = doubly_create_node(data);
    if (!n) return;
    n->next = target->next;
    n->prev = target;
    if (target->next) target->next->prev = n;
    target->next = n;
}
```

## Aliases & Shorthands
Available via: `doubly_insert_after`, `data-structures.separate-components.linked-lists.doubly.insert-after`, `data-structures>doubly_insert_after()`, `data-structures>separate-components>linked-lists>doubly>insert-after>doubly_insert_after()`, `insertAfterDoubly`

## Dependencies
Requires: `data-structures.separate-components.linked-lists.doubly.node`, `data-structures.separate-components.linked-lists.doubly.create-node`
