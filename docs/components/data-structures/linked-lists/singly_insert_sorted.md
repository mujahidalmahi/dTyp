# singly_insert_sorted
> **Domain:** `data-structures` | **Subcategory:** `linked-lists` | **Type:** `function`
## Overview
Inserts value into ascending sorted singly linked list

## Signature
```c
void singly_insert_sorted(Node** head, int data);
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
void singly_insert_sorted(Node** head, int data) {
    Node* n = createNode(data);
    if (!n) return;
    if (!*head || (*head)->data >= data) {
        n->next = *head;
        *head = n;
        return;
    }
    Node* cur = *head;
    while (cur->next && cur->next->data < data) cur = cur->next;
    n->next = cur->next;
    cur->next = n;
}
```

## Aliases & Shorthands
Available via: `singly_insert_sorted`, `data-structures.separate-components.linked-lists.singly.insert-sorted`, `data-structures>singly_insert_sorted()`, `data-structures>separate-components>linked-lists>singly>insert-sorted>singly_insert_sorted()`, `insertSortedSingly`

## Dependencies
Requires: `linkedList.node`, `linkedList.createNode`
