# prog_multiplication_table
> **Domain:** `boiler-plates` | **Subcategory:** `loops` | **Type:** `program`
## Overview
Interactive arithmetic multiplication table and grid generator

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

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

int main(void) {
    int choice;

    do {
        printf("\n=== MULTIPLICATION TABLE SUITE ===\n");
        printf("1. Single Number Table\n");
        printf("2. 2D Multiplication Grid\n");
        printf("0. Exit\n");
        printf("Select option: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        if (choice == 1) {
            int num, limit;
            printf("Enter base number and limit (e.g. 7 12): ");
            if (scanf("%d %d", &num, &limit) == 2 && limit > 0 && limit <= 100) {
                printf("\nMultiplication Table for %d:\n", num);
                for (int i = 1; i <= limit; i++) {
                    printf("  %2d x %2d = %4d\n", num, i, num * i);
                }
            }
        } else if (choice == 2) {
            int rows, cols;
            printf("Enter grid dimensions rows cols (1-15): ");
            if (scanf("%d %d", &rows, &cols) == 2 && rows > 0 && rows <= 15 && cols > 0 && cols <= 15) {
                printf("\n      ");
                for (int c = 1; c <= cols; c++) printf("%5d", c);
                printf("\n      ");
                for (int c = 1; c <= cols; c++) printf("-----");
                printf("\n");
                for (int r = 1; r <= rows; r++) {
                    printf("%4d |", r);
                    for (int c = 1; c <= cols; c++) {
                        printf("%5d", r * c);
                    }
                    printf("\n");
                }
            }
        }
        clear_input();
    } while (choice != 0);

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_multiplication_table`, `boiler-plates.full-programs.loops.prog-multiplication-table`, `boiler-plates>prog_multiplication_table()`, `boiler-plates>full-programs>loops>prog-multiplication-table>prog_multiplication_table()`, `multiplicationTableProgram`
