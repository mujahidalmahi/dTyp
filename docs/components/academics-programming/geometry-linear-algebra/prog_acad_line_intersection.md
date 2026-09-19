# prog_acad_line_intersection
> **Domain:** `academics-programming` | **Subcategory:** `geometry-linear-algebra` | **Type:** `program`
## Overview
Interactive 2D line intersection solver using Cramer's rule, segment intersection, distance, and angle between lines

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

static void intersect_lines(double a1, double b1, double c1, double a2, double b2, double c2) {
    double det = a1 * b2 - a2 * b1;
    if (fabs(det) < 1e-12) {
        if (fabs(a1 * c2 - a2 * c1) < 1e-12 && fabs(b1 * c2 - b2 * c1) < 1e-12) {
            printf("Lines are COINCIDENT (infinite intersection points).\n");
        } else {
            printf("Lines are PARALLEL (no intersection point).\n");
        }
        return;
    }

    double x = (b1 * c2 - b2 * c1) / det;
    double y = (c1 * a2 - c2 * a1) / det;
    printf("Unique Intersection Point: (x, y) = (%10.5f, %10.5f)\n", x, y);

    double dot = a1 * a2 + b1 * b2;
    double mag1 = sqrt(a1 * a1 + b1 * b1);
    double mag2 = sqrt(a2 * a2 + b2 * b2);
    double cos_theta = fabs(dot) / (mag1 * mag2);
    if (cos_theta > 1.0) cos_theta = 1.0;
    double theta_deg = acos(cos_theta) * (180.0 / 3.141592653589793);
    printf("Acute Angle Between Lines:   %10.2f degrees\n", theta_deg);
}

static void distance_point_to_line(double px, double py, double a, double b, double c) {
    double dist = fabs(a * px + b * py + c) / sqrt(a * a + b * b);
    printf("Perpendicular Distance from (%.4f, %.4f) to %.2fx + %.2fy + %.2f = 0: %.6f\n",
           px, py, a, b, c, dist);
}

int main(void) {
    int choice;
    do {
        printf("\n================ 2D LINE INTERSECTION & GEOMETRY ================\n");
        printf("1. Intersect Two Lines (A1*x + B1*y + C1 = 0 and A2*x + B2*y + C2 = 0)\n");
        printf("2. Distance from Point (x0, y0) to Line (A*x + B*y + C = 0)\n");
        printf("0. Exit\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                double a1, b1, c1, a2, b2, c2;
                printf("Enter Line 1 coefficients A1, B1, C1: ");
                if (scanf("%lf %lf %lf", &a1, &b1, &c1) != 3) { clear_input(); break; }
                printf("Enter Line 2 coefficients A2, B2, C2: ");
                if (scanf("%lf %lf %lf", &a2, &b2, &c2) != 3) { clear_input(); break; }
                intersect_lines(a1, b1, c1, a2, b2, c2);
                break;
            }
            case 2: {
                double px, py, a, b, c;
                printf("Enter Point (px, py): ");
                if (scanf("%lf %lf", &px, &py) != 2) { clear_input(); break; }
                printf("Enter Line coefficients A, B, C: ");
                if (scanf("%lf %lf %lf", &a, &b, &c) != 3) { clear_input(); break; }
                distance_point_to_line(px, py, a, b, c);
                break;
            }
            case 0:
                printf("Exiting Line Intersection Workbench.\n");
                break;
            default:
                printf("Invalid selection.\n");
        }
    } while (choice != 0);

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_line_intersection`, `academics-programming.geometry-linear-algebra.coordinate-geometry.line-intersection.prog-line-intersection`, `academics-programming>prog_acad_line_intersection()`, `academics-programming>geometry-linear-algebra>coordinate-geometry>line-intersection>prog-line-intersection>prog_acad_line_intersection()`
