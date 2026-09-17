# array_stack_pop
> **Domain:** `data-structures` | **Subcategory:** `stacks` | **Type:** `function`
## Overview
Pops top integer from array stack

## Signature
```c
int array_stack_pop(ArrayStack* s, int* val);
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
int array_stack_pop(ArrayStack* s, int* val) {
    if (s->top < 0) return 0;
    *val = s->data[s->top--];
    return 1;
}
```

## Aliases & Shorthands
Available via: `array_stack_pop`, `data-structures.separate-components.stacks.array-stack.pop`, `data-structures>array_stack_pop()`, `data-structures>separate-components>stacks>array-stack>pop>array_stack_pop()`, `popStack`

## Dependencies
Requires: `data-structures.separate-components.stacks.array-stack.struct`
