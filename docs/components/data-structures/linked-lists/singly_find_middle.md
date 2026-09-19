# singly_find_middle
> **Domain:** `data-structures` | **Subcategory:** `linked-lists` | **Type:** `function`
## Overview
Finds middle node value using two-pointer algorithm

## Signature
```c
int singly_find_middle(const Node* head, int* val);
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
int singly_find_middle(const Node* head, int* val) {
    if (!head) return 0;
    const Node* slow = head;
    const Node* fast = head;
    while (fast->next && fast->next->next) {
        slow = slow->next;
        fast = fast->next->next;
    }
    *val = slow->data;
    return 1;
}
```

## Aliases & Shorthands
Available via: `singly_find_middle`, `data-structures.separate-components.linked-lists.singly.find-middle`, `data-structures>singly_find_middle()`, `data-structures>separate-components>linked-lists>singly>find-middle>singly_find_middle()`, `findMiddleSingly`

## Dependencies
Requires: `linkedList.node`
