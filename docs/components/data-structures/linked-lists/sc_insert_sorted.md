# sc_insert_sorted
> **Domain:** `data-structures` | **Subcategory:** `linked-lists` | **Type:** `function`
## Overview
Inserts value into ascending sorted circular singly linked list

## Signature
```c
void sc_insert_sorted(Node** head, int data);
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
void sc_insert_sorted(Node** head, int data) {
    Node* n = (Node*)malloc(sizeof(Node));
    if (!n) return;
    n->data = data;
    if (!*head) {
        n->next = n;
        *head = n;
        return;
    }
    if (data <= (*head)->data) {
        Node* last = *head;
        while (last->next != *head) last = last->next;
        n->next = *head;
        last->next = n;
        *head = n;
        return;
    }
    Node* cur = *head;
    while (cur->next != *head && cur->next->data < data) cur = cur->next;
    n->next = cur->next;
    cur->next = n;
}
```

## Aliases & Shorthands
Available via: `sc_insert_sorted`, `data-structures.separate-components.linked-lists.singly-circular.insert-sorted`, `data-structures>sc_insert_sorted()`, `data-structures>separate-components>linked-lists>singly-circular>insert-sorted>sc_insert_sorted()`, `insertSortedCircular`

## Dependencies
Requires: `data-structures.separate-components.linked-lists.singly-circular.node`
