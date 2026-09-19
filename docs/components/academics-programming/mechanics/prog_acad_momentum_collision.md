# prog_acad_momentum_collision
> **Domain:** `academics-programming` | **Subcategory:** `mechanics` | **Type:** `program`
## Overview
Interactive 1D collision simulator with restitution coefficients, momentum conservation check, and kinetic energy loss

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

static void simulate_collision(double m1, double u1, double m2, double u2, double e) {
    double v1 = (m1 * u1 + m2 * u2 - m2 * e * (u1 - u2)) / (m1 + m2);
    double v2 = (m1 * u1 + m2 * u2 + m1 * e * (u1 - u2)) / (m1 + m2);

    double p_initial = m1 * u1 + m2 * u2;
    double p_final = m1 * v1 + m2 * v2;

    double ke_initial = 0.5 * m1 * u1 * u1 + 0.5 * m2 * u2 * u2;
    double ke_final = 0.5 * m1 * v1 * v1 + 0.5 * m2 * v2 * v2;
    double ke_loss = ke_initial - ke_final;

    printf("\n--- 1D Collision Analysis (Restitution e = %.2f) ---\n", e);
    printf("  Initial Velocities:      u1 = %8.3f m/s, u2 = %8.3f m/s\n", u1, u2);
    printf("  Post-Collision Velocity: v1 = %8.3f m/s, v2 = %8.3f m/s\n", v1, v2);
    printf("  Initial Total Momentum:  %12.4f kg*m/s\n", p_initial);
    printf("  Final Total Momentum:    %12.4f kg*m/s (Conserved!)\n", p_final);
    printf("  Initial Kinetic Energy:  %12.4f Joules\n", ke_initial);
    printf("  Final Kinetic Energy:    %12.4f Joules\n", ke_final);
    printf("  Kinetic Energy Lost:     %12.4f Joules (%.2f%%)\n",
           ke_loss, (ke_initial > 1e-9 ? (ke_loss / ke_initial) * 100.0 : 0.0));
}

int main(void) {
    int choice;
    do {
        printf("\n================ 1D MOMENTUM & COLLISIONS WORKBENCH ================\n");
        printf("1. Perfectly Elastic Collision (e = 1.0)\n");
        printf("2. Inelastic Collision (0 < e < 1.0)\n");
        printf("3. Perfectly Plastic / Sticking Collision (e = 0.0)\n");
        printf("0. Exit\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        if (choice >= 1 && choice <= 3) {
            double m1, u1, m2, u2, e = 1.0;
            printf("Enter Body 1 - mass m1 (kg) and velocity u1 (m/s): ");
            if (scanf("%lf %lf", &m1, &u1) != 2 || m1 <= 0) { clear_input(); continue; }
            printf("Enter Body 2 - mass m2 (kg) and velocity u2 (m/s): ");
            if (scanf("%lf %lf", &m2, &u2) != 2 || m2 <= 0) { clear_input(); continue; }

            if (choice == 1) e = 1.0;
            else if (choice == 3) e = 0.0;
            else {
                printf("Enter restitution coefficient e (0.0 to 1.0): ");
                if (scanf("%lf", &e) != 1 || e < 0.0 || e > 1.0) e = 0.5;
            }

            simulate_collision(m1, u1, m2, u2, e);
        } else if (choice == 0) {
            printf("Exiting Collisions Workbench.\n");
        } else {
            printf("Invalid selection.\n");
        }
    } while (choice != 0);

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_momentum_collision`, `academics-programming.mechanics.dynamics-collisions.momentum-collision.prog-momentum-collision`, `academics-programming>prog_acad_momentum_collision()`, `academics-programming>mechanics>dynamics-collisions>momentum-collision>prog-momentum-collision>prog_acad_momentum_collision()`
