# singly_search
> **Domain:** `data-structures` | **Subcategory:** `linked-lists` | **Type:** `function`
## Overview
Searches for value in singly linked list

## Signature
```c
Node* singly_search(Node* head, int val);
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
Node* singly_search(Node* head, int val) {
    Node* cur = head;
    while (cur != NULL) {
        if (cur->data == val) return cur;
        cur = cur->next;
    }
    return NULL;
}
```

## Aliases & Shorthands
Available via: `singly_search`, `data-structures.separate-components.linked-lists.singly.search`, `data-structures>singly_search()`, `data-structures>separate-components>linked-lists>singly>search>singly_search()`, `searchList`

## Dependencies
Requires: `linkedList.node`
