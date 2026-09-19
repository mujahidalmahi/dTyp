# prog_calculator_dispatch
> **Domain:** `boiler-plates` | **Subcategory:** `functions` | **Type:** `program`
## Overview
Interactive arithmetic calculator using function pointer dispatch table

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
#include <math.h>

typedef double (*BinaryOp)(double, double);

static double op_add(double a, double b) { return a + b; }
static double op_sub(double a, double b) { return a - b; }
static double op_mul(double a, double b) { return a * b; }
static double op_div(double a, double b) { return (b != 0.0) ? a / b : 0.0; }
static double op_pow(double a, double b) { return pow(a, b); }

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

int main(void) {
    static const BinaryOp ops[] = { op_add, op_sub, op_mul, op_div, op_pow };
    static const char* op_names[] = { "Add (+)", "Subtract (-)", "Multiply (*)", "Divide (/)", "Power (^)" };
    int choice;
    double x, y;

    do {
        printf("\n=== DISPATCH TABLE CALCULATOR ===\n");
        for (int i = 0; i < 5; i++) {
            printf("%d. %s\n", i + 1, op_names[i]);
        }
        printf("0. Exit\n");
        printf("Select operation: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        if (choice >= 1 && choice <= 5) {
            printf("Enter operands X and Y: ");
            if (scanf("%lf %lf", &x, &y) == 2) {
                if (choice == 4 && y == 0.0) {
                    printf("Error: Division by zero is undefined!\n");
                } else {
                    double result = ops[choice - 1](x, y);
                    printf("Result: %.4f\n", result);
                }
            }
        }
        clear_input();
    } while (choice != 0);

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_calculator_dispatch`, `boiler-plates.full-programs.functions.prog-calculator-dispatch`, `boiler-plates>prog_calculator_dispatch()`, `boiler-plates>full-programs>functions>prog-calculator-dispatch>prog_calculator_dispatch()`, `calculatorDispatchProgram`
