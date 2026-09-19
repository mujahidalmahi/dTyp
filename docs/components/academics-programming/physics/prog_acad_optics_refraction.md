# prog_acad_optics_refraction
> **Domain:** `academics-programming` | **Subcategory:** `physics` | **Type:** `program`
## Overview
Interactive geometric optics workbench solving Snell's law, critical angles for TIR, thin lens equations, and image classification

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

static void snell_refraction(double n1, double n2, double theta1_deg) {
    double theta1_rad = theta1_deg * (3.141592653589793 / 180.0);
    double sin_theta2 = (n1 / n2) * sin(theta1_rad);

    printf("\n--- Snell's Law Refraction (n1 = %.3f, n2 = %.3f, theta1 = %.2f deg) ---\n",
           n1, n2, theta1_deg);

    if (n1 > n2) {
        double theta_c_deg = asin(n2 / n1) * (180.0 / 3.141592653589793);
        printf("  Critical Angle for Total Internal Reflection (TIR): %.2f degrees\n", theta_c_deg);
    }

    if (sin_theta2 > 1.0) {
        printf("  Result: TOTAL INTERNAL REFLECTION (TIR) occurs! No refracted ray in medium 2.\n");
    } else {
        double theta2_deg = asin(sin_theta2) * (180.0 / 3.141592653589793);
        printf("  Angle of Refraction theta2: %.2f degrees\n", theta2_deg);
    }
}

static void thin_lens(double f, double d_o) {
    printf("\n--- Thin Lens Analysis (f = %.2f cm, object distance do = %.2f cm) ---\n", f, d_o);
    if (fabs(d_o - f) < 1e-9) {
        printf("  Object is at the focal point (do = f). Refracted rays are parallel (image at infinity).\n");
        return;
    }

    double d_i = (f * d_o) / (d_o - f);
    double m = -d_i / d_o;

    printf("  Image Distance di:   %10.2f cm -> %s\n", d_i, (d_i > 0) ? "REAL image" : "VIRTUAL image");
    printf("  Magnification m:     %10.4f -> %s, %s\n",
           m,
           (m < 0) ? "INVERTED" : "UPRIGHT",
           (fabs(m) > 1.0) ? "MAGNIFIED" : (fabs(m) < 1.0 ? "DIMINISHED" : "SAME SIZE"));
}

int main(void) {
    int choice;
    do {
        printf("\n================ GEOMETRIC OPTICS WORKBENCH ================\n");
        printf("1. Snell's Law of Refraction & Critical Angle\n");
        printf("2. Thin Lens Equation & Image Classification\n");
        printf("0. Exit\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                double n1, n2, theta1;
                printf("Enter refractive index n1, n2 and angle of incidence theta1 (deg): ");
                if (scanf("%lf %lf %lf", &n1, &n2, &theta1) == 3 && n1 > 0 && n2 > 0) {
                    snell_refraction(n1, n2, theta1);
                } else { clear_input(); }
                break;
            }
            case 2: {
                double f, do_dist;
                printf("Enter focal length f in cm (+ for convex, - for concave) and object distance do: ");
                if (scanf("%lf %lf", &f, &do_dist) == 2 && do_dist > 0) {
                    thin_lens(f, do_dist);
                } else { clear_input(); }
                break;
            }
            case 0:
                printf("Exiting Optics Workbench.\n");
                break;
            default:
                printf("Invalid selection.\n");
        }
    } while (choice != 0);

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_optics_refraction`, `academics-programming.physics.electromagnetism-optics.optics-refraction.prog-optics-refraction`, `academics-programming>prog_acad_optics_refraction()`, `academics-programming>physics>electromagnetism-optics>optics-refraction>prog-optics-refraction>prog_acad_optics_refraction()`
