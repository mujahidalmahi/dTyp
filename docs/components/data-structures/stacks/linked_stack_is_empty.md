# linked_stack_is_empty
> **Domain:** `data-structures` | **Subcategory:** `stacks` | **Type:** `function`
## Overview
Checks if linked stack is empty

## Signature
```c
bool linked_stack_is_empty(const StackNode* top);
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
bool linked_stack_is_empty(const StackNode* top) {
    return top == NULL;
}
```

## Aliases & Shorthands
Available via: `linked_stack_is_empty`, `data-structures.separate-components.stacks.linked-stack.is-empty`, `data-structures>linked_stack_is_empty()`, `data-structures>separate-components>stacks>linked-stack>is-empty>linked_stack_is_empty()`, `isLinkedStackEmpty`

## Dependencies
Requires: `data-structures.separate-components.stacks.linked-stack.node`
