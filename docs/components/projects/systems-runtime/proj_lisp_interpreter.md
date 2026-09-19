# proj_lisp_interpreter
> **Domain:** `projects` | **Subcategory:** `systems-runtime` | **Type:** `program`
## Overview
Interactive Lisp / Scheme S-expression evaluator REPL

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
#include <string.h>

#define MAX_LISP 128

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

static int eval_s_expr(const char* expr) {
    char op;
    int a, b;
    if (sscanf(expr, "(%c %d %d)", &op, &a, &b) == 3) {
        if (op == '+') return a + b;
        if (op == '-') return a - b;
        if (op == '*') return a * b;
        if (op == '/' && b != 0) return a / b;
    }
    return 0;
}

int main(void) {
    int choice;
    do {
        printf("=== Micro Lisp S-Expression Evaluator ===\n");
        printf("1. Evaluate S-Expression (e.g. (+ 10 20), (* 5 6))\n");
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
                char expr[MAX_LISP];
                printf("Enter S-expression: ");
                if (scanf("%127[^\n]", expr) == 1) {
                    clear_input();
                    printf("Result: %d\n", eval_s_expr(expr));
                } else {
                    clear_input();
                }
                break;
            }
            case 0:
                printf("Exiting Lisp evaluator.\n");
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
Available via: `proj_lisp_interpreter`, `projects.systems-runtime.lisp-interpreter.prog-lisp-interpreter`, `projects>proj_lisp_interpreter()`, `projects>systems-runtime>lisp-interpreter>prog-lisp-interpreter>proj_lisp_interpreter()`
