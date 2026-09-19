# singly_detect_cycle
> **Domain:** `data-structures` | **Subcategory:** `linked-lists` | **Type:** `function`
## Overview
Detects cycle in singly linked list using Floyd algorithm

## Signature
```c
int singly_detect_cycle(const Node* head);
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
int singly_detect_cycle(const Node* head) {
    if (!head || !head->next) return 0;
    const Node* slow = head;
    const Node* fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return 1;
    }
    return 0;
}
```

## Aliases & Shorthands
Available via: `singly_detect_cycle`, `data-structures.separate-components.linked-lists.singly.detect-cycle`, `data-structures>singly_detect_cycle()`, `data-structures>separate-components>linked-lists>singly>detect-cycle>singly_detect_cycle()`, `detectCycleSingly`

## Dependencies
Requires: `linkedList.node`
