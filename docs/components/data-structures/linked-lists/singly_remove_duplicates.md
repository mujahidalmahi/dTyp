# singly_remove_duplicates
> **Domain:** `data-structures` | **Subcategory:** `linked-lists` | **Type:** `function`
## Overview
Removes all duplicate values from singly linked list

## Signature
```c
void singly_remove_duplicates(Node* head);
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
void singly_remove_duplicates(Node* head) {
    Node* cur = head;
    while (cur && cur->next) {
        Node* runner = cur;
        while (runner->next) {
            if (runner->next->data == cur->data) {
                Node* del = runner->next;
                runner->next = del->next;
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
Available via: `singly_remove_duplicates`, `data-structures.separate-components.linked-lists.singly.remove-duplicates`, `data-structures>singly_remove_duplicates()`, `data-structures>separate-components>linked-lists>singly>remove-duplicates>singly_remove_duplicates()`, `removeDuplicatesSingly`

## Dependencies
Requires: `linkedList.node`
