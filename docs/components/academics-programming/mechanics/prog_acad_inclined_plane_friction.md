# prog_acad_inclined_plane_friction
> **Domain:** `academics-programming` | **Subcategory:** `mechanics` | **Type:** `program`
## Overview
Interactive inclined plane simulator evaluating normal force, static friction, angle of repose, and acceleration

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

static const double G = 9.80665;

int main(void) {
    int choice;
    do {
        printf("\n================ INCLINED PLANE FRICTION WORKBENCH ================\n");
        printf("1. Analyze Motion on Incline (Mass m, angle theta, mu_s, mu_k)\n");
        printf("2. Compute Angle of Repose\n");
        printf("0. Exit\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                double m, theta_deg, mu_s, mu_k;
                printf("Enter mass m (kg), incline angle theta (deg), static mu_s, kinetic mu_k: ");
                if (scanf("%lf %lf %lf %lf", &m, &theta_deg, &mu_s, &mu_k) != 4 || m <= 0) {
                    clear_input();
                    break;
                }
                double rad = theta_deg * (3.141592653589793 / 180.0);
                double N = m * G * cos(rad);
                double W_parallel = m * G * sin(rad);
                double fs_max = mu_s * N;

                printf("\n--- Incline Analysis ---\n");
                printf("  Normal Force N:               %10.3f N\n", N);
                printf("  Parallel Downslope Force W||: %10.3f N\n", W_parallel);
                printf("  Max Static Friction fs_max:   %10.3f N\n", fs_max);

                if (W_parallel <= fs_max) {
                    printf("  Motion State: AT REST (Static friction holds the block).\n");
                    printf("  Friction force in action:     %10.3f N\n", W_parallel);
                } else {
                    double fk = mu_k * N;
                    double F_net = W_parallel - fk;
                    double a = F_net / m;
                    printf("  Motion State: SLIDING DOWNHILL\n");
                    printf("  Kinetic Friction fk:          %10.3f N\n", fk);
                    printf("  Net Downhill Force:           %10.3f N\n", F_net);
                    printf("  Downhill Acceleration:        %10.3f m/s^2\n", a);
                }
                break;
            }
            case 2: {
                double mu_s;
                printf("Enter static coefficient of friction mu_s: ");
                if (scanf("%lf", &mu_s) == 1 && mu_s > 0) {
                    double theta_c_rad = atan(mu_s);
                    double theta_c_deg = theta_c_rad * (180.0 / 3.141592653589793);
                    printf("Angle of Repose theta_c = arctan(mu_s) = %.2f degrees (%.4f rad)\n",
                           theta_c_deg, theta_c_rad);
                } else { clear_input(); }
                break;
            }
            case 0:
                printf("Exiting Incline Workbench.\n");
                break;
            default:
                printf("Invalid selection.\n");
        }
    } while (choice != 0);

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_inclined_plane_friction`, `academics-programming.mechanics.dynamics-collisions.inclined-plane-friction.prog-inclined-plane-friction`, `academics-programming>prog_acad_inclined_plane_friction()`, `academics-programming>mechanics>dynamics-collisions>inclined-plane-friction>prog-inclined-plane-friction>prog_acad_inclined_plane_friction()`
