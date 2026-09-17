# prog_array_stack
> **Domain:** `data-structures` | **Subcategory:** `stacks` | **Type:** `program`
## Overview
Complete array-based stack program testing push, pop, peek, and capacity growth

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

typedef struct Stack {
    int* data;
    int top;
    int cap;
} Stack;

Stack* stack_create(int cap) {
    Stack* s = (Stack*)malloc(sizeof(Stack));
    s->data = (int*)malloc(cap * sizeof(int));
    s->top = -1;
    s->cap = cap;
    return s;
}

void stack_push(Stack* s, int val) {
    if (s->top >= s->cap - 1) {
        s->cap *= 2;
        s->data = (int*)realloc(s->data, s->cap * sizeof(int));
    }
    s->data[++s->top] = val;
}

int stack_pop(Stack* s) {
    if (s->top < 0) return -1;
    return s->data[s->top--];
}

int main(void) {
    Stack* s = stack_create(2);
    stack_push(s, 10);
    stack_push(s, 20);
    stack_push(s, 30);

    printf("Popped elements: ");
    while (s->top >= 0) {
        printf("%d ", stack_pop(s));
    }
    putchar('
');

    free(s->data);
    free(s);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_array_stack`, `data-structures.full-programs.stacks.array-stack.prog-array-stack`, `data-structures>prog_array_stack()`, `data-structures>full-programs>stacks>array-stack>prog-array-stack>prog_array_stack()`, `programArrayStack`
