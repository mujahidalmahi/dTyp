# prog_pointer_arithmetic
> **Domain:** `boiler-plates` | **Subcategory:** `pointers` | **Type:** `program`
## Overview
Interactive pointer arithmetic memory walk and address inspection tool

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
#include <stddef.h>

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

int main(void) {
    int data[16];
    int n = 0;
    int choice;

    printf("=== POINTER ARITHMETIC WORKSHOP ===\n");
    printf("Enter number of elements (3 to 16): ");
    if (scanf("%d", &n) != 1 || n < 3 || n > 16) n = 6;
    printf("Enter %d integers: ", n);
    for (int i = 0; i < n; i++) {
        if (scanf("%d", &data[i]) != 1) data[i] = (i + 1) * 10;
    }
    clear_input();

    do {
        printf("\n=== MENU ===\n");
        printf("1. Walk Forward via Pointers\n");
        printf("2. Walk Reverse via Pointers\n");
        printf("3. Calculate Pointer Difference (Subscript Offset)\n");
        printf("4. Inspect Memory Addresses and Byte Offsets\n");
        printf("0. Exit\n");
        printf("Select option: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        if (choice == 1) {
            int* ptr = data;
            int* end = data + n;
            printf("Forward: ");
            while (ptr < end) {
                printf("%d ", *ptr++);
            }
            printf("\n");
        } else if (choice == 2) {
            int* ptr = data + n - 1;
            printf("Reverse: ");
            while (ptr >= data) {
                printf("%d ", *ptr--);
            }
            printf("\n");
        } else if (choice == 3) {
            int idx1, idx2;
            printf("Enter two indices between 0 and %d: ", n - 1);
            if (scanf("%d %d", &idx1, &idx2) == 2 && idx1 >= 0 && idx1 < n && idx2 >= 0 && idx2 < n) {
                int* p1 = &data[idx1];
                int* p2 = &data[idx2];
                ptrdiff_t diff = p2 - p1;
                printf("Address p1: %p | Val: %d\n", (void*)p1, *p1);
                printf("Address p2: %p | Val: %d\n", (void*)p2, *p2);
                printf("Pointer difference (p2 - p1) = %td elements (%td bytes)\n",
                       diff, diff * (ptrdiff_t)sizeof(int));
            }
        } else if (choice == 4) {
            printf("Array Base Address: %p\n", (void*)data);
            for (int i = 0; i < n; i++) {
                int* p = data + i;
                printf("  data[%2d] @ %p | val: %4d | byte offset: +%zu\n",
                       i, (void*)p, *p, (size_t)((char*)p - (char*)data));
            }
        }
        clear_input();
    } while (choice != 0);

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_pointer_arithmetic`, `boiler-plates.full-programs.pointers.prog-pointer-arithmetic`, `boiler-plates>prog_pointer_arithmetic()`, `boiler-plates>full-programs>pointers>prog-pointer-arithmetic>prog_pointer_arithmetic()`, `pointerArithmeticProgram`
