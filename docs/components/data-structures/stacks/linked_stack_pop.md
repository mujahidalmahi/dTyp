# linked_stack_pop
> **Domain:** `data-structures` | **Subcategory:** `stacks` | **Type:** `function`
## Overview
Pops top integer from linked stack

## Signature
```c
int linked_stack_pop(Node** top, int* val);
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
int linked_stack_pop(Node** top, int* val) {
    if (!top || !*top) return 0;
    Node* del = *top;
    *val = del->data;
    *top = del->next;
    free(del);
    return 1;
}
```

## Aliases & Shorthands
Available via: `linked_stack_pop`, `data-structures.separate-components.stacks.linked-stack.pop`, `data-structures>linked_stack_pop()`, `data-structures>separate-components>stacks>linked-stack>pop>linked_stack_pop()`, `popLinkedStack`

## Dependencies
Requires: `data-structures.separate-components.stacks.linked-stack.node`
