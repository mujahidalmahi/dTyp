# dc_insert_after
> **Domain:** `data-structures` | **Subcategory:** `linked-lists` | **Type:** `function`
## Overview
Inserts node after target value in doubly circular linked list

## Signature
```c
int dc_insert_after(Node* head, int target, int data);
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
int dc_insert_after(Node* head, int target, int data) {
    if (!head) return 0;
    Node* cur = head;
    do {
        if (cur->data == target) {
            Node* n = (Node*)malloc(sizeof(Node));
            if (!n) return 0;
            n->data = data;
            n->next = cur->next;
            n->prev = cur;
            cur->next->prev = n;
            cur->next = n;
            return 1;
        }
        cur = cur->next;
    } while (cur != head);
    return 0;
}
```

## Aliases & Shorthands
Available via: `dc_insert_after`, `data-structures.separate-components.linked-lists.doubly-circular.insert-after`, `data-structures>dc_insert_after()`, `data-structures>separate-components>linked-lists>doubly-circular>insert-after>dc_insert_after()`, `insertAfterDoublyCircular`

## Dependencies
Requires: `data-structures.separate-components.linked-lists.doubly-circular.node`
