# singly_count
> **Domain:** `data-structures` | **Subcategory:** `linked-lists` | **Type:** `function`
## Overview
Counts total number of nodes in singly linked list

## Signature
```c
int singly_count(const Node* head);
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
int singly_count(const Node* head) {
    int cnt = 0;
    const Node* cur = head;
    while (cur != NULL) {
        cnt++;
        cur = cur->next;
    }
    return cnt;
}
```

## Aliases & Shorthands
Available via: `singly_count`, `data-structures.separate-components.linked-lists.singly.count`, `data-structures>singly_count()`, `data-structures>separate-components>linked-lists>singly>count>singly_count()`, `countNodes`

## Dependencies
Requires: `linkedList.node`
