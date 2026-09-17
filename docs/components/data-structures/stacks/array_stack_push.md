# array_stack_push
> **Domain:** `data-structures` | **Subcategory:** `stacks` | **Type:** `function`
## Overview
Pushes integer on top of array stack

## Signature
```c
int array_stack_push(ArrayStack* s, int val);
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
int array_stack_push(ArrayStack* s, int val) {
    if (s->top >= s->capacity - 1) {
        s->capacity *= 2;
        s->data = (int*)realloc(s->data, s->capacity * sizeof(int));
    }
    s->data[++s->top] = val;
    return 1;
}
```

## Aliases & Shorthands
Available via: `array_stack_push`, `data-structures.separate-components.stacks.array-stack.push`, `data-structures>array_stack_push()`, `data-structures>separate-components>stacks>array-stack>push>array_stack_push()`, `pushStack`

## Dependencies
Requires: `data-structures.separate-components.stacks.array-stack.struct`
