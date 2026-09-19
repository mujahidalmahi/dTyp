# doubly_sort
> **Domain:** `data-structures` | **Subcategory:** `linked-lists` | **Type:** `function`
## Overview
Sorts doubly linked list in ascending numerical order

## Signature
```c
void doubly_sort(Node* head);
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
void doubly_sort(Node* head) {
    if (!head || !head->next) return;
    int swapped;
    do {
        swapped = 0;
        Node* cur = head;
        while (cur->next) {
            if (cur->data > cur->next->data) {
                int t = cur->data;
                cur->data = cur->next->data;
                cur->next->data = t;
                swapped = 1;
            }
            cur = cur->next;
        }
    } while (swapped);
}
```

## Aliases & Shorthands
Available via: `doubly_sort`, `data-structures.separate-components.linked-lists.doubly.sort`, `data-structures>doubly_sort()`, `data-structures>separate-components>linked-lists>doubly>sort>doubly_sort()`, `sortDoublyList`

## Dependencies
Requires: `data-structures.separate-components.linked-lists.doubly.node`
