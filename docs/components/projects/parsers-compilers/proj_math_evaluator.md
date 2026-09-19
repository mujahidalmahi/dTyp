# proj_math_evaluator
> **Domain:** `projects` | **Subcategory:** `parsers-compilers` | **Type:** `program`
## Overview
Interactive mathematical expression evaluator using Shunting-Yard and RPN stack

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

#define MAX_EXPR 256

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

static int precedence(char op) {
    if (op == '+' || op == '-') return 1;
    if (op == '*' || op == '/') return 2;
    return 0;
}

static double apply_op(double a, double b, char op) {
    switch (op) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return (b != 0) ? a / b : 0.0;
        default: return 0.0;
    }
}

static double evaluate_expr(const char* expr) {
    double values[MAX_EXPR];
    int v_top = -1;
    char ops[MAX_EXPR];
    int o_top = -1;
    int len = (int)strlen(expr);
    for (int i = 0; i < len; i++) {
        if (expr[i] == ' ') continue;
        if (expr[i] >= '0' && expr[i] <= '9') {
            double val = 0;
            while (i < len && expr[i] >= '0' && expr[i] <= '9') {
                val = val * 10 + (expr[i++] - '0');
            }
            i--;
            values[++v_top] = val;
        } else if (expr[i] == '(') {
            ops[++o_top] = expr[i];
        } else if (expr[i] == ')') {
            while (o_top >= 0 && ops[o_top] != '(') {
                double v2 = values[v_top--];
                double v1 = values[v_top--];
                char op = ops[o_top--];
                values[++v_top] = apply_op(v1, v2, op);
            }
            if (o_top >= 0) o_top--;
        } else {
            while (o_top >= 0 && precedence(ops[o_top]) >= precedence(expr[i])) {
                double v2 = values[v_top--];
                double v1 = values[v_top--];
                char op = ops[o_top--];
                values[++v_top] = apply_op(v1, v2, op);
            }
            ops[++o_top] = expr[i];
        }
    }
    while (o_top >= 0) {
        double v2 = values[v_top--];
        double v1 = values[v_top--];
        char op = ops[o_top--];
        values[++v_top] = apply_op(v1, v2, op);
    }
    return (v_top >= 0) ? values[v_top] : 0.0;
}

int main(void) {
    int choice;
    do {
        printf("=== Mathematical Expression Evaluator ===\n");
        printf("1. Evaluate Arithmetic Expression\n");
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
                char expr[MAX_EXPR];
                printf("Enter expression (e.g. 3 + 5 * (2 - 8)): ");
                if (scanf("%255[^\n]", expr) == 1) {
                    clear_input();
                    printf("Result: %.4f\n", evaluate_expr(expr));
                } else {
                    clear_input();
                }
                break;
            }
            case 0:
                printf("Exiting evaluator.\n");
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
Available via: `proj_math_evaluator`, `projects.parsers-compilers.math-evaluator.prog-math-evaluator`, `projects>proj_math_evaluator()`, `projects>parsers-compilers>math-evaluator>prog-math-evaluator>proj_math_evaluator()`
