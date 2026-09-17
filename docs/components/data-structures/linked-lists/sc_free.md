# sc_free
> **Domain:** `data-structures` | **Subcategory:** `linked-lists` | **Type:** `function`
## Overview
Frees all nodes in singly circular linked list

## Signature
```c
void sc_free(Node** head);
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
void sc_free(Node** head) {
    if (!head || !*head) return;
    Node* cur = *head;
    Node* nxt = NULL;
    do {
        nxt = cur->next;
        free(cur);
        cur = nxt;
    } while (cur != *head);
    *head = NULL;
}
```

## Aliases & Shorthands
Available via: `sc_free`, `data-structures.separate-components.linked-lists.singly-circular.free`, `data-structures>sc_free()`, `data-structures>separate-components>linked-lists>singly-circular>free>sc_free()`, `freeCircularList`

## Dependencies
Requires: `data-structures.separate-components.linked-lists.singly-circular.node`
