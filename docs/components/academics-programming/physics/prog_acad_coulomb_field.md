# prog_acad_coulomb_field
> **Domain:** `academics-programming` | **Subcategory:** `physics` | **Type:** `program`
## Overview
Interactive multi-charge electrostatic field and potential calculator with Coulomb force vectors

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

#define MAX_CHARGES 20

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

static const double K_COULOMB = 8.98755e9;

static void evaluate_field(int n, const double q[], const double x[], const double y[], double qx, double qy) {
    double Ex = 0.0, Ey = 0.0;
    double V = 0.0;

    for (int i = 0; i < n; i++) {
        double dx = qx - x[i];
        double dy = qy - y[i];
        double r = sqrt(dx * dx + dy * dy);
        if (r < 1e-9) {
            printf("Warning: Query point coincides with Charge %d (r = 0, singularity).\n", i + 1);
            continue;
        }
        double r3 = r * r * r;
        Ex += (K_COULOMB * q[i] * dx) / r3;
        Ey += (K_COULOMB * q[i] * dy) / r3;
        V += (K_COULOMB * q[i]) / r;
    }

    double E_mag = sqrt(Ex * Ex + Ey * Ey);
    double E_angle = atan2(Ey, Ex) * (180.0 / 3.141592653589793);

    printf("\nElectrostatic Field at (%.4f, %.4f):\n", qx, qy);
    printf("  Electric Field Vector E:       (%12.4e, %12.4e) N/C\n", Ex, Ey);
    printf("  Field Magnitude ||E||:         %12.4e N/C\n", E_mag);
    printf("  Direction Angle:               %12.2f degrees\n", E_angle);
    printf("  Electric Potential V:          %12.4e Volts (J/C)\n", V);
}

int main(void) {
    int n = 2;
    double q[MAX_CHARGES] = {1e-6, -1e-6};
    double x[MAX_CHARGES] = {-0.05, 0.05};
    double y[MAX_CHARGES] = {0.0, 0.0};

    int choice;
    do {
        printf("\n================ COULOMB ELECTRIC FIELD & POTENTIAL ================\n");
        printf("1. Enter System of Point Charges\n");
        printf("2. Evaluate Electric Field and Potential at Query Point (x, y)\n");
        printf("3. Load Standard Electric Dipole (+1 uC at -5cm, -1 uC at +5cm)\n");
        printf("0. Exit\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                printf("Enter number of point charges N (1 to %d): ", MAX_CHARGES);
                if (scanf("%d", &n) != 1 || n < 1 || n > MAX_CHARGES) {
                    clear_input();
                    n = 2;
                    break;
                }
                for (int i = 0; i < n; i++) {
                    printf("Charge %d - value q (Coulombs) and coordinates (x y in meters): ", i + 1);
                    if (scanf("%lf %lf %lf", &q[i], &x[i], &y[i]) != 3) {
                        q[i] = 1e-6; x[i] = 0; y[i] = 0;
                    }
                }
                clear_input();
                break;
            }
            case 2: {
                double qx, qy;
                printf("Enter query point (x y in meters): ");
                if (scanf("%lf %lf", &qx, &qy) == 2) {
                    evaluate_field(n, q, x, y, qx, qy);
                } else {
                    clear_input();
                }
                break;
            }
            case 3:
                n = 2;
                q[0] = 1e-6;  x[0] = -0.05; y[0] = 0.0;
                q[1] = -1e-6; x[1] = 0.05;  y[1] = 0.0;
                printf("Loaded electric dipole configuration.\n");
                break;
            case 0:
                printf("Exiting Coulomb Workbench.\n");
                break;
            default:
                printf("Invalid choice.\n");
        }
    } while (choice != 0);

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_coulomb_field`, `academics-programming.physics.electromagnetism-optics.coulomb-field.prog-coulomb-field`, `academics-programming>prog_acad_coulomb_field()`, `academics-programming>physics>electromagnetism-optics>coulomb-field>prog-coulomb-field>prog_acad_coulomb_field()`
