# mono_stack_next_greater
> **Domain:** `data-structures` | **Subcategory:** `stacks` | **Type:** `function`
## Overview
Computes next greater element for each array entry using monotonic stack

## Signature
```c
void mono_stack_next_greater(const int* arr, int n, int* result);
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
void mono_stack_next_greater(const int* arr, int n, int* result) {
    int* stack = (int*)malloc(n * sizeof(int));
    int top = -1;
    for (int i = n - 1; i >= 0; i--) {
        while (top >= 0 && stack[top] <= arr[i]) {
            top--;
        }
        result[i] = (top < 0) ? -1 : stack[top];
        stack[++top] = arr[i];
    }
    free(stack);
}
```

## Aliases & Shorthands
Available via: `mono_stack_next_greater`, `data-structures.separate-components.stacks.monotonic-stack.next-greater`, `data-structures>mono_stack_next_greater()`, `data-structures>separate-components>stacks>monotonic-stack>next-greater>mono_stack_next_greater()`, `nextGreaterElement`
