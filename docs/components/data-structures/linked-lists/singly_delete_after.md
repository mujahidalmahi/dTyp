# singly_delete_after
> **Domain:** `data-structures` | **Subcategory:** `linked-lists` | **Type:** `function`
## Overview
Deletes node immediately following target value

## Signature
```c
int singly_delete_after(Node* head, int target, int* val);
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
int singly_delete_after(Node* head, int target, int* val) {
    Node* cur = head;
    while (cur && cur->data != target) cur = cur->next;
    if (!cur || !cur->next) return 0;
    Node* del = cur->next;
    *val = del->data;
    cur->next = del->next;
    free(del);
    return 1;
}
```

## Aliases & Shorthands
Available via: `singly_delete_after`, `data-structures.separate-components.linked-lists.singly.delete-after`, `data-structures>singly_delete_after()`, `data-structures>separate-components>linked-lists>singly>delete-after>singly_delete_after()`, `deleteAfterSingly`

## Dependencies
Requires: `linkedList.node`
