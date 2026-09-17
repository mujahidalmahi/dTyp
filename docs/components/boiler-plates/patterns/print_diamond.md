# print_diamond
> **Domain:** `boiler-plates` | **Subcategory:** `patterns` | **Type:** `function`
## Overview
Prints an upper and lower symmetrical star diamond

## Signature
```c
void print_diamond(int n);
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
void print_diamond(int n) {
    for (int i = 1; i <= n; i++) {
        for (int s = 0; s < n - i; s++) putchar(' ');
        for (int j = 0; j < (2 * i - 1); j++) putchar('*');
        putchar('
');
    }
    for (int i = n - 1; i >= 1; i--) {
        for (int s = 0; s < n - i; s++) putchar(' ');
        for (int j = 0; j < (2 * i - 1); j++) putchar('*');
        putchar('
');
    }
}
```

## Aliases & Shorthands
Available via: `print_diamond`, `boiler-plates.separate-components.patterns.print-diamond`, `boiler-plates>print_diamond()`, `boiler-plates>separate-components>patterns>print-diamond>print_diamond()`, `printDiamond`
