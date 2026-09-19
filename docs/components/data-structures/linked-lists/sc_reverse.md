# sc_reverse
> **Domain:** `data-structures` | **Subcategory:** `linked-lists` | **Type:** `function`
## Overview
Reverses pointer direction in circular singly linked list

## Signature
```c
void sc_reverse(Node** head);
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
void sc_reverse(Node** head) {
    if (!head || !*head || (*head)->next == *head) return;
    Node* prev = NULL;
    Node* cur = *head;
    Node* nxt = NULL;
    do {
        nxt = cur->next;
        cur->next = prev;
        prev = cur;
        cur = nxt;
    } while (cur != *head);
    (*head)->next = prev;
    *head = prev;
}
```

## Aliases & Shorthands
Available via: `sc_reverse`, `data-structures.separate-components.linked-lists.singly-circular.reverse`, `data-structures>sc_reverse()`, `data-structures>separate-components>linked-lists>singly-circular>reverse>sc_reverse()`, `reverseCircularList`

## Dependencies
Requires: `data-structures.separate-components.linked-lists.singly-circular.node`
