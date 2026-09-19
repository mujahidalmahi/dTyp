# singly_display
> **Domain:** `data-structures` | **Subcategory:** `linked-lists` | **Type:** `function`
## Overview
Prints all elements of singly linked list to stdout

## Signature
```c
void singly_display(const Node* head);
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
void singly_display(const Node* head) {
    const Node* cur = head;
    while (cur) {
        printf("%d -> ", cur->data);
        cur = cur->next;
    }
    printf("NULL\n");
}
```

## Aliases & Shorthands
Available via: `singly_display`, `data-structures.separate-components.linked-lists.singly.display`, `data-structures>singly_display()`, `data-structures>separate-components>linked-lists>singly>display>singly_display()`, `printSinglyList`

## Dependencies
Requires: `linkedList.node`
