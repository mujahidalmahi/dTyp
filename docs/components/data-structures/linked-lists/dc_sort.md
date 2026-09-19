# dc_sort
> **Domain:** `data-structures` | **Subcategory:** `linked-lists` | **Type:** `function`
## Overview
Sorts doubly circular linked list elements in ascending order

## Signature
```c
void dc_sort(Node* head);
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
void dc_sort(Node* head) {
    if (!head || head->next == head) return;
    int swapped;
    do {
        swapped = 0;
        Node* cur = head;
        while (cur->next != head) {
            if (cur->data > cur->next->data) {
                int tmp = cur->data;
                cur->data = cur->next->data;
                cur->next->data = tmp;
                swapped = 1;
            }
            cur = cur->next;
        }
    } while (swapped);
}
```

## Aliases & Shorthands
Available via: `dc_sort`, `data-structures.separate-components.linked-lists.doubly-circular.sort`, `data-structures>dc_sort()`, `data-structures>separate-components>linked-lists>doubly-circular>sort>dc_sort()`, `sortDoublyCircular`

## Dependencies
Requires: `data-structures.separate-components.linked-lists.doubly-circular.node`
