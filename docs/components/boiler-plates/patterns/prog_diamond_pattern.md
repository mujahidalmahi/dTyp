# prog_diamond_pattern
> **Domain:** `boiler-plates` | **Subcategory:** `patterns` | **Type:** `program`
## Overview
Interactive diamond and geometric ASCII pattern generator

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
        printf("\n=== DIAMOND PATTERN GENERATOR ===\n");
        printf("1. Solid Star Diamond\n");
        printf("2. Hollow Star Diamond\n");
        printf("3. Alphabet Diamond\n");
        printf("0. Exit\n");
        printf("Select option: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        if (choice >= 1 && choice <= 3) {
            int n;
            printf("Enter radius n (1 to 15): ");
            if (scanf("%d", &n) == 1 && n > 0 && n <= 15) {
                printf("\n");
                if (choice == 1) {
                    for (int i = 1; i <= n; i++) {
                        for (int s = 1; s <= n - i; s++) putchar(' ');
                        for (int k = 1; k <= 2 * i - 1; k++) putchar('*');
                        putchar('\n');
                    }
                    for (int i = n - 1; i >= 1; i--) {
                        for (int s = 1; s <= n - i; s++) putchar(' ');
                        for (int k = 1; k <= 2 * i - 1; k++) putchar('*');
                        putchar('\n');
                    }
                } else if (choice == 2) {
                    for (int i = 1; i <= n; i++) {
                        for (int s = 1; s <= n - i; s++) putchar(' ');
                        for (int k = 1; k <= 2 * i - 1; k++) {
                            if (k == 1 || k == 2 * i - 1) putchar('*');
                            else putchar(' ');
                        }
                        putchar('\n');
                    }
                    for (int i = n - 1; i >= 1; i--) {
                        for (int s = 1; s <= n - i; s++) putchar(' ');
                        for (int k = 1; k <= 2 * i - 1; k++) {
                            if (k == 1 || k == 2 * i - 1) putchar('*');
                            else putchar(' ');
                        }
                        putchar('\n');
                    }
                } else if (choice == 3) {
                    for (int i = 0; i < n; i++) {
                        for (int s = 0; s < n - i - 1; s++) putchar(' ');
                        for (int k = 0; k <= i; k++) putchar('A' + k);
                        for (int k = i - 1; k >= 0; k--) putchar('A' + k);
                        putchar('\n');
                    }
                    for (int i = n - 2; i >= 0; i--) {
                        for (int s = 0; s < n - i - 1; s++) putchar(' ');
                        for (int k = 0; k <= i; k++) putchar('A' + k);
                        for (int k = i - 1; k >= 0; k--) putchar('A' + k);
                        putchar('\n');
                    }
                }
            }
        }
        clear_input();
    } while (choice != 0);

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_diamond_pattern`, `boiler-plates.full-programs.patterns.prog-diamond-pattern`, `boiler-plates>prog_diamond_pattern()`, `boiler-plates>full-programs>patterns>prog-diamond-pattern>prog_diamond_pattern()`, `diamondPatternProgram`
