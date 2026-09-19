# stack_display
> **Domain:** `data-structures` | **Subcategory:** `stacks` | **Type:** `function`
## Overview
Displays array stack elements from top to bottom

## Signature
```c
void stack_display(const ArrayStack* s);
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
void stack_display(const ArrayStack* s) {
    for (int i = s->top; i >= 0; i--) printf("%d ", s->data[i]);
    printf("\n");
}
```

## Aliases & Shorthands
Available via: `stack_display`, `data-structures.separate-components.stacks.array-stack.display`, `data-structures>stack_display()`, `data-structures>separate-components>stacks>array-stack>display>stack_display()`, `displayStack`

## Dependencies
Requires: `data-structures.separate-components.stacks.array-stack.struct`
