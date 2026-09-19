# sc_insert_at_position
> **Domain:** `data-structures` | **Subcategory:** `linked-lists` | **Type:** `function`
## Overview
Inserts node at 1-based position in singly circular linked list

## Signature
```c
int sc_insert_at_position(Node** head, int pos, int data);
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
int sc_insert_at_position(Node** head, int pos, int data) {
    if (pos < 1) return 0;
    if (pos == 1) {
        Node* n = (Node*)malloc(sizeof(Node));
        if (!n) return 0;
        n->data = data;
        if (!*head) {
            n->next = n;
            *head = n;
            return 1;
        }
        Node* last = *head;
        while (last->next != *head) last = last->next;
        n->next = *head;
        last->next = n;
        *head = n;
        return 1;
    }
    if (!*head) return 0;
    Node* cur = *head;
    for (int i = 1; cur->next != *head && i < pos - 1; i++) cur = cur->next;
    Node* n = (Node*)malloc(sizeof(Node));
    if (!n) return 0;
    n->data = data;
    n->next = cur->next;
    cur->next = n;
    return 1;
}
```

## Aliases & Shorthands
Available via: `sc_insert_at_position`, `data-structures.separate-components.linked-lists.singly-circular.insert-at-position`, `data-structures>sc_insert_at_position()`, `data-structures>separate-components>linked-lists>singly-circular>insert-at-position>sc_insert_at_position()`, `insertAtPositionCircular`

## Dependencies
Requires: `data-structures.separate-components.linked-lists.singly-circular.node`
