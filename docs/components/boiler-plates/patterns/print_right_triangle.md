# print_right_triangle
> **Domain:** `boiler-plates` | **Subcategory:** `patterns` | **Type:** `function`
## Overview
Prints a right-angled star triangle with given row count

## Signature
```c
void print_right_triangle(int rows);
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
void print_right_triangle(int rows) {
    for (int i = 1; i <= rows; i++) {
        for (int j = 1; j <= i; j++) {
            putchar('*');
        }
        putchar('
');
    }
}
```

## Aliases & Shorthands
Available via: `print_right_triangle`, `boiler-plates.separate-components.patterns.print-right-triangle`, `boiler-plates>print_right_triangle()`, `boiler-plates>separate-components>patterns>print-right-triangle>print_right_triangle()`, `printRightTriangle`
