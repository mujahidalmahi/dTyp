# singly_insert_after
> **Domain:** `data-structures` | **Subcategory:** `linked-lists` | **Type:** `function`
## Overview
Inserts a new node immediately after a given target node

## Signature
```c
void singly_insert_after(Node* target, int data);
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
void singly_insert_after(Node* target, int data) {
    if (!target) return;
    Node* n = createNode(data);
    if (!n) return;
    n->next = target->next;
    target->next = n;
}
```

## Aliases & Shorthands
Available via: `singly_insert_after`, `data-structures.separate-components.linked-lists.singly.insert-after`, `data-structures>singly_insert_after()`, `data-structures>separate-components>linked-lists>singly>insert-after>singly_insert_after()`, `insertAfter`

## Dependencies
Requires: `linkedList.node`, `linkedList.createNode`
