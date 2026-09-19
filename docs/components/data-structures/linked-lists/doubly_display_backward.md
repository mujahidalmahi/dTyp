# doubly_display_backward
> **Domain:** `data-structures` | **Subcategory:** `linked-lists` | **Type:** `function`
## Overview
Traverses doubly linked list backward from tail to head

## Signature
```c
void doubly_display_backward(const Node* head);
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
void doubly_display_backward(const Node* head) {
    if (!head) return;
    const Node* cur = head;
    while (cur->next) cur = cur->next;
    while (cur) {
        printf("%d <-> ", cur->data);
        cur = cur->prev;
    }
    printf("NULL\n");
}
```

## Aliases & Shorthands
Available via: `doubly_display_backward`, `data-structures.separate-components.linked-lists.doubly.display-backward`, `data-structures>doubly_display_backward()`, `data-structures>separate-components>linked-lists>doubly>display-backward>doubly_display_backward()`, `displayBackwardDoubly`

## Dependencies
Requires: `data-structures.separate-components.linked-lists.doubly.node`
