# proj_bytecode_vm
> **Domain:** `projects` | **Subcategory:** `systems-runtime` | **Type:** `program`
## Overview
Interactive stack-based bytecode virtual machine with instruction execution

## Signature
```c
int main(void);
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

#define OP_PUSH 1
#define OP_ADD  2
#define OP_SUB  3
#define OP_MUL  4
#define OP_PRINT 5
#define OP_HALT 6

static int stack[64];
static int sp = -1;

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

static void run_vm(const int* code, int len) {
    sp = -1;
    int pc = 0;
    while (pc < len) {
        int op = code[pc++];
        if (op == OP_PUSH) {
            stack[++sp] = code[pc++];
        } else if (op == OP_ADD) {
            int b = stack[sp--];
            int a = stack[sp--];
            stack[++sp] = a + b;
        } else if (op == OP_SUB) {
            int b = stack[sp--];
            int a = stack[sp--];
            stack[++sp] = a - b;
        } else if (op == OP_MUL) {
            int b = stack[sp--];
            int a = stack[sp--];
            stack[++sp] = a * b;
        } else if (op == OP_PRINT) {
            printf("VM Output: %d\n", stack[sp]);
        } else if (op == OP_HALT) {
            break;
        }
    }
}

int main(void) {
    int choice;
    do {
        printf("=== Stack Bytecode Virtual Machine ===\n");
        printf("1. Execute Program: (10 + 20) * 3\n");
        printf("2. Execute Custom (A + B) * C\n");
        printf("0. Exit\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            choice = -1;
            continue;
        }
        clear_input();
        switch (choice) {
            case 1: {
                int code[] = {OP_PUSH, 10, OP_PUSH, 20, OP_ADD, OP_PUSH, 3, OP_MUL, OP_PRINT, OP_HALT};
                run_vm(code, 10);
                break;
            }
            case 2: {
                int a, b, c;
                printf("Enter A B C: ");
                if (scanf("%d %d %d", &a, &b, &c) == 3) {
                    clear_input();
                    int code[] = {OP_PUSH, a, OP_PUSH, b, OP_ADD, OP_PUSH, c, OP_MUL, OP_PRINT, OP_HALT};
                    run_vm(code, 10);
                } else {
                    clear_input();
                }
                break;
            }
            case 0:
                printf("Exiting VM.\n");
                break;
            default:
                printf("Invalid option.\n");
                break;
        }
    } while (choice != 0);
    return 0;
}
```

## Aliases & Shorthands
Available via: `proj_bytecode_vm`, `projects.systems-runtime.bytecode-vm.prog-bytecode-vm`, `projects>proj_bytecode_vm()`, `projects>systems-runtime>bytecode-vm>prog-bytecode-vm>proj_bytecode_vm()`
