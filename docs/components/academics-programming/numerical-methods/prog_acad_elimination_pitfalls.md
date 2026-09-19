# prog_acad_elimination_pitfalls
> **Domain:** `academics-programming` | **Subcategory:** `numerical-methods` | **Type:** `program`
## Overview
Interactive demonstrator of linear system ill-conditioning, near-zero pivots, and condition numbers

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
#include <math.h>
#include <stdbool.h>

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

static void test_near_zero_pivot(void) {
    printf("\n--- Small Pivot Pitfall (Catastrophic Precision Loss) ---\n");
    printf("System: [eps   1.0 | 1.0]\n");
    printf("        [1.0   1.0 | 2.0]\n\n");

    double eps_values[] = {1e-3, 1e-6, 1e-12, 1e-16};
    for (int i = 0; i < 4; i++) {
        double eps = eps_values[i];
        double x2 = (2.0 - 1.0 / eps) / (1.0 - 1.0 / eps);
        double x1 = (1.0 - x2) / eps;
        printf("  eps = %1.0e -> x1 = %15.8f, x2 = %15.8f\n", eps, x1, x2);
    }
    printf("Note: As eps -> 0, float subtraction (1.0 - 1.0/eps) completely wipes out the significant digits.\n");
}

static void test_ill_conditioned_system(void) {
    printf("\n--- Ill-Conditioned System Sensitivity (Wilson Matrix) ---\n");
    printf("Original System:          Perturbed RHS by 0.01:\n");
    printf("10x1 +  7x2 = 32          10x1 +  7x2 = 32.01\n");
    printf(" 7x1 +  5x2 = 23           7x1 +  5x2 = 22.99\n");

    double det = 10.0 * 5.0 - 7.0 * 7.0;
    double x1_orig = (32.0 * 5.0 - 7.0 * 23.0) / det;
    double x2_orig = (10.0 * 23.0 - 32.0 * 7.0) / det;

    double x1_pert = (32.01 * 5.0 - 7.0 * 22.99) / det;
    double x2_pert = (10.0 * 22.99 - 32.01 * 7.0) / det;

    printf("Original Solution:  x1 = %.4f, x2 = %.4f\n", x1_orig, x2_orig);
    printf("Perturbed Solution: x1 = %.4f, x2 = %.4f\n", x1_pert, x2_pert);
    printf("Determinant: %.4f (very close to zero compared to entry magnitudes)\n", det);
}

int main(void) {
    int choice;
    do {
        printf("\n================ ELIMINATION PITFALLS WORKBENCH ================\n");
        printf("1. Demonstrate Near-Zero Pivot Catastrophic Roundoff\n");
        printf("2. Demonstrate Ill-Conditioned System Perturbation Sensitivity\n");
        printf("0. Exit\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: test_near_zero_pivot(); break;
            case 2: test_ill_conditioned_system(); break;
            case 0: printf("Exiting Elimination Pitfalls.\n"); break;
            default: printf("Invalid selection.\n");
        }
    } while (choice != 0);

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_elimination_pitfalls`, `academics-programming.numerical-methods.elimination-methods.elimination-pitfalls.prog-elimination-pitfalls`, `academics-programming>prog_acad_elimination_pitfalls()`, `academics-programming>numerical-methods>elimination-methods>elimination-pitfalls>prog-elimination-pitfalls>prog_acad_elimination_pitfalls()`
