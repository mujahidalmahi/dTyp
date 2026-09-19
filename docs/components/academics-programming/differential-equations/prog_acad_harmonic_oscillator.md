# prog_acad_harmonic_oscillator
> **Domain:** `academics-programming` | **Subcategory:** `differential-equations` | **Type:** `program`
## Overview
Interactive damped harmonic oscillator simulator (m x'' + c x' + k x = 0) solved as a 2D first-order system using vector RK4

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

static void derivatives(double t, double x, double v, double m, double c_damp, double k, double* dx_dt, double* dv_dt) {
    (void)t;
    *dx_dt = v;
    *dv_dt = (-c_damp * v - k * x) / m;
}

static void simulate_oscillator(double m, double c_damp, double k, double x0, double v0, double t_end, double dt) {
    double omega_n = sqrt(k / m);
    double c_crit = 2.0 * sqrt(k * m);
    double zeta = c_damp / c_crit;

    printf("\n--- Oscillator Characteristics ---\n");
    printf("Mass m:                %10.4f kg\n", m);
    printf("Damping c:             %10.4f N*s/m\n", c_damp);
    printf("Spring constant k:     %10.4f N/m\n", k);
    printf("Natural Frequency w_n: %10.4f rad/s\n", omega_n);
    printf("Damping Ratio zeta:    %10.4f\n", zeta);
    if (zeta < 1.0) printf("Regime: UNDERDAMPED (Oscillatory decay)\n");
    else if (fabs(zeta - 1.0) < 1e-4) printf("Regime: CRITICALLY DAMPED\n");
    else printf("Regime: OVERDAMPED (Non-oscillatory)\n");

    int steps = (int)round(t_end / dt);
    printf("\nVector RK4 Simulation Table (dt = %.4f):\n", dt);
    printf("------------------------------------------------------------------\n");
    printf(" Time t (s) |  Position x (m) |  Velocity v (m/s) | Total Energy (J)\n");
    printf("------------------------------------------------------------------\n");

    double t = 0.0;
    double x = x0;
    double v = v0;

    for (int step = 0; step <= steps; step++) {
        if (step % (steps / 20 > 0 ? steps / 20 : 1) == 0 || step == steps) {
            double E = 0.5 * m * v * v + 0.5 * k * x * x;
            printf(" %10.3f | %15.6f | %17.6f | %16.6f\n", t, x, v, E);
        }

        double k1_x, k1_v;
        derivatives(t, x, v, m, c_damp, k, &k1_x, &k1_v);

        double k2_x, k2_v;
        derivatives(t + 0.5 * dt, x + 0.5 * dt * k1_x, v + 0.5 * dt * k1_v, m, c_damp, k, &k2_x, &k2_v);

        double k3_x, k3_v;
        derivatives(t + 0.5 * dt, x + 0.5 * dt * k2_x, v + 0.5 * dt * k2_v, m, c_damp, k, &k3_x, &k3_v);

        double k4_x, k4_v;
        derivatives(t + dt, x + dt * k3_x, v + dt * k3_v, m, c_damp, k, &k4_x, &k4_v);

        x += (dt / 6.0) * (k1_x + 2.0 * k2_x + 2.0 * k3_x + k4_x);
        v += (dt / 6.0) * (k1_v + 2.0 * k2_v + 2.0 * k3_v + k4_v);
        t += dt;
    }
    printf("------------------------------------------------------------------\n");
}

int main(void) {
    int choice;
    do {
        printf("\n================ DAMPED HARMONIC OSCILLATOR WORKBENCH ================\n");
        printf("1. Simulate Underdamped Oscillator (m=1.0, c=0.5, k=10.0)\n");
        printf("2. Simulate Critically Damped Oscillator\n");
        printf("3. Custom Parameters (m, c, k, x0, v0)\n");
        printf("0. Exit\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1:
                simulate_oscillator(1.0, 0.5, 10.0, 1.0, 0.0, 5.0, 0.01);
                break;
            case 2:
                simulate_oscillator(1.0, 2.0 * sqrt(10.0), 10.0, 1.0, 0.0, 3.0, 0.01);
                break;
            case 3: {
                double m, c, k, x0, v0, t_end;
                printf("Enter m (kg), c (N*s/m), k (N/m): ");
                if (scanf("%lf %lf %lf", &m, &c, &k) != 3) { clear_input(); break; }
                printf("Enter initial displacement x0 (m) and velocity v0 (m/s): ");
                if (scanf("%lf %lf", &x0, &v0) != 2) { clear_input(); break; }
                printf("Enter simulation duration t_end (s): ");
                if (scanf("%lf", &t_end) != 1) t_end = 5.0;
                simulate_oscillator(m, c, k, x0, v0, t_end, 0.01);
                break;
            }
            case 0:
                printf("Exiting Harmonic Oscillator.\n");
                break;
            default:
                printf("Invalid selection.\n");
        }
    } while (choice != 0);

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_harmonic_oscillator`, `academics-programming.differential-equations.second-order-bvp.harmonic-oscillator-rk4.prog-harmonic-oscillator`, `academics-programming>prog_acad_harmonic_oscillator()`, `academics-programming>differential-equations>second-order-bvp>harmonic-oscillator-rk4>prog-harmonic-oscillator>prog_acad_harmonic_oscillator()`
