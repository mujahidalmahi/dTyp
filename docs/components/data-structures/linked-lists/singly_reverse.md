# singly_reverse
> **Domain:** `data-structures` | **Subcategory:** `linked-lists` | **Type:** `function`
## Overview
Reverses singly linked list in-place

## Signature
```c
void singly_reverse(Node** head);
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
void singly_reverse(Node** head) {
    Node* prev = NULL;
    Node* cur = *head;
    Node* nxt = NULL;
    while (cur) {
        nxt = cur->next;
        cur->next = prev;
        prev = cur;
        cur = nxt;
    }
    *head = prev;
}
```

## Aliases & Shorthands
Available via: `singly_reverse`, `data-structures.separate-components.linked-lists.singly.reverse`, `data-structures>singly_reverse()`, `data-structures>separate-components>linked-lists>singly>reverse>singly_reverse()`, `reverseSinglyList`

## Dependencies
Requires: `linkedList.node`
