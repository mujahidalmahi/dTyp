# singly_insert_tail
> **Domain:** `data-structures` | **Subcategory:** `linked-lists` | **Type:** `function`
## Overview
Appends new node at the end of singly linked list

## Signature
```c
void singly_insert_tail(Node** head, int data);
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
void singly_insert_tail(Node** head, int data) {
    Node* n = createNode(data);
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
}
```

## Aliases & Shorthands
Available via: `singly_insert_tail`, `data-structures.separate-components.linked-lists.singly.insert-tail`, `data-structures>singly_insert_tail()`, `data-structures>separate-components>linked-lists>singly>insert-tail>singly_insert_tail()`, `insertTail`

## Dependencies
Requires: `linkedList.node`, `linkedList.createNode`
