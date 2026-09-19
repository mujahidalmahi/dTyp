# doubly_search
> **Domain:** `data-structures` | **Subcategory:** `linked-lists` | **Type:** `function`
## Overview
Searches for value in doubly linked list and returns node pointer

## Signature
```c
Node* doubly_search(Node* head, int val);
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
Node* doubly_search(Node* head, int val) {
    Node* cur = head;
    while (cur) {
        if (cur->data == val) return cur;
        cur = cur->next;
    }
    return NULL;
}
```

## Aliases & Shorthands
Available via: `doubly_search`, `data-structures.separate-components.linked-lists.doubly.search`, `data-structures>doubly_search()`, `data-structures>separate-components>linked-lists>doubly>search>doubly_search()`, `searchDoublyList`

## Dependencies
Requires: `data-structures.separate-components.linked-lists.doubly.node`
