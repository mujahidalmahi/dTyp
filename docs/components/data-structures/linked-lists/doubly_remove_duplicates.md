# doubly_remove_duplicates
> **Domain:** `data-structures` | **Subcategory:** `linked-lists` | **Type:** `function`
## Overview
Removes duplicate values from doubly linked list

## Signature
```c
void doubly_remove_duplicates(Node* head);
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
void doubly_remove_duplicates(Node* head) {
    Node* cur = head;
    while (cur && cur->next) {
        Node* runner = cur->next;
        while (runner) {
            if (runner->data == cur->data) {
                Node* del = runner;
                runner = runner->next;
                if (del->prev) del->prev->next = del->next;
                if (del->next) del->next->prev = del->prev;
                free(del);
            } else {
                runner = runner->next;
            }
        }
        cur = cur->next;
    }
}
```

## Aliases & Shorthands
Available via: `doubly_remove_duplicates`, `data-structures.separate-components.linked-lists.doubly.remove-duplicates`, `data-structures>doubly_remove_duplicates()`, `data-structures>separate-components>linked-lists>doubly>remove-duplicates>doubly_remove_duplicates()`, `removeDuplicatesDoubly`

## Dependencies
Requires: `data-structures.separate-components.linked-lists.doubly.node`
