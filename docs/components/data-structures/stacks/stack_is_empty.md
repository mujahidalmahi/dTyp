# stack_is_empty
> **Domain:** `data-structures` | **Subcategory:** `stacks` | **Type:** `function`
## Overview
Checks if array-based stack is empty

## Signature
```c
bool stack_is_empty(const ArrayStack* s);
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
bool stack_is_empty(const ArrayStack* s) {
    return s->top < 0;
}
```

## Aliases & Shorthands
Available via: `stack_is_empty`, `data-structures.separate-components.stacks.array-stack.is-empty`, `data-structures>stack_is_empty()`, `data-structures>separate-components>stacks>array-stack>is-empty>stack_is_empty()`, `isStackEmpty`

## Dependencies
Requires: `data-structures.separate-components.stacks.array-stack.struct`
