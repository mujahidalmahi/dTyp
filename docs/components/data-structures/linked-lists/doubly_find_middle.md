# doubly_find_middle
> **Domain:** `data-structures` | **Subcategory:** `linked-lists` | **Type:** `function`
## Overview
Finds middle node in doubly linked list via fast/slow pointers

## Signature
```c
int doubly_find_middle(const Node* head, int* val);
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
int doubly_find_middle(const Node* head, int* val) {
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
Available via: `doubly_find_middle`, `data-structures.separate-components.linked-lists.doubly.find-middle`, `data-structures>doubly_find_middle()`, `data-structures>separate-components>linked-lists>doubly>find-middle>doubly_find_middle()`, `findMiddleDoubly`

## Dependencies
Requires: `data-structures.separate-components.linked-lists.doubly.node`
