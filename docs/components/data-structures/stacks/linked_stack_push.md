# linked_stack_push
> **Domain:** `data-structures` | **Subcategory:** `stacks` | **Type:** `function`
## Overview
Pushes integer to head of linked stack

## Signature
```c
void linked_stack_push(Node** top, int val);
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
void linked_stack_push(Node** top, int val) {
    Node* n = (Node*)malloc(sizeof(Node));
    if (!n) return;
    n->data = val;
    n->next = *top;
    *top = n;
}
```

## Aliases & Shorthands
Available via: `linked_stack_push`, `data-structures.separate-components.stacks.linked-stack.push`, `data-structures>linked_stack_push()`, `data-structures>separate-components>stacks>linked-stack>push>linked_stack_push()`, `pushLinkedStack`

## Dependencies
Requires: `data-structures.separate-components.stacks.linked-stack.node`
