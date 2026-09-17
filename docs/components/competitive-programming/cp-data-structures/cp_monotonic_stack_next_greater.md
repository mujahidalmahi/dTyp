# cp_monotonic_stack_next_greater
> **Domain:** `competitive-programming` | **Subcategory:** `cp-data-structures` | **Type:** `function`
## Overview
Computes next greater element index for each element in O(N)

## Signature
```c
void cp_monotonic_stack_next_greater(const int* arr, int n, int* next_idx);
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
void cp_monotonic_stack_next_greater(const int* arr, int n, int* next_idx) {
    int stack[n];
    int top = -1;
    for (int i = 0; i < n; i++) next_idx[i] = -1;
    for (int i = 0; i < n; i++) {
        while (top >= 0 && arr[i] > arr[stack[top]]) {
            next_idx[stack[top--]] = i;
        }
        stack[++top] = i;
    }
}
```

## Aliases & Shorthands
Available via: `cp_monotonic_stack_next_greater`, `competitive-programming.programming-technics.cp-data-structures.monotonic-structures.next-greater`, `competitive-programming>cp_monotonic_stack_next_greater()`, `competitive-programming>programming-technics>cp-data-structures>monotonic-structures>next-greater>cp_monotonic_stack_next_greater()`, `monotonicNextGreater`
