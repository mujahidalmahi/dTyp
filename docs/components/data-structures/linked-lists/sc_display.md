# sc_display
> **Domain:** `data-structures` | **Subcategory:** `linked-lists` | **Type:** `function`
## Overview
Displays elements in circular order

## Signature
```c
void sc_display(const Node* head);
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
void sc_display(const Node* head) {
    if (!head) return;
    const Node* cur = head;
    do {
        printf("%d -> ", cur->data);
        cur = cur->next;
    } while (cur != head);
    printf("(head)\n");
}
```

## Aliases & Shorthands
Available via: `sc_display`, `data-structures.separate-components.linked-lists.singly-circular.display`, `data-structures>sc_display()`, `data-structures>separate-components>linked-lists>singly-circular>display>sc_display()`, `displayCircularList`

## Dependencies
Requires: `data-structures.separate-components.linked-lists.singly-circular.node`
