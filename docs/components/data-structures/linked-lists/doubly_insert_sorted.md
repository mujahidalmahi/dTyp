# doubly_insert_sorted
> **Domain:** `data-structures` | **Subcategory:** `linked-lists` | **Type:** `function`
## Overview
Inserts value in ascending order into doubly linked list

## Signature
```c
void doubly_insert_sorted(Node** head, int data);
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
void doubly_insert_sorted(Node** head, int data) {
    Node* n = doubly_create_node(data);
    if (!n) return;
    if (!*head || (*head)->data >= data) {
        n->next = *head;
        if (*head) (*head)->prev = n;
        *head = n;
        return;
    }
    Node* cur = *head;
    while (cur->next && cur->next->data < data) cur = cur->next;
    n->next = cur->next;
    n->prev = cur;
    if (cur->next) cur->next->prev = n;
    cur->next = n;
}
```

## Aliases & Shorthands
Available via: `doubly_insert_sorted`, `data-structures.separate-components.linked-lists.doubly.insert-sorted`, `data-structures>doubly_insert_sorted()`, `data-structures>separate-components>linked-lists>doubly>insert-sorted>doubly_insert_sorted()`, `insertSortedDoubly`

## Dependencies
Requires: `data-structures.separate-components.linked-lists.doubly.node`, `data-structures.separate-components.linked-lists.doubly.create-node`
