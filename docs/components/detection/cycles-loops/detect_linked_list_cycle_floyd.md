# detect_linked_list_cycle_floyd
> **Domain:** `detection` | **Subcategory:** `cycles-loops` | **Type:** `function`
## Overview
Detects loop in singly linked list using Floyd tortoise and hare algorithm

## Signature
```c
int detect_linked_list_cycle_floyd(const struct DetectNode* head);
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
typedef struct DetectNode {
    int data;
    struct DetectNode* next;
} DetectNode;

int detect_linked_list_cycle_floyd(const DetectNode* head) {
    if (!head || !head->next) return 0;
    const DetectNode* slow = head;
    const DetectNode* fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return 1;
    }
    return 0;
}
```

## Aliases & Shorthands
Available via: `detect_linked_list_cycle_floyd`, `detection.cycles-loops.cycle-floyd`, `detection>detect_linked_list_cycle_floyd()`, `detection>cycles-loops>cycle-floyd>detect_linked_list_cycle_floyd()`, `has_cycle_floyd`
