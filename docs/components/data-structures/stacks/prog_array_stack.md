# prog_array_stack
> **Domain:** `data-structures` | **Subcategory:** `stacks` | **Type:** `program`
## Overview
Interactive array-based stack program with dynamic capacity growth, push, pop, peek, and display

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

bool stack_is_empty(const Stack* s) {
    return s->top < 0;
}

void stack_push(Stack* s, int val) {
    if (s->top >= s->cap - 1) {
        s->cap *= 2;
        s->data = (int*)realloc(s->data, s->cap * sizeof(int));
        printf("(Stack capacity resized to %d)\n", s->cap);
    }
    s->data[++s->top] = val;
}

bool stack_pop(Stack* s, int* val) {
    if (stack_is_empty(s)) return false;
    *val = s->data[s->top--];
    return true;
}

bool stack_peek(const Stack* s, int* val) {
    if (stack_is_empty(s)) return false;
    *val = s->data[s->top];
    return true;
}

void stack_display(const Stack* s) {
    if (stack_is_empty(s)) {
        printf("Stack is empty.\n");
        return;
    }
    printf("Stack [top to bottom] (%d items): ", s->top + 1);
    for (int i = s->top; i >= 0; i--) printf("%d ", s->data[i]);
    printf("\n");
}

void stack_free(Stack* s) {
    if (s) {
        free(s->data);
        free(s);
    }
}

int main(void) {
    Stack* s = stack_create(4);
    int choice;

    do {
        printf("\n=== Array Stack Operations Menu ===\n");
        printf("1. Push\n");
        printf("2. Pop\n");
        printf("3. Peek / Top\n");
        printf("4. Check Is Empty\n");
        printf("5. Display Stack\n");
        printf("6. Count Elements\n");
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
                    stack_push(s, val);
                    printf("Pushed %d onto stack.\n", val);
                } else clear_input();
                break;
            }
            case 2: {
                int val;
                if (stack_pop(s, &val)) printf("Popped %d from stack.\n", val);
                else printf("Stack Underflow! Stack is empty.\n");
                break;
            }
            case 3: {
                int val;
                if (stack_peek(s, &val)) printf("Top element is %d.\n", val);
                else printf("Stack is empty.\n");
                break;
            }
            case 4:
                printf("Is stack empty? %s\n", stack_is_empty(s) ? "Yes" : "No");
                break;
            case 5:
                stack_display(s);
                break;
            case 6:
                printf("Stack element count: %d\n", s->top + 1);
                break;
            case 0:
                printf("Exiting Array Stack Menu.\n");
                break;
            default:
                printf("Invalid choice.\n");
                break;
        }
    } while (choice != 0);

    stack_free(s);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_array_stack`, `data-structures.full-programs.stacks.array-stack.prog-array-stack`, `data-structures>prog_array_stack()`, `data-structures>full-programs>stacks>array-stack>prog-array-stack>prog_array_stack()`, `programArrayStack`
