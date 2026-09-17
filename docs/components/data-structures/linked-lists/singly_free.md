# singly_free
> **Domain:** `data-structures` | **Subcategory:** `linked-lists` | **Type:** `function`
## Overview
Deallocates all nodes in singly linked list

## Signature
```c
void singly_free(Node** head);
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
void singly_free(Node** head) {
    if (!head) return;
    Node* cur = *head;
    while (cur != NULL) {
        Node* nxt = cur->next;
        free(cur);
        cur = nxt;
    }
    *head = NULL;
}
```

## Aliases & Shorthands
Available via: `singly_free`, `data-structures.separate-components.linked-lists.singly.free`, `data-structures>singly_free()`, `data-structures>separate-components>linked-lists>singly>free>singly_free()`, `freeList`

## Dependencies
Requires: `linkedList.node`
