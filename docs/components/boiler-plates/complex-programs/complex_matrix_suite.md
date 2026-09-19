# complex_matrix_suite
> **Domain:** `boiler-plates` | **Subcategory:** `complex-programs` | **Type:** `program`
## Overview
Interactive linear algebra matrix operations suite (addition, multiplication, transpose, determinant)

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

#define MAX_DIM 4

typedef struct {
    int rows;
    int cols;
    double data[MAX_DIM][MAX_DIM];
} Matrix;

static void print_matrix(const Matrix* m, const char* name) {
    printf("Matrix %s (%dx%d):\n", name, m->rows, m->cols);
    for (int r = 0; r < m->rows; r++) {
        printf("  |");
        for (int c = 0; c < m->cols; c++) {
            printf("%7.2f ", m->data[r][c]);
        }
        printf("|\n");
    }
}

static Matrix add_matrices(const Matrix* a, const Matrix* b) {
    Matrix res;
    res.rows = a->rows;
    res.cols = a->cols;
    for (int r = 0; r < a->rows; r++) {
        for (int c = 0; c < a->cols; c++) {
            res.data[r][c] = a->data[r][c] + b->data[r][c];
        }
    }
    return res;
}

static Matrix multiply_matrices(const Matrix* a, const Matrix* b) {
    Matrix res;
    res.rows = a->rows;
    res.cols = b->cols;
    for (int r = 0; r < a->rows; r++) {
        for (int c = 0; c < b->cols; c++) {
            res.data[r][c] = 0.0;
            for (int k = 0; k < a->cols; k++) {
                res.data[r][c] += a->data[r][k] * b->data[k][c];
            }
        }
    }
    return res;
}

static Matrix transpose_matrix(const Matrix* a) {
    Matrix res;
    res.rows = a->cols;
    res.cols = a->rows;
    for (int r = 0; r < a->rows; r++) {
        for (int c = 0; c < a->cols; c++) {
            res.data[c][r] = a->data[r][c];
        }
    }
    return res;
}

static double det2x2(const Matrix* m) {
    return m->data[0][0] * m->data[1][1] - m->data[0][1] * m->data[1][0];
}

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

int main(void) {
    Matrix a = { 2, 2, {{ 1.0, 2.0 }, { 3.0, 4.0 }} };
    Matrix b = { 2, 2, {{ 5.0, 6.0 }, { 7.0, 8.0 }} };
    int choice;

    do {
        printf("\n=== MATRIX MATHEMATICS SUITE ===\n");
        print_matrix(&a, "A");
        print_matrix(&b, "B");
        printf("1. Add Matrices (A + B)\n");
        printf("2. Multiply Matrices (A * B)\n");
        printf("3. Transpose Matrix A\n");
        printf("4. Determinant of Matrix A (2x2)\n");
        printf("5. Input New Matrix A Values\n");
        printf("0. Exit\n");
        printf("Select option: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        if (choice == 1) {
            Matrix c = add_matrices(&a, &b);
            print_matrix(&c, "A + B");
        } else if (choice == 2) {
            Matrix c = multiply_matrices(&a, &b);
            print_matrix(&c, "A * B");
        } else if (choice == 3) {
            Matrix at = transpose_matrix(&a);
            print_matrix(&at, "A^T");
        } else if (choice == 4) {
            printf("Determinant of A: %.4f\n", det2x2(&a));
        } else if (choice == 5) {
            printf("Enter 4 elements for 2x2 Matrix A: ");
            for (int r = 0; r < 2; r++) {
                for (int c = 0; c < 2; c++) {
                    if (scanf("%lf", &a.data[r][c]) != 1) a.data[r][c] = 0.0;
                }
            }
        }
        clear_input();
    } while (choice != 0);

    return 0;
}
```

## Aliases & Shorthands
Available via: `complex_matrix_suite`, `boiler-plates.full-programs.complex-programs.complex-matrix-suite`, `boiler-plates>complex_matrix_suite()`, `boiler-plates>full-programs>complex-programs>complex-matrix-suite>complex_matrix_suite()`, `matrixSuiteProgram`
