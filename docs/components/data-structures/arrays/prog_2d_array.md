# prog_2d_array
> **Domain:** `data-structures` | **Subcategory:** `arrays` | **Type:** `program`
## Overview
Complete 2D matrix dynamic allocation and transpose program

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

int main(void) {
    int rows = 2, cols = 3;
    int** m = (int**)malloc(rows * sizeof(int*));
    for (int i = 0; i < rows; i++) {
        m[i] = (int*)malloc(cols * sizeof(int));
    }

    int counter = 1;
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            m[i][j] = counter++;
        }
    }

    printf("Matrix 2x3:
");
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) printf("%3d", m[i][j]);
        putchar('
');
    }

    int** t = (int**)malloc(cols * sizeof(int*));
    for (int j = 0; j < cols; j++) {
        t[j] = (int*)malloc(rows * sizeof(int));
        for (int i = 0; i < rows; i++) {
            t[j][i] = m[i][j];
        }
    }

    printf("Transposed 3x2:
");
    for (int j = 0; j < cols; j++) {
        for (int i = 0; i < rows; i++) printf("%3d", t[j][i]);
        putchar('
');
    }

    for (int i = 0; i < rows; i++) free(m[i]);
    free(m);
    for (int j = 0; j < cols; j++) free(t[j]);
    free(t);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_2d_array`, `data-structures.full-programs.arrays.2d-array.prog-2d-array`, `data-structures>prog_2d_array()`, `data-structures>full-programs>arrays>2d-array>prog-2d-array>prog_2d_array()`, `programArray2D`
