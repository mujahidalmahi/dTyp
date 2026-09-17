# singly_insert_before
> **Domain:** `data-structures` | **Subcategory:** `linked-lists` | **Type:** `function`
## Overview
Inserts a new node immediately before a target value

## Signature
```c
void singly_insert_before(Node** head, int target_val, int data);
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
void singly_insert_before(Node** head, int target_val, int data) {
    if (!head || !*head) return;
    if ((*head)->data == target_val) {
        singly_insert_head(head, data);
        return;
    }
    Node* cur = *head;
    while (cur->next && cur->next->data != target_val) {
        cur = cur->next;
    }
    if (cur->next) {
        Node* n = createNode(data);
        if (!n) return;
        n->next = cur->next;
        cur->next = n;
    }
}
```

## Aliases & Shorthands
Available via: `singly_insert_before`, `data-structures.separate-components.linked-lists.singly.insert-before`, `data-structures>singly_insert_before()`, `data-structures>separate-components>linked-lists>singly>insert-before>singly_insert_before()`, `insertBefore`

## Dependencies
Requires: `linkedList.node`, `linkedList.createNode`, `data-structures.separate-components.linked-lists.singly.insert-head`
