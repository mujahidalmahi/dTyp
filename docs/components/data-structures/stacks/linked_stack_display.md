# linked_stack_display
> **Domain:** `data-structures` | **Subcategory:** `stacks` | **Type:** `function`
## Overview
Displays elements of linked stack from top to bottom

## Signature
```c
void linked_stack_display(const StackNode* top);
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
void linked_stack_display(const StackNode* top) {
    const StackNode* cur = top;
    while (cur) {
        printf("%d -> ", cur->data);
        cur = cur->next;
    }
    printf("NULL\n");
}
```

## Aliases & Shorthands
Available via: `linked_stack_display`, `data-structures.separate-components.stacks.linked-stack.display`, `data-structures>linked_stack_display()`, `data-structures>separate-components>stacks>linked-stack>display>linked_stack_display()`, `displayLinkedStack`

## Dependencies
Requires: `data-structures.separate-components.stacks.linked-stack.node`
