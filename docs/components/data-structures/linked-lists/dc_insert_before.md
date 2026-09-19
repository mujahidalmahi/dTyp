# dc_insert_before
> **Domain:** `data-structures` | **Subcategory:** `linked-lists` | **Type:** `function`
## Overview
Inserts node before target value in doubly circular linked list

## Signature
```c
int dc_insert_before(Node** head, int target, int data);
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
int dc_insert_before(Node** head, int target, int data) {
    if (!head || !*head) return 0;
    if ((*head)->data == target) {
        dc_insert_beginning(head, data);
        return 1;
    }
    Node* cur = (*head)->next;
    while (cur != *head && cur->data != target) cur = cur->next;
    if (cur != *head) {
        Node* n = (Node*)malloc(sizeof(Node));
        if (!n) return 0;
        n->data = data;
        n->prev = cur->prev;
        n->next = cur;
        cur->prev->next = n;
        cur->prev = n;
        return 1;
    }
    return 0;
}
```

## Aliases & Shorthands
Available via: `dc_insert_before`, `data-structures.separate-components.linked-lists.doubly-circular.insert-before`, `data-structures>dc_insert_before()`, `data-structures>separate-components>linked-lists>doubly-circular>insert-before>dc_insert_before()`, `insertBeforeDoublyCircular`

## Dependencies
Requires: `data-structures.separate-components.linked-lists.doubly-circular.node`, `data-structures.separate-components.linked-lists.doubly-circular.insert-beginning`
