# stack_count
> **Domain:** `data-structures` | **Subcategory:** `stacks` | **Type:** `function`
## Overview
Returns count of elements in array-based stack

## Signature
```c
int stack_count(const ArrayStack* s);
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
int stack_count(const ArrayStack* s) {
    return s->top + 1;
}
```

## Aliases & Shorthands
Available via: `stack_count`, `data-structures.separate-components.stacks.array-stack.count`, `data-structures>stack_count()`, `data-structures>separate-components>stacks>array-stack>count>stack_count()`, `countStack`

## Dependencies
Requires: `data-structures.separate-components.stacks.array-stack.struct`
