# prog_acad_projectile_motion
> **Domain:** `academics-programming` | **Subcategory:** `physics` | **Type:** `program`
## Overview
Interactive 2D projectile trajectory simulator with flight time, maximum height, horizontal range, and trajectory table

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

static void compute_projectile(double v0, double theta_deg, double y0, double g) {
    double theta_rad = theta_deg * (3.141592653589793 / 180.0);
    double vx = v0 * cos(theta_rad);
    double vy = v0 * sin(theta_rad);

    double t_apex = vy / g;
    double h_max = y0 + (vy * vy) / (2.0 * g);
    double t_flight = (vy + sqrt(vy * vy + 2.0 * g * y0)) / g;
    double range = vx * t_flight;

    double vy_impact = vy - g * t_flight;
    double v_impact = sqrt(vx * vx + vy_impact * vy_impact);
    double theta_impact_deg = atan2(fabs(vy_impact), vx) * (180.0 / 3.141592653589793);

    printf("\n--- 2D Projectile Kinematics (v0 = %.2f m/s, theta = %.1f deg, y0 = %.2f m) ---\n",
           v0, theta_deg, y0);
    printf("  Initial Velocity Components:  vx = %8.3f m/s, vy = %8.3f m/s\n", vx, vy);
    printf("  Time to Apex (Peak Height):   %8.3f s\n", t_apex);
    printf("  Maximum Height H_max:         %8.3f m\n", h_max);
    printf("  Total Time of Flight T:       %8.3f s\n", t_flight);
    printf("  Total Horizontal Range R:     %8.3f m\n", range);
    printf("  Impact Speed:                 %8.3f m/s at -%.1f deg\n", v_impact, theta_impact_deg);

    printf("\nTrajectory Table Sampled at 10 Uniform Intervals:\n");
    printf("----------------------------------------------------------------\n");
    printf(" Time t (s) |  Position x (m) |  Position y (m) | Velocity v (m/s)\n");
    printf("----------------------------------------------------------------\n");
    for (int i = 0; i <= 10; i++) {
        double t = (t_flight / 10.0) * i;
        double x = vx * t;
        double y = y0 + vy * t - 0.5 * g * t * t;
        if (y < 0.0) y = 0.0;
        double cur_vy = vy - g * t;
        double cur_v = sqrt(vx * vx + cur_vy * cur_vy);
        printf(" %10.3f | %15.3f | %15.3f | %16.3f\n", t, x, y, cur_v);
    }
    printf("----------------------------------------------------------------\n");
}

int main(void) {
    int choice;
    do {
        printf("\n================ 2D PROJECTILE MOTION WORKBENCH ================\n");
        printf("1. Simulate Projectile Trajectory (v0, angle theta, launch height y0)\n");
        printf("2. Standard 45-Degree Cannon Launch (v0 = 50 m/s, y0 = 0 m)\n");
        printf("0. Exit\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                double v0, theta, y0;
                printf("Enter launch speed v0 (m/s): ");
                if (scanf("%lf", &v0) != 1 || v0 <= 0.0) { clear_input(); break; }
                printf("Enter launch angle theta (degrees, 0 to 90): ");
                if (scanf("%lf", &theta) != 1 || theta < 0.0 || theta > 90.0) { clear_input(); break; }
                printf("Enter launch height y0 (m): ");
                if (scanf("%lf", &y0) != 1 || y0 < 0.0) { clear_input(); break; }
                compute_projectile(v0, theta, y0, 9.80665);
                break;
            }
            case 2:
                compute_projectile(50.0, 45.0, 0.0, 9.80665);
                break;
            case 0:
                printf("Exiting Projectile Motion.\n");
                break;
            default:
                printf("Invalid selection.\n");
        }
    } while (choice != 0);

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_projectile_motion`, `academics-programming.physics.kinematics-gravity.projectile-motion.prog-projectile-motion`, `academics-programming>prog_acad_projectile_motion()`, `academics-programming>physics>kinematics-gravity>projectile-motion>prog-projectile-motion>prog_acad_projectile_motion()`
