# ArrayStack
> **Domain:** `data-structures` | **Subcategory:** `stacks` | **Type:** `struct`
## Overview
LIFO stack implementation backed by dynamic contiguous array

## Signature
```c
typedef struct ArrayStack { int* data; int top; int capacity; } ArrayStack;
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
typedef struct ArrayStack {
    int* data;
    int top;
    int capacity;
} ArrayStack;
```

## Aliases & Shorthands
Available via: `ArrayStack`, `data-structures.separate-components.stacks.array-stack.struct`, `data-structures>ArrayStack()`, `data-structures>separate-components>stacks>array-stack>struct>ArrayStack()`, `array_stack_struct`
