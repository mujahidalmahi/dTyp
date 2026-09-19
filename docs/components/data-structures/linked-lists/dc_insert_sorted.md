# dc_insert_sorted
> **Domain:** `data-structures` | **Subcategory:** `linked-lists` | **Type:** `function`
## Overview
Inserts value in ascending sorted order in doubly circular list

## Signature
```c
void dc_insert_sorted(Node** head, int data);
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
void dc_insert_sorted(Node** head, int data) {
    Node* n = (Node*)malloc(sizeof(Node));
    if (!n) return;
    n->data = data;
    if (!*head) {
        n->next = n;
        n->prev = n;
        *head = n;
        return;
    }
    if (data <= (*head)->data) {
        Node* last = (*head)->prev;
        n->next = *head;
        n->prev = last;
        last->next = n;
        (*head)->prev = n;
        *head = n;
        return;
    }
    Node* cur = *head;
    while (cur->next != *head && cur->next->data < data) cur = cur->next;
    n->next = cur->next;
    n->prev = cur;
    cur->next->prev = n;
    cur->next = n;
}
```

## Aliases & Shorthands
Available via: `dc_insert_sorted`, `data-structures.separate-components.linked-lists.doubly-circular.insert-sorted`, `data-structures>dc_insert_sorted()`, `data-structures>separate-components>linked-lists>doubly-circular>insert-sorted>dc_insert_sorted()`, `insertSortedDoublyCircular`

## Dependencies
Requires: `data-structures.separate-components.linked-lists.doubly-circular.node`
