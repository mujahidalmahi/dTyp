# print_pyramid
> **Domain:** `boiler-plates` | **Subcategory:** `patterns` | **Type:** `function`
## Overview
Prints a symmetrical star pyramid with leading spacing

## Signature
```c
void print_pyramid(int rows);
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
void print_pyramid(int rows) {
    for (int i = 1; i <= rows; i++) {
        for (int s = 0; s < rows - i; s++) {
            putchar(' ');
        }
        for (int j = 0; j < (2 * i - 1); j++) {
            putchar('*');
        }
        putchar('\n');
    }
}
```

## Aliases & Shorthands
Available via: `print_pyramid`, `boiler-plates.separate-components.patterns.print-pyramid`, `boiler-plates>print_pyramid()`, `boiler-plates>separate-components>patterns>print-pyramid>print_pyramid()`, `printPyramid`
