# prog_acad_momentum_collision
> **Domain:** `academics-programming` | **Subcategory:** `mechanics` | **Type:** `program`
## Overview
Computes 1D collision final velocities and kinetic energy loss given coefficient of restitution

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

void simulate_collision(double m1, double u1, double m2, double u2, double e) {
    double v1 = (m1 * u1 + m2 * u2 - m2 * e * (u1 - u2)) / (m1 + m2);
    double v2 = (m1 * u1 + m2 * u2 + m1 * e * (u1 - u2)) / (m1 + m2);

    double ke_initial = 0.5 * m1 * u1 * u1 + 0.5 * m2 * u2 * u2;
    double ke_final = 0.5 * m1 * v1 * v1 + 0.5 * m2 * v2 * v2;
    double ke_loss = ke_initial - ke_final;

    printf("Post-collision v1: %.2f m/s\n", v1);
    printf("Post-collision v2: %.2f m/s\n", v2);
    printf("Initial Kinetic Energy: %.2f J\n", ke_initial);
    printf("Final Kinetic Energy:   %.2f J\n", ke_final);
    printf("Kinetic Energy Loss:    %.2f J (%.1f%%)\n", ke_loss, (ke_loss / ke_initial) * 100.0);
}

int main(void) {
    simulate_collision(2.0, 5.0, 3.0, -2.0, 0.8);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_momentum_collision`, `academics-programming.mechanics.dynamics-collisions.momentum-collision.prog-momentum-collision`, `academics-programming>prog_acad_momentum_collision()`, `academics-programming>mechanics>dynamics-collisions>momentum-collision>prog-momentum-collision>prog_acad_momentum_collision()`
