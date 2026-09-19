# dc_search
> **Domain:** `data-structures` | **Subcategory:** `linked-lists` | **Type:** `function`
## Overview
Searches for value in doubly circular linked list

## Signature
```c
Node* dc_search(Node* head, int val);
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
Node* dc_search(Node* head, int val) {
    if (!head) return NULL;
    Node* cur = head;
    do {
        if (cur->data == val) return cur;
        cur = cur->next;
    } while (cur != head);
    return NULL;
}
```

## Aliases & Shorthands
Available via: `dc_search`, `data-structures.separate-components.linked-lists.doubly-circular.search`, `data-structures>dc_search()`, `data-structures>separate-components>linked-lists>doubly-circular>search>dc_search()`, `searchDoublyCircular`

## Dependencies
Requires: `data-structures.separate-components.linked-lists.doubly-circular.node`
