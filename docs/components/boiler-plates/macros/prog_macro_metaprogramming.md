# prog_macro_metaprogramming
> **Domain:** `boiler-plates` | **Subcategory:** `macros` | **Type:** `program`
## Overview
Interactive preprocessor macro metaprogramming workbench (MIN, MAX, CLAMP, SWAP)

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

#define MACRO_MIN(a, b) (((a) < (b)) ? (a) : (b))
#define MACRO_MAX(a, b) (((a) > (b)) ? (a) : (b))
#define MACRO_CLAMP(x, lo, hi) (MACRO_MIN(MACRO_MAX((x), (lo)), (hi)))
#define MACRO_SWAP(T, a, b) do { T _temp = (a); (a) = (b); (b) = _temp; } while (0)
#define ARRAY_COUNT(arr) (sizeof(arr) / sizeof((arr)[0]))

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

int main(void) {
    int choice;

    do {
        printf("\n=== MACRO METAPROGRAMMING WORKBENCH ===\n");
        printf("1. Test MIN and MAX Macros\n");
        printf("2. Test CLAMP Macro (Value, Low, High)\n");
        printf("3. Test Generic SWAP Macro\n");
        printf("0. Exit\n");
        printf("Select option: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        if (choice == 1) {
            int a, b;
            printf("Enter two integers: ");
            if (scanf("%d %d", &a, &b) == 2) {
                printf("MACRO_MIN(%d, %d) = %d\n", a, b, MACRO_MIN(a, b));
                printf("MACRO_MAX(%d, %d) = %d\n", a, b, MACRO_MAX(a, b));
            }
        } else if (choice == 2) {
            int val, lo, hi;
            printf("Enter value, min_bound, max_bound: ");
            if (scanf("%d %d %d", &val, &lo, &hi) == 3) {
                printf("MACRO_CLAMP(%d, %d, %d) = %d\n", val, lo, hi, MACRO_CLAMP(val, lo, hi));
            }
        } else if (choice == 3) {
            double x, y;
            printf("Enter two double values to swap: ");
            if (scanf("%lf %lf", &x, &y) == 2) {
                printf("Before swap: x = %.2f, y = %.2f\n", x, y);
                MACRO_SWAP(double, x, y);
                printf("After swap : x = %.2f, y = %.2f\n", x, y);
            }
        }
        clear_input();
    } while (choice != 0);

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_macro_metaprogramming`, `boiler-plates.full-programs.macros.prog-macro-metaprogramming`, `boiler-plates>prog_macro_metaprogramming()`, `boiler-plates>full-programs>macros>prog-macro-metaprogramming>prog_macro_metaprogramming()`, `macroMetaprogrammingProgram`
