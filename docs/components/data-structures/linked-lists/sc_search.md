# sc_search
> **Domain:** `data-structures` | **Subcategory:** `linked-lists` | **Type:** `function`
## Overview
Searches for value in singly circular linked list

## Signature
```c
Node* sc_search(Node* head, int val);
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
Node* sc_search(Node* head, int val) {
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
Available via: `sc_search`, `data-structures.separate-components.linked-lists.singly-circular.search`, `data-structures>sc_search()`, `data-structures>separate-components>linked-lists>singly-circular>search>sc_search()`, `searchCircularList`

## Dependencies
Requires: `data-structures.separate-components.linked-lists.singly-circular.node`
