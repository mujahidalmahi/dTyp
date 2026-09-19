# prog_star_pyramid
> **Domain:** `boiler-plates` | **Subcategory:** `patterns` | **Type:** `program`
## Overview
Interactive terminal star pyramid and pattern generator

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
        printf("\n=== STAR PYRAMID GENERATOR ===\n");
        printf("1. Solid Centered Pyramid\n");
        printf("2. Inverted Pyramid\n");
        printf("3. Hollow Pyramid\n");
        printf("0. Exit\n");
        printf("Select option: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        if (choice >= 1 && choice <= 3) {
            int h;
            printf("Enter height (1 to 20): ");
            if (scanf("%d", &h) == 1 && h > 0 && h <= 20) {
                printf("\n");
                if (choice == 1) {
                    for (int i = 0; i < h; i++) {
                        for (int j = 0; j < h - i - 1; j++) putchar(' ');
                        for (int j = 0; j < 2 * i + 1; j++) putchar('*');
                        putchar('\n');
                    }
                } else if (choice == 2) {
                    for (int i = h - 1; i >= 0; i--) {
                        for (int j = 0; j < h - i - 1; j++) putchar(' ');
                        for (int j = 0; j < 2 * i + 1; j++) putchar('*');
                        putchar('\n');
                    }
                } else if (choice == 3) {
                    for (int i = 0; i < h; i++) {
                        for (int j = 0; j < h - i - 1; j++) putchar(' ');
                        for (int j = 0; j < 2 * i + 1; j++) {
                            if (i == h - 1 || j == 0 || j == 2 * i) putchar('*');
                            else putchar(' ');
                        }
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
Available via: `prog_star_pyramid`, `boiler-plates.full-programs.patterns.prog-star-pyramid`, `boiler-plates>prog_star_pyramid()`, `boiler-plates>full-programs>patterns>prog-star-pyramid>prog_star_pyramid()`, `starPyramidProgram`
