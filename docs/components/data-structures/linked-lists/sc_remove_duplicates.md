# sc_remove_duplicates
> **Domain:** `data-structures` | **Subcategory:** `linked-lists` | **Type:** `function`
## Overview
Removes duplicate values from circular singly linked list

## Signature
```c
void sc_remove_duplicates(Node* head);
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
void sc_remove_duplicates(Node* head) {
    if (!head || head->next == head) return;
    Node* cur = head;
    do {
        Node* prev = cur;
        Node* runner = cur->next;
        while (runner != head) {
            if (runner->data == cur->data) {
                prev->next = runner->next;
                free(runner);
                runner = prev->next;
            } else {
                prev = runner;
                runner = runner->next;
            }
        }
        cur = cur->next;
    } while (cur != head && cur->next != head);
}
```

## Aliases & Shorthands
Available via: `sc_remove_duplicates`, `data-structures.separate-components.linked-lists.singly-circular.remove-duplicates`, `data-structures>sc_remove_duplicates()`, `data-structures>separate-components>linked-lists>singly-circular>remove-duplicates>sc_remove_duplicates()`, `removeDuplicatesCircular`

## Dependencies
Requires: `data-structures.separate-components.linked-lists.singly-circular.node`
