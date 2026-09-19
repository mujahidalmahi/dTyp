# doubly_count
> **Domain:** `data-structures` | **Subcategory:** `linked-lists` | **Type:** `function`
## Overview
Counts total number of nodes in doubly linked list

## Signature
```c
int doubly_count(const Node* head);
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
int doubly_count(const Node* head) {
    int cnt = 0;
    const Node* cur = head;
    while (cur) {
        cnt++;
        cur = cur->next;
    }
    return cnt;
}
```

## Aliases & Shorthands
Available via: `doubly_count`, `data-structures.separate-components.linked-lists.doubly.count`, `data-structures>doubly_count()`, `data-structures>separate-components>linked-lists>doubly>count>doubly_count()`, `countNodesDoubly`

## Dependencies
Requires: `data-structures.separate-components.linked-lists.doubly.node`
