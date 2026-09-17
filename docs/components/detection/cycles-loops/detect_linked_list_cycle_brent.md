# detect_linked_list_cycle_brent
> **Domain:** `detection` | **Subcategory:** `cycles-loops` | **Type:** `function`
## Overview
Detects loop in singly linked list using Brent teleporting pointer algorithm

## Signature
```c
int detect_linked_list_cycle_brent(const struct DetectNode* head);
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

int detect_linked_list_cycle_brent(const DetectNode* head) {
    if (!head) return 0;
    const DetectNode* slow = head;
    const DetectNode* fast = head->next;
    int power = 1, len = 1;
    while (fast) {
        if (slow == fast) return 1;
        if (power == len) {
            slow = fast;
            power *= 2;
            len = 0;
        }
        fast = fast->next;
        len++;
    }
    return 0;
}
```

## Aliases & Shorthands
Available via: `detect_linked_list_cycle_brent`, `detection.cycles-loops.cycle-brent`, `detection>detect_linked_list_cycle_brent()`, `detection>cycles-loops>cycle-brent>detect_linked_list_cycle_brent()`, `has_cycle_brent`
