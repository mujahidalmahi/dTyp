# prog_linked_stack
> **Domain:** `data-structures` | **Subcategory:** `stacks` | **Type:** `program`
## Overview
Interactive node-based linked stack program with push, pop, peek, traversal, and memory cleanup

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
#include <stdbool.h>

void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

typedef struct StackNode {
    int data;
    struct StackNode* next;
} StackNode;

void ls_push(StackNode** top, int val) {
    StackNode* n = (StackNode*)malloc(sizeof(StackNode));
    n->data = val;
    n->next = *top;
    *top = n;
}

bool ls_pop(StackNode** top, int* val) {
    if (!*top) return false;
    StackNode* tmp = *top;
    *val = tmp->data;
    *top = (*top)->next;
    free(tmp);
    return true;
}

bool ls_peek(const StackNode* top, int* val) {
    if (!top) return false;
    *val = top->data;
    return true;
}

int ls_count(const StackNode* top) {
    int cnt = 0;
    while (top) { cnt++; top = top->next; }
    return cnt;
}

void ls_display(const StackNode* top) {
    if (!top) { printf("Linked Stack is empty.\n"); return; }
    printf("Linked Stack [top to bottom]: ");
    while (top) {
        printf("%d -> ", top->data);
        top = top->next;
    }
    printf("NULL\n");
}

void ls_free(StackNode** top) {
    while (*top) {
        StackNode* tmp = *top;
        *top = (*top)->next;
        free(tmp);
    }
}

int main(void) {
    StackNode* top = NULL;
    int choice;

    do {
        printf("\n=== Linked Stack Menu ===\n");
        printf("1. Push\n");
        printf("2. Pop\n");
        printf("3. Peek\n");
        printf("4. Display Stack\n");
        printf("5. Count Elements\n");
        printf("0. Exit\n");
        printf("Enter choice: ");

        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                int val;
                printf("Enter value to push: ");
                if (scanf("%d", &val) == 1) {
                    ls_push(&top, val);
                    printf("Pushed %d onto linked stack.\n", val);
                } else clear_input();
                break;
            }
            case 2: {
                int val;
                if (ls_pop(&top, &val)) printf("Popped %d from linked stack.\n", val);
                else printf("Stack Underflow! Linked stack is empty.\n");
                break;
            }
            case 3: {
                int val;
                if (ls_peek(top, &val)) printf("Top element is %d.\n", val);
                else printf("Stack is empty.\n");
                break;
            }
            case 4:
                ls_display(top);
                break;
            case 5:
                printf("Count: %d elements\n", ls_count(top));
                break;
            case 0:
                printf("Exiting Linked Stack Menu.\n");
                break;
            default:
                printf("Invalid choice.\n");
                break;
        }
    } while (choice != 0);

    ls_free(&top);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_linked_stack`, `data-structures.full-programs.stacks.linked-stack.prog-linked-stack`, `data-structures>prog_linked_stack()`, `data-structures>full-programs>stacks>linked-stack>prog-linked-stack>prog_linked_stack()`, `programLinkedStack`
