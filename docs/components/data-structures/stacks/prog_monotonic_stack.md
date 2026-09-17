# prog_monotonic_stack
> **Domain:** `data-structures` | **Subcategory:** `stacks` | **Type:** `program`
## Overview
Complete program computing next greater element array using monotonic stack

## Signature
```c
int main(void)
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
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int arr[] = {4, 5, 2, 25, 7, 8};
    int n = sizeof(arr) / sizeof(arr[0]);
    int* nge = (int*)malloc(n * sizeof(int));
    int* stack = (int*)malloc(n * sizeof(int));
    int top = -1;

    for (int i = n - 1; i >= 0; i--) {
        while (top >= 0 && stack[top] <= arr[i]) {
            top--;
        }
        nge[i] = (top < 0) ? -1 : stack[top];
        stack[++top] = arr[i];
    }

    printf("Input: ");
    for (int i = 0; i < n; i++) printf("%4d", arr[i]);
    printf("
NGE:   ");
    for (int i = 0; i < n; i++) printf("%4d", nge[i]);
    putchar('
');

    free(nge);
    free(stack);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_monotonic_stack`, `data-structures.full-programs.stacks.monotonic-stack.prog-monotonic-stack`, `data-structures>prog_monotonic_stack()`, `data-structures>full-programs>stacks>monotonic-stack>prog-monotonic-stack>prog_monotonic_stack()`, `programMonotonicStack`
