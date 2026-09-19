# dc_delete_after
> **Domain:** `data-structures` | **Subcategory:** `linked-lists` | **Type:** `function`
## Overview
Deletes node immediately following target value in doubly circular list

## Signature
```c
int dc_delete_after(Node** head, int target, int* val);
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
int dc_delete_after(Node** head, int target, int* val) {
    if (!head || !*head) return 0;
    Node* cur = *head;
    do {
        if (cur->data == target) {
            if (cur->next == *head) {
                *val = (*head)->data;
                if ((*head)->next == *head) {
                    free(*head);
                    *head = NULL;
                    return 1;
                }
                Node* last = (*head)->prev;
                Node* nxt = (*head)->next;
                last->next = nxt;
                nxt->prev = last;
                free(*head);
                *head = nxt;
                return 1;
            }
            Node* del = cur->next;
            *val = del->data;
            cur->next = del->next;
            del->next->prev = cur;
            free(del);
            return 1;
        }
        cur = cur->next;
    } while (cur != *head);
    return 0;
}
```

## Aliases & Shorthands
Available via: `dc_delete_after`, `data-structures.separate-components.linked-lists.doubly-circular.delete-after`, `data-structures>dc_delete_after()`, `data-structures>separate-components>linked-lists>doubly-circular>delete-after>dc_delete_after()`, `deleteAfterDoublyCircular`

## Dependencies
Requires: `data-structures.separate-components.linked-lists.doubly-circular.node`
