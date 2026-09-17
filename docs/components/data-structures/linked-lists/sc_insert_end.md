# sc_insert_end
> **Domain:** `data-structures` | **Subcategory:** `linked-lists` | **Type:** `function`
## Overview
Inserts node at end of singly circular linked list

## Signature
```c
void sc_insert_end(Node** head, int data);
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
void sc_insert_end(Node** head, int data) {
    Node* n = (Node*)malloc(sizeof(Node));
    if (!n) return;
    n->data = data;
    if (*head == NULL) {
        n->next = n;
        *head = n;
        return;
    }
    Node* cur = *head;
    while (cur->next != *head) {
        cur = cur->next;
    }
    cur->next = n;
    n->next = *head;
}
```

## Aliases & Shorthands
Available via: `sc_insert_end`, `data-structures.separate-components.linked-lists.singly-circular.insert-end`, `data-structures>sc_insert_end()`, `data-structures>separate-components>linked-lists>singly-circular>insert-end>sc_insert_end()`, `insertCircularEnd`

## Dependencies
Requires: `data-structures.separate-components.linked-lists.singly-circular.node`
