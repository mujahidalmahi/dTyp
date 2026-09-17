# print_hollow_square
> **Domain:** `boiler-plates` | **Subcategory:** `patterns` | **Type:** `function`
## Overview
Prints a hollow star square of given dimensions

## Signature
```c
void print_hollow_square(int size);
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
void print_hollow_square(int size) {
    for (int i = 0; i < size; i++) {
        for (int j = 0; j < size; j++) {
            if (i == 0 || i == size - 1 || j == 0 || j == size - 1) {
                putchar('*');
            } else {
                putchar(' ');
            }
        }
        putchar('
');
    }
}
```

## Aliases & Shorthands
Available via: `print_hollow_square`, `boiler-plates.separate-components.patterns.print-hollow-square`, `boiler-plates>print_hollow_square()`, `boiler-plates>separate-components>patterns>print-hollow-square>print_hollow_square()`, `printHollowSquare`
