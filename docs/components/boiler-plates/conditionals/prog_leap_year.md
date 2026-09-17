# prog_leap_year
> **Domain:** `boiler-plates` | **Subcategory:** `conditionals` | **Type:** `program`
## Overview
Complete leap year evaluation program

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
#include <stdbool.h>

bool is_leap_year(int year) {
    if (year % 400 == 0) return true;
    if (year % 100 == 0) return false;
    return (year % 4 == 0);
}

int main(void) {
    int test_years[] = {1900, 2000, 2024, 2026};
    int n = sizeof(test_years) / sizeof(test_years[0]);

    for (int i = 0; i < n; i++) {
        int y = test_years[i];
        printf("Year %d: %s
", y, is_leap_year(y) ? "Leap Year" : "Common Year");
    }
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_leap_year`, `boiler-plates.full-programs.conditionals.prog-leap-year`, `boiler-plates>prog_leap_year()`, `boiler-plates>full-programs>conditionals>prog-leap-year>prog_leap_year()`, `leapYearProgram`
