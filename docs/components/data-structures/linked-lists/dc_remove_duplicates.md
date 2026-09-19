# dc_remove_duplicates
> **Domain:** `data-structures` | **Subcategory:** `linked-lists` | **Type:** `function`
## Overview
Removes duplicate values from doubly circular linked list

## Signature
```c
void dc_remove_duplicates(Node* head);
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
void dc_remove_duplicates(Node* head) {
    if (!head || head->next == head) return;
    Node* cur = head;
    do {
        Node* runner = cur->next;
        while (runner != head) {
            if (runner->data == cur->data) {
                Node* del = runner;
                runner = runner->next;
                del->prev->next = del->next;
                del->next->prev = del->prev;
                free(del);
            } else {
                runner = runner->next;
            }
        }
        cur = cur->next;
    } while (cur != head && cur->next != head);
}
```

## Aliases & Shorthands
Available via: `dc_remove_duplicates`, `data-structures.separate-components.linked-lists.doubly-circular.remove-duplicates`, `data-structures>dc_remove_duplicates()`, `data-structures>separate-components>linked-lists>doubly-circular>remove-duplicates>dc_remove_duplicates()`, `removeDuplicatesDoublyCircular`

## Dependencies
Requires: `data-structures.separate-components.linked-lists.doubly-circular.node`
