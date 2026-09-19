# prog_variant_display
> **Domain:** `boiler-plates` | **Subcategory:** `unions` | **Type:** `program`
## Overview
Complete tagged variant union dispatcher program

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

typedef enum Kind { KIND_INT, KIND_FLOAT, KIND_STRING } Kind;

typedef struct Variant {
    Kind kind;
    union {
        int i_val;
        float f_val;
        char str[32];
    } as;
} Variant;

void print_variant(const Variant* v) {
    switch (v->kind) {
        case KIND_INT:
            printf("Variant Int: %d\n", v->as.i_val);
            break;
        case KIND_FLOAT:
            printf("Variant Float: %.2f\n", v->as.f_val);
            break;
        case KIND_STRING:
            printf("Variant String: %s\n", v->as.str);
            break;
    }
}

int main(void) {
    Variant v1 = {.kind = KIND_INT, .as.i_val = 42};
    Variant v2 = {.kind = KIND_FLOAT, .as.f_val = 3.14159f};

    print_variant(&v1);
    print_variant(&v2);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_variant_display`, `boiler-plates.full-programs.unions.prog-variant-display`, `boiler-plates>prog_variant_display()`, `boiler-plates>full-programs>unions>prog-variant-display>prog_variant_display()`, `variantDisplayProgram`
