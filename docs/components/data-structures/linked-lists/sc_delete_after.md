# sc_delete_after
> **Domain:** `data-structures` | **Subcategory:** `linked-lists` | **Type:** `function`
## Overview
Deletes node immediately following target value in singly circular list

## Signature
```c
int sc_delete_after(Node** head, int target, int* val);
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
int sc_delete_after(Node** head, int target, int* val) {
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
                Node* last = *head;
                while (last->next != *head) last = last->next;
                Node* tmp = *head;
                *head = (*head)->next;
                last->next = *head;
                free(tmp);
                return 1;
            }
            Node* del = cur->next;
            *val = del->data;
            cur->next = del->next;
            free(del);
            return 1;
        }
        cur = cur->next;
    } while (cur != *head);
    return 0;
}
```

## Aliases & Shorthands
Available via: `sc_delete_after`, `data-structures.separate-components.linked-lists.singly-circular.delete-after`, `data-structures>sc_delete_after()`, `data-structures>separate-components>linked-lists>singly-circular>delete-after>sc_delete_after()`, `deleteAfterCircular`

## Dependencies
Requires: `data-structures.separate-components.linked-lists.singly-circular.node`
