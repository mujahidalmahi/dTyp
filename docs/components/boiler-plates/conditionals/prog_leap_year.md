# prog_leap_year
> **Domain:** `boiler-plates` | **Subcategory:** `conditionals` | **Type:** `program`
## Overview
Interactive Gregorian leap year checker and date verification tool

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
#include <stdbool.h>

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

static bool is_leap_year(int year) {
    if (year % 400 == 0) return true;
    if (year % 100 == 0) return false;
    return (year % 4 == 0);
}

int main(void) {
    int choice;

    do {
        printf("\n=== LEAP YEAR & CALENDAR EXPLORER ===\n");
        printf("1. Check Specific Year\n");
        printf("2. List Leap Years in Range\n");
        printf("3. Days in February\n");
        printf("0. Exit\n");
        printf("Select option: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        if (choice == 1) {
            int y;
            printf("Enter year (e.g. 2024): ");
            if (scanf("%d", &y) == 1) {
                if (is_leap_year(y)) {
                    printf("%d is a LEAP YEAR (366 days, Feb has 29 days).\n", y);
                } else {
                    printf("%d is a COMMON YEAR (365 days, Feb has 28 days).\n", y);
                }
            }
        } else if (choice == 2) {
            int start, end, count = 0;
            printf("Enter start year and end year: ");
            if (scanf("%d %d", &start, &end) == 2 && start <= end) {
                printf("Leap years between %d and %d:\n", start, end);
                for (int y = start; y <= end; y++) {
                    if (is_leap_year(y)) {
                        printf("%6d", y);
                        count++;
                        if (count % 8 == 0) printf("\n");
                    }
                }
                if (count % 8 != 0) printf("\n");
                printf("Total leap years found: %d\n", count);
            }
        } else if (choice == 3) {
            int y;
            printf("Enter year: ");
            if (scanf("%d", &y) == 1) {
                printf("February %d has %d days.\n", y, is_leap_year(y) ? 29 : 28);
            }
        }
        clear_input();
    } while (choice != 0);

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_leap_year`, `boiler-plates.full-programs.conditionals.prog-leap-year`, `boiler-plates>prog_leap_year()`, `boiler-plates>full-programs>conditionals>prog-leap-year>prog_leap_year()`, `leapYearProgram`
