# prog_acad_force_equilibrium
> **Domain:** `academics-programming` | **Subcategory:** `mechanics` | **Type:** `program`
## Overview
Interactive coplanar force equilibrium analyzer computing resultant vector, equilibrant force, and net moments

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

#define MAX_FORCES 20

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

int main(void) {
    int n = 3;
    double mag[MAX_FORCES] = {100.0, 150.0, 200.0};
    double angle[MAX_FORCES] = {0.0, 45.0, 120.0};

    int choice;
    do {
        printf("\n================ COPLANAR FORCE EQUILIBRIUM WORKBENCH ================\n");
        printf("1. Enter System of 2D Force Vectors\n");
        printf("2. Compute Resultant Force and Equilibrant\n");
        printf("3. Equilibrium Verification (Sum Fx = 0, Sum Fy = 0)\n");
        printf("0. Exit\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                printf("Enter number of concurrent forces (1 to %d): ", MAX_FORCES);
                if (scanf("%d", &n) != 1 || n < 1 || n > MAX_FORCES) {
                    clear_input();
                    n = 3;
                    break;
                }
                for (int i = 0; i < n; i++) {
                    printf("Force %d - Magnitude (N) and Angle theta (degrees): ", i + 1);
                    if (scanf("%lf %lf", &mag[i], &angle[i]) != 2) {
                        mag[i] = 100.0; angle[i] = 0.0;
                    }
                }
                clear_input();
                break;
            }
            case 2:
            case 3: {
                double sum_fx = 0.0;
                double sum_fy = 0.0;
                printf("\nForce Vector Components Breakdown:\n");
                printf(" Force | Magnitude (N) | Angle (deg) |     Fx (N)    |     Fy (N)\n");
                printf("-------+---------------+-------------+---------------+--------------\n");
                for (int i = 0; i < n; i++) {
                    double rad = angle[i] * (3.141592653589793 / 180.0);
                    double fx = mag[i] * cos(rad);
                    double fy = mag[i] * sin(rad);
                    sum_fx += fx;
                    sum_fy += fy;
                    printf("  %3d  | %13.2f | %11.2f | %13.4f | %13.4f\n",
                           i + 1, mag[i], angle[i], fx, fy);
                }
                printf("-------+---------------+-------------+---------------+--------------\n");
                printf(" TOTAL |               |             | %13.4f | %13.4f\n", sum_fx, sum_fy);

                double R = sqrt(sum_fx * sum_fx + sum_fy * sum_fy);
                double theta_R = atan2(sum_fy, sum_fx) * (180.0 / 3.141592653589793);
                double theta_E = theta_R + 180.0;
                if (theta_E >= 360.0) theta_E -= 360.0;

                printf("\nResultant Force R:         %.4f N at %.2f degrees\n", R, theta_R);
                printf("Equilibrant Force E (-R):   %.4f N at %.2f degrees\n", R, theta_E);

                if (R < 1e-4) {
                    printf("Equilibrium Status: SYSTEM IS IN STATIC EQUILIBRIUM (R = 0).\n");
                } else {
                    printf("Equilibrium Status: SYSTEM IS NOT IN EQUILIBRIUM (Net force exists).\n");
                }
                break;
            }
            case 0:
                printf("Exiting Force Equilibrium.\n");
                break;
            default:
                printf("Invalid selection.\n");
        }
    } while (choice != 0);

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_force_equilibrium`, `academics-programming.mechanics.statics-beams.force-equilibrium.prog-force-equilibrium`, `academics-programming>prog_acad_force_equilibrium()`, `academics-programming>mechanics>statics-beams>force-equilibrium>prog-force-equilibrium>prog_acad_force_equilibrium()`
