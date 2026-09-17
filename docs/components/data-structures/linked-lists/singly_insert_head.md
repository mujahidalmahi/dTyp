# singly_insert_head
> **Domain:** `data-structures` | **Subcategory:** `linked-lists` | **Type:** `function`
## Overview
Inserts new node at beginning of singly linked list

## Signature
```c
void singly_insert_head(Node** head, int data);
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
void singly_insert_head(Node** head, int data) {
    Node* n = createNode(data);
    if (!n) return;
    n->next = *head;
    *head = n;
}
```

## Aliases & Shorthands
Available via: `singly_insert_head`, `data-structures.separate-components.linked-lists.singly.insert-head`, `data-structures>singly_insert_head()`, `data-structures>separate-components>linked-lists>singly>insert-head>singly_insert_head()`, `insertHead`

## Dependencies
Requires: `linkedList.node`, `linkedList.createNode`
