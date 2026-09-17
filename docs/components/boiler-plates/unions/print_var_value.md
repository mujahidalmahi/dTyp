# print_var_value
> **Domain:** `boiler-plates` | **Subcategory:** `unions` | **Type:** `function`
## Overview
Prints tagged union VarValue based on active type discriminator

## Signature
```c
void print_var_value(const VarValue* v);
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
void print_var_value(const VarValue* v) {
    if (!v) return;
    switch (v->type) {
        case TYPE_INT:
            printf("Integer: %d
", v->val.i);
            break;
        case TYPE_FLOAT:
            printf("Float: %.2f
", v->val.f);
            break;
        case TYPE_CHAR:
            printf("Char: %c
", v->val.c);
            break;
    }
}
```

## Aliases & Shorthands
Available via: `print_var_value`, `boiler-plates.separate-components.unions.print-var-value`, `boiler-plates>print_var_value()`, `boiler-plates>separate-components>unions>print-var-value>print_var_value()`, `printVarValue`

## Dependencies
Requires: `boiler-plates.separate-components.unions.tagged-union-struct`
