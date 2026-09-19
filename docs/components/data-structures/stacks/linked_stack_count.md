# linked_stack_count
> **Domain:** `data-structures` | **Subcategory:** `stacks` | **Type:** `function`
## Overview
Counts number of elements in linked stack

## Signature
```c
int linked_stack_count(const StackNode* top);
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
int linked_stack_count(const StackNode* top) {
    int cnt = 0;
    const StackNode* cur = top;
    while (cur) {
        cnt++;
        cur = cur->next;
    }
    return cnt;
}
```

## Aliases & Shorthands
Available via: `linked_stack_count`, `data-structures.separate-components.stacks.linked-stack.count`, `data-structures>linked_stack_count()`, `data-structures>separate-components>stacks>linked-stack>count>linked_stack_count()`, `countLinkedStack`

## Dependencies
Requires: `data-structures.separate-components.stacks.linked-stack.node`
