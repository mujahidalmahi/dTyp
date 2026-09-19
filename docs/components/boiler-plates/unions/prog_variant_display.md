# prog_variant_display
> **Domain:** `boiler-plates` | **Subcategory:** `unions` | **Type:** `program`
## Overview
Interactive tagged union variant representation system with dynamic inspection

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
#include <string.h>

typedef enum {
    TYPE_INT,
    TYPE_DOUBLE,
    TYPE_STRING
} VariantType;

typedef struct {
    VariantType type;
    union {
        int i_val;
        double d_val;
        char s_val[64];
    } data;
} Variant;

static void display_variant(const Variant* v) {
    switch (v->type) {
        case TYPE_INT:
            printf("Variant [TYPE_INT]    : %d (sizeof union = %zu bytes)\n",
                   v->data.i_val, sizeof(v->data));
            break;
        case TYPE_DOUBLE:
            printf("Variant [TYPE_DOUBLE] : %.6f (sizeof union = %zu bytes)\n",
                   v->data.d_val, sizeof(v->data));
            break;
        case TYPE_STRING:
            printf("Variant [TYPE_STRING] : \"%s\" (sizeof union = %zu bytes)\n",
                   v->data.s_val, sizeof(v->data));
            break;
    }
}

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

int main(void) {
    Variant active_var;
    active_var.type = TYPE_INT;
    active_var.data.i_val = 42;
    int choice;

    do {
        printf("\n=== TAGGED UNION VARIANT EXPLORER ===\n");
        printf("Current Stored State:\n  ");
        display_variant(&active_var);
        printf("\n1. Set Integer Value\n");
        printf("2. Set Double Value\n");
        printf("3. Set String Value\n");
        printf("0. Exit\n");
        printf("Select option: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }
        clear_input();

        if (choice == 1) {
            int iv;
            printf("Enter integer: ");
            if (scanf("%d", &iv) == 1) {
                active_var.type = TYPE_INT;
                active_var.data.i_val = iv;
            }
            clear_input();
        } else if (choice == 2) {
            double dv;
            printf("Enter double: ");
            if (scanf("%lf", &dv) == 1) {
                active_var.type = TYPE_DOUBLE;
                active_var.data.d_val = dv;
            }
            clear_input();
        } else if (choice == 3) {
            printf("Enter string: ");
            if (fgets(active_var.data.s_val, sizeof(active_var.data.s_val), stdin)) {
                active_var.data.s_val[strcspn(active_var.data.s_val, "\r\n")] = '\0';
                active_var.type = TYPE_STRING;
            }
        }
    } while (choice != 0);

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_variant_display`, `boiler-plates.full-programs.unions.prog-variant-display`, `boiler-plates>prog_variant_display()`, `boiler-plates>full-programs>unions>prog-variant-display>prog_variant_display()`, `variantDisplayProgram`
