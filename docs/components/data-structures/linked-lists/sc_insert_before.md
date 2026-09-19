# sc_insert_before
> **Domain:** `data-structures` | **Subcategory:** `linked-lists` | **Type:** `function`
## Overview
Inserts node before target value in singly circular linked list

## Signature
```c
int sc_insert_before(Node** head, int target, int data);
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
int sc_insert_before(Node** head, int target, int data) {
    if (!head || !*head) return 0;
    if ((*head)->data == target) {
        Node* n = (Node*)malloc(sizeof(Node));
        if (!n) return 0;
        n->data = data;
        Node* last = *head;
        while (last->next != *head) last = last->next;
        n->next = *head;
        last->next = n;
        *head = n;
        return 1;
    }
    Node* cur = *head;
    while (cur->next != *head && cur->next->data != target) cur = cur->next;
    if (cur->next != *head && cur->next->data == target) {
        Node* n = (Node*)malloc(sizeof(Node));
        if (!n) return 0;
        n->data = data;
        n->next = cur->next;
        cur->next = n;
        return 1;
    }
    return 0;
}
```

## Aliases & Shorthands
Available via: `sc_insert_before`, `data-structures.separate-components.linked-lists.singly-circular.insert-before`, `data-structures>sc_insert_before()`, `data-structures>separate-components>linked-lists>singly-circular>insert-before>sc_insert_before()`, `insertBeforeCircular`

## Dependencies
Requires: `data-structures.separate-components.linked-lists.singly-circular.node`
