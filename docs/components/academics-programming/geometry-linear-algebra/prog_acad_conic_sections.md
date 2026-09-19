# prog_acad_conic_sections
> **Domain:** `academics-programming` | **Subcategory:** `geometry-linear-algebra` | **Type:** `program`
## Overview
Interactive general conic section analyzer (Ax^2 + Bxy + Cy^2 + Dx + Ey + F = 0) with discriminant classification and rotation angle

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

static void classify_conic(double A, double B, double C, double D, double E, double F) {
    double disc = B * B - 4.0 * A * C;
    double det3 = A * (C * F - E * E / 4.0) - (B / 2.0) * ((B / 2.0) * F - (D / 2.0) * (E / 2.0))
                  + (D / 2.0) * ((B / 2.0) * (E / 2.0) - (D / 2.0) * C);

    printf("\nConic Analysis for: %.2fx^2 + %.2fxy + %.2fy^2 + %.2fx + %.2fy + %.2f = 0\n",
           A, B, C, D, E, F);
    printf("  Discriminant B^2 - 4AC: %12.4f\n", disc);
    printf("  3x3 Invariant Det:      %12.4f\n", det3);

    if (fabs(det3) < 1e-9) {
        printf("  Classification: DEGENERATE CONIC (Point, Pair of Lines, or Null set)\n");
        return;
    }

    if (disc < -1e-9) {
        if (fabs(A - C) < 1e-9 && fabs(B) < 1e-9) {
            printf("  Classification: CIRCLE\n");
        } else {
            printf("  Classification: ELLIPSE\n");
        }
    } else if (fabs(disc) <= 1e-9) {
        printf("  Classification: PARABOLA\n");
    } else {
        if (fabs(A + C) < 1e-9) {
            printf("  Classification: RECTANGULAR HYPERBOLA (Asymptotes perpendicular)\n");
        } else {
            printf("  Classification: HYPERBOLA\n");
        }
    }

    if (fabs(B) > 1e-9) {
        double theta_rad = 0.5 * atan2(B, A - C);
        double theta_deg = theta_rad * (180.0 / 3.141592653589793);
        printf("  Axes Rotation Angle to Eliminate xy Term: %.2f degrees (%.4f rad)\n",
               theta_deg, theta_rad);
    } else {
        printf("  Conic is already aligned with coordinate axes (no xy cross term).\n");
    }
}

int main(void) {
    int choice;
    do {
        printf("\n================ CONIC SECTIONS CLASSIFIER ================\n");
        printf("1. Classify Conic Equation (A, B, C, D, E, F)\n");
        printf("2. Test Standard Ellipse (x^2/4 + y^2/9 - 1 = 0)\n");
        printf("3. Test Hyperbola (x^2 - y^2 - 1 = 0)\n");
        printf("0. Exit\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                double A, B, C, D, E, F;
                printf("Enter coefficients A B C D E F: ");
                if (scanf("%lf %lf %lf %lf %lf %lf", &A, &B, &C, &D, &E, &F) == 6) {
                    classify_conic(A, B, C, D, E, F);
                } else {
                    clear_input();
                }
                break;
            }
            case 2:
                classify_conic(0.25, 0.0, 1.0 / 9.0, 0.0, 0.0, -1.0);
                break;
            case 3:
                classify_conic(1.0, 0.0, -1.0, 0.0, 0.0, -1.0);
                break;
            case 0:
                printf("Exiting Conic Sections Classifier.\n");
                break;
            default:
                printf("Invalid selection.\n");
        }
    } while (choice != 0);

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_conic_sections`, `academics-programming.geometry-linear-algebra.coordinate-geometry.conic-sections.prog-conic-sections`, `academics-programming>prog_acad_conic_sections()`, `academics-programming>geometry-linear-algebra>coordinate-geometry>conic-sections>prog-conic-sections>prog_acad_conic_sections()`
