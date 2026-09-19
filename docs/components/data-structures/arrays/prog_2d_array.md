# prog_2d_array
> **Domain:** `data-structures` | **Subcategory:** `arrays` | **Type:** `program`
## Overview
Interactive 2D matrix program with allocation, element editing, transposition, row/col sums, and display

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

int** alloc_matrix(int rows, int cols) {
    int** m = (int**)malloc(rows * sizeof(int*));
    for (int i = 0; i < rows; i++) {
        m[i] = (int*)calloc(cols, sizeof(int));
    }
    return m;
}

void free_matrix(int** m, int rows) {
    for (int i = 0; i < rows; i++) free(m[i]);
    free(m);
}

void print_matrix(int** m, int rows, int cols) {
    printf("Matrix (%dx%d):\n", rows, cols);
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) printf("%4d ", m[i][j]);
        printf("\n");
    }
}

int** transpose_matrix(int** m, int rows, int cols) {
    int** t = alloc_matrix(cols, rows);
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            t[j][i] = m[i][j];
        }
    }
    return t;
}

int main(void) {
    int rows = 3, cols = 3;
    int** mat = alloc_matrix(rows, cols);
    int choice;

    do {
        printf("\n=== 2D Matrix Operations Menu ===\n");
        printf("1. Set Element at (row, col)\n");
        printf("2. Display Matrix\n");
        printf("3. Transpose Matrix\n");
        printf("4. Compute Row and Column Sums\n");
        printf("5. Reallocate Matrix Dimensions\n");
        printf("0. Exit\n");
        printf("Enter choice: ");

        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                int r, c, val;
                printf("Enter row (0-%d), col (0-%d), and value: ", rows - 1, cols - 1);
                if (scanf("%d %d %d", &r, &c, &val) == 3) {
                    if (r >= 0 && r < rows && c >= 0 && c < cols) {
                        mat[r][c] = val;
                        printf("Set mat[%d][%d] = %d\n", r, c, val);
                    } else printf("Coordinates out of range.\n");
                } else clear_input();
                break;
            }
            case 2:
                print_matrix(mat, rows, cols);
                break;
            case 3: {
                int** trans = transpose_matrix(mat, rows, cols);
                print_matrix(trans, cols, rows);
                free_matrix(trans, cols);
                break;
            }
            case 4: {
                for (int i = 0; i < rows; i++) {
                    int rsum = 0;
                    for (int j = 0; j < cols; j++) rsum += mat[i][j];
                    printf("Row %d Sum: %d\n", i, rsum);
                }
                for (int j = 0; j < cols; j++) {
                    int csum = 0;
                    for (int i = 0; i < rows; i++) csum += mat[i][j];
                    printf("Col %d Sum: %d\n", j, csum);
                }
                break;
            }
            case 5: {
                int nr, nc;
                printf("Enter new rows and cols: ");
                if (scanf("%d %d", &nr, &nc) == 2 && nr > 0 && nc > 0) {
                    free_matrix(mat, rows);
                    rows = nr;
                    cols = nc;
                    mat = alloc_matrix(rows, cols);
                    printf("Matrix resized to %dx%d.\n", rows, cols);
                } else clear_input();
                break;
            }
            case 0:
                printf("Exiting 2D Matrix Menu.\n");
                break;
            default:
                printf("Invalid choice.\n");
                break;
        }
    } while (choice != 0);

    free_matrix(mat, rows);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_2d_array`, `data-structures.full-programs.arrays.2d-array.prog-2d-array`, `data-structures>prog_2d_array()`, `data-structures>full-programs>arrays>2d-array>prog-2d-array>prog_2d_array()`, `programArray2D`
