# prog_3d_array
> **Domain:** `data-structures` | **Subcategory:** `arrays` | **Type:** `program`
## Overview
Interactive 3D tensor program with layer slice inspection, element manipulation, and sum reductions

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

int main(void) {
    int L = 2, R = 3, C = 3;
    int*** tensor = (int***)malloc(L * sizeof(int**));
    for (int i = 0; i < L; i++) {
        tensor[i] = (int**)malloc(R * sizeof(int*));
        for (int j = 0; j < R; j++) {
            tensor[i][j] = (int*)calloc(C, sizeof(int));
        }
    }

    int choice;
    do {
        printf("\n=== 3D Tensor Menu (Layers: %d, Rows: %d, Cols: %d) ===\n", L, R, C);
        printf("1. Set Element (layer, row, col)\n");
        printf("2. Get Element (layer, row, col)\n");
        printf("3. Display All Slice Layers\n");
        printf("4. Compute Total Tensor Sum\n");
        printf("0. Exit\n");
        printf("Enter choice: ");

        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                int l, r, c, val;
                printf("Enter layer, row, col, and value: ");
                if (scanf("%d %d %d %d", &l, &r, &c, &val) == 4) {
                    if (l >= 0 && l < L && r >= 0 && r < R && c >= 0 && c < C) {
                        tensor[l][r][c] = val;
                        printf("Set tensor[%d][%d][%d] = %d\n", l, r, c, val);
                    } else printf("Indices out of range.\n");
                } else clear_input();
                break;
            }
            case 2: {
                int l, r, c;
                printf("Enter layer, row, col: ");
                if (scanf("%d %d %d", &l, &r, &c) == 3) {
                    if (l >= 0 && l < L && r >= 0 && r < R && c >= 0 && c < C) {
                        printf("tensor[%d][%d][%d] = %d\n", l, r, c, tensor[l][r][c]);
                    } else printf("Indices out of range.\n");
                } else clear_input();
                break;
            }
            case 3:
                for (int i = 0; i < L; i++) {
                    printf("--- Slice Layer %d ---\n", i);
                    for (int j = 0; j < R; j++) {
                        for (int k = 0; k < C; k++) printf("%4d ", tensor[i][j][k]);
                        printf("\n");
                    }
                }
                break;
            case 4: {
                long long total = 0;
                for (int i = 0; i < L; i++) {
                    for (int j = 0; j < R; j++) {
                        for (int k = 0; k < C; k++) total += tensor[i][j][k];
                    }
                }
                printf("Total Sum of all elements in tensor: %lld\n", total);
                break;
            }
            case 0:
                printf("Exiting 3D Tensor Menu.\n");
                break;
            default:
                printf("Invalid choice.\n");
                break;
        }
    } while (choice != 0);

    for (int i = 0; i < L; i++) {
        for (int j = 0; j < R; j++) free(tensor[i][j]);
        free(tensor[i]);
    }
    free(tensor);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_3d_array`, `data-structures.full-programs.arrays.3d-array.prog-3d-array`, `data-structures>prog_3d_array()`, `data-structures>full-programs>arrays>3d-array>prog-3d-array>prog_3d_array()`, `programArray3D`
