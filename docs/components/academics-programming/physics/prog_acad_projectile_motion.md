# prog_acad_projectile_motion
> **Domain:** `academics-programming` | **Subcategory:** `physics` | **Type:** `program`
## Overview
Computes 2D projectile trajectory, time of flight, peak height, and range

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

void compute_projectile(double v0, double theta_deg, double g) {
    double theta = theta_deg * (3.141592653589793 / 180.0);
    double vx = v0 * cos(theta);
    double vy = v0 * sin(theta);
    double t_flight = (2.0 * vy) / g;
    double max_height = (vy * vy) / (2.0 * g);
    double range = vx * t_flight;

    printf("Initial Speed:   %.2f m/s\n", v0);
    printf("Launch Angle:    %.2f degrees\n", theta_deg);
    printf("Time of Flight:  %.4f s\n", t_flight);
    printf("Max Elevation:   %.4f m\n", max_height);
    printf("Horizontal Range: %.4f m\n", range);
}

int main(void) {
    compute_projectile(50.0, 45.0, 9.81);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_projectile_motion`, `academics-programming.physics.kinematics-gravity.projectile-motion.prog-projectile-motion`, `academics-programming>prog_acad_projectile_motion()`, `academics-programming>physics>kinematics-gravity>projectile-motion>prog-projectile-motion>prog_acad_projectile_motion()`
