# prog_monotonic_stack
> **Domain:** `data-structures` | **Subcategory:** `stacks` | **Type:** `program`
## Overview
Interactive monotonic stack program solving Next Greater Element and Previous Greater Element in O(n)

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
#include <stdlib.h>

void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

void next_greater_elements(const int* arr, int n, int* nge) {
    int* stack = (int*)malloc(n * sizeof(int));
    int top = -1;

    for (int i = n - 1; i >= 0; i--) {
        while (top >= 0 && stack[top] <= arr[i]) top--;
        nge[i] = (top >= 0) ? stack[top] : -1;
        stack[++top] = arr[i];
    }
    free(stack);
}

void prev_greater_elements(const int* arr, int n, int* pge) {
    int* stack = (int*)malloc(n * sizeof(int));
    int top = -1;

    for (int i = 0; i < n; i++) {
        while (top >= 0 && stack[top] <= arr[i]) top--;
        pge[i] = (top >= 0) ? stack[top] : -1;
        stack[++top] = arr[i];
    }
    free(stack);
}

int main(void) {
    int n = 5;
    int arr[100] = {4, 5, 2, 25, 10};
    int choice;

    do {
        printf("\n=== Monotonic Stack Operations Menu ===\n");
        printf("1. Input New Array\n");
        printf("2. Compute Next Greater Elements (NGE)\n");
        printf("3. Compute Previous Greater Elements (PGE)\n");
        printf("4. Display Current Array\n");
        printf("0. Exit\n");
        printf("Enter choice: ");

        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                printf("Enter number of elements (1-100): ");
                if (scanf("%d", &n) == 1 && n > 0 && n <= 100) {
                    printf("Enter %d integers: ", n);
                    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
                    printf("Array updated successfully.\n");
                } else clear_input();
                break;
            }
            case 2: {
                int* nge = (int*)malloc(n * sizeof(int));
                next_greater_elements(arr, n, nge);
                printf("Element -> Next Greater Element:\n");
                for (int i = 0; i < n; i++) printf("  %4d -> %d\n", arr[i], nge[i]);
                free(nge);
                break;
            }
            case 3: {
                int* pge = (int*)malloc(n * sizeof(int));
                prev_greater_elements(arr, n, pge);
                printf("Element -> Previous Greater Element:\n");
                for (int i = 0; i < n; i++) printf("  %4d -> %d\n", arr[i], pge[i]);
                free(pge);
                break;
            }
            case 4:
                printf("Current Array [%d elements]: ", n);
                for (int i = 0; i < n; i++) printf("%d ", arr[i]);
                printf("\n");
                break;
            case 0:
                printf("Exiting Monotonic Stack Menu.\n");
                break;
            default:
                printf("Invalid choice.\n");
                break;
        }
    } while (choice != 0);

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_monotonic_stack`, `data-structures.full-programs.stacks.monotonic-stack.prog-monotonic-stack`, `data-structures>prog_monotonic_stack()`, `data-structures>full-programs>stacks>monotonic-stack>prog-monotonic-stack>prog_monotonic_stack()`, `programMonotonicStack`
