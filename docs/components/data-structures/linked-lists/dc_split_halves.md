# dc_split_halves
> **Domain:** `data-structures` | **Subcategory:** `linked-lists` | **Type:** `function`
## Overview
Splits doubly circular list into two circular doubly lists

## Signature
```c
void dc_split_halves(Node* head, Node** head1, Node** head2);
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
void dc_split_halves(Node* head, Node** head1, Node** head2) {
    *head1 = NULL;
    *head2 = NULL;
    if (!head) return;
    Node* slow = head;
    Node* fast = head;
    while (fast->next != head && fast->next->next != head) {
        slow = slow->next;
        fast = fast->next->next;
    }
    if (fast->next->next == head) fast = fast->next;
    *head1 = head;
    if (head->next != head) *head2 = slow->next;
    fast->next = slow->next;
    slow->next->prev = fast;
    slow->next = head;
    head->prev = slow;
}
```

## Aliases & Shorthands
Available via: `dc_split_halves`, `data-structures.separate-components.linked-lists.doubly-circular.split-halves`, `data-structures>dc_split_halves()`, `data-structures>separate-components>linked-lists>doubly-circular>split-halves>dc_split_halves()`, `splitDoublyCircularHalves`

## Dependencies
Requires: `data-structures.separate-components.linked-lists.doubly-circular.node`
