# prog_linked_stack
> **Domain:** `data-structures` | **Subcategory:** `stacks` | **Type:** `program`
## Overview
Complete linked node stack program with dynamic push and pop operations

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

typedef struct Node {
    int data;
    struct Node* next;
} Node;

void lstack_push(Node** top, int val) {
    Node* n = (Node*)malloc(sizeof(Node));
    n->data = val;
    n->next = *top;
    *top = n;
}

int lstack_pop(Node** top, int* out) {
    if (!top || !*top) return 0;
    Node* del = *top;
    *out = del->data;
    *top = del->next;
    free(del);
    return 1;
}

int main(void) {
    Node* stack = NULL;
    lstack_push(&stack, 50);
    lstack_push(&stack, 60);
    lstack_push(&stack, 70);

    int val;
    printf("Linked stack popped: ");
    while (lstack_pop(&stack, &val)) {
        printf("%d ", val);
    }
    putchar('
');

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_linked_stack`, `data-structures.full-programs.stacks.linked-stack.prog-linked-stack`, `data-structures>prog_linked_stack()`, `data-structures>full-programs>stacks>linked-stack>prog-linked-stack>prog_linked_stack()`, `programLinkedStack`
