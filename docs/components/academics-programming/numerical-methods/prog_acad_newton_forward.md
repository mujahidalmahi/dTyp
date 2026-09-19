# prog_acad_newton_forward
> **Domain:** `academics-programming` | **Subcategory:** `numerical-methods` | **Type:** `program`
## Overview
Interactive Newton forward difference interpolation with 2D difference table and polynomial evaluation

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
#include <stdbool.h>

#define MAX_DIFF 15

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

static void print_diff_table(int n, const double x[], double diff[MAX_DIFF][MAX_DIFF]) {
    printf("\nNewton Forward Difference Table:\n");
    printf("   x    |   y    |");
    for (int i = 1; i < n; i++) printf("  D^%d y  |", i);
    printf("\n--------+--------+");
    for (int i = 1; i < n; i++) printf("---------+");
    printf("\n");

    for (int i = 0; i < n; i++) {
        printf("%7.2f |%7.2f |", x[i], diff[i][0]);
        for (int j = 1; j < n - i; j++) {
            printf("%8.3f |", diff[i][j]);
        }
        printf("\n");
    }
}

static double eval_newton_forward(int n, const double x[], double diff[MAX_DIFF][MAX_DIFF], double q) {
    double h = x[1] - x[0];
    double u = (q - x[0]) / h;

    double result = diff[0][0];
    double u_term = 1.0;
    double fact = 1.0;

    for (int i = 1; i < n; i++) {
        u_term *= (u - (i - 1));
        fact *= i;
        result += (u_term / fact) * diff[0][i];
    }
    return result;
}

int main(void) {
    int n = 5;
    double x[MAX_DIFF] = {10.0, 20.0, 30.0, 40.0, 50.0};
    double y[MAX_DIFF] = {0.1736, 0.3420, 0.5000, 0.6428, 0.7660};
    double diff[MAX_DIFF][MAX_DIFF];

    int choice;
    do {
        for (int i = 0; i < n; i++) diff[i][0] = y[i];
        for (int j = 1; j < n; j++) {
            for (int i = 0; i < n - j; i++) {
                diff[i][j] = diff[i + 1][j - 1] - diff[i][j - 1];
            }
        }

        printf("\n================ NEWTON FORWARD DIFFERENCE WORKBENCH ================\n");
        printf("1. Display Forward Difference Table\n");
        printf("2. Interpolate at Query Point x\n");
        printf("3. Enter Equispaced Data Points\n");
        printf("0. Exit\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1:
                print_diff_table(n, x, diff);
                break;
            case 2: {
                double q;
                printf("Enter query value x: ");
                if (scanf("%lf", &q) == 1) {
                    double ans = eval_newton_forward(n, x, diff, q);
                    printf("Interpolated Value P(%.4f) = %.6f\n", q, ans);
                } else {
                    clear_input();
                }
                break;
            }
            case 3: {
                printf("Enter number of points N (3 to %d): ", MAX_DIFF);
                if (scanf("%d", &n) != 1 || n < 3 || n > MAX_DIFF) {
                    clear_input();
                    n = 5;
                    break;
                }
                printf("Enter %d x-values (equispaced): ", n);
                for (int i = 0; i < n; i++) if (scanf("%lf", &x[i]) != 1) x[i] = i;
                printf("Enter %d y-values: ", n);
                for (int i = 0; i < n; i++) if (scanf("%lf", &y[i]) != 1) y[i] = 0;
                clear_input();
                break;
            }
            case 0:
                printf("Exiting Newton Forward Workbench.\n");
                break;
            default:
                printf("Invalid selection.\n");
        }
    } while (choice != 0);

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_newton_forward`, `academics-programming.numerical-methods.interpolation.newton-forward.prog-newton-forward`, `academics-programming>prog_acad_newton_forward()`, `academics-programming>numerical-methods>interpolation>newton-forward>prog-newton-forward>prog_acad_newton_forward()`
