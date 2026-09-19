# prog_dynamic_array_stats
> **Domain:** `boiler-plates` | **Subcategory:** `dynamic-memory` | **Type:** `program`
## Overview
Interactive dynamic heap memory allocation and statistical analyzer

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
#include <stdlib.h>
#include <math.h>

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

int main(void) {
    double* arr = NULL;
    int size = 0;
    int choice;

    do {
        printf("\n=== DYNAMIC HEAP ARRAY STATS ===\n");
        printf("1. Allocate & Input Array\n");
        printf("2. Compute Statistics (Mean, Min, Max, StdDev)\n");
        printf("3. Free Memory\n");
        printf("0. Exit\n");
        printf("Select option: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        if (choice == 1) {
            if (arr) { free(arr); arr = NULL; }
            printf("Enter number of elements (1 to 1000): ");
            if (scanf("%d", &size) == 1 && size > 0 && size <= 1000) {
                arr = (double*)malloc((size_t)size * sizeof(double));
                if (!arr) {
                    printf("Memory allocation failed!\n");
                    size = 0;
                } else {
                    printf("Enter %d double values: ", size);
                    for (int i = 0; i < size; i++) {
                        if (scanf("%lf", &arr[i]) != 1) arr[i] = 0.0;
                    }
                    printf("Successfully allocated and stored %d elements.\n", size);
                }
            }
        } else if (choice == 2) {
            if (!arr || size == 0) {
                printf("No active array allocated!\n");
            } else {
                double sum = 0.0, min_val = arr[0], max_val = arr[0];
                for (int i = 0; i < size; i++) {
                    sum += arr[i];
                    if (arr[i] < min_val) min_val = arr[i];
                    if (arr[i] > max_val) max_val = arr[i];
                }
                double mean = sum / size;
                double var_sum = 0.0;
                for (int i = 0; i < size; i++) {
                    var_sum += (arr[i] - mean) * (arr[i] - mean);
                }
                double stddev = sqrt(var_sum / size);
                printf("Count  : %d\n", size);
                printf("Sum    : %.4f\n", sum);
                printf("Mean   : %.4f\n", mean);
                printf("Minimum: %.4f\n", min_val);
                printf("Maximum: %.4f\n", max_val);
                printf("Std Dev: %.4f\n", stddev);
            }
        } else if (choice == 3) {
            if (arr) {
                free(arr);
                arr = NULL;
                size = 0;
                printf("Memory successfully freed.\n");
            } else {
                printf("Memory is already free.\n");
            }
        }
        clear_input();
    } while (choice != 0);

    if (arr) free(arr);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_dynamic_array_stats`, `boiler-plates.full-programs.dynamic-memory.prog-dynamic-array-stats`, `boiler-plates>prog_dynamic_array_stats()`, `boiler-plates>full-programs>dynamic-memory>prog-dynamic-array-stats>prog_dynamic_array_stats()`, `dynamicArrayStatsProgram`
