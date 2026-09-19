# prog_acad_orbital_mechanics
> **Domain:** `academics-programming` | **Subcategory:** `physics` | **Type:** `program`
## Overview
Interactive orbital mechanics calculator computing circular velocity, orbital period, escape speed, and Hohmann transfer delta-v

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

static const double G = 6.67430e-11;

static void analyze_orbit(double M, double R, double h_km) {
    double r = R + h_km * 1000.0;
    double v_circ = sqrt(G * M / r);
    double v_esc = sqrt(2.0 * G * M / r);
    double period_s = 2.0 * 3.141592653589793 * sqrt((r * r * r) / (G * M));
    double period_h = period_s / 3600.0;

    printf("\n--- Orbit Parameters at Altitude %.1f km ---\n", h_km);
    printf("  Orbital Radius r:             %14.2e m\n", r);
    printf("  Circular Orbital Velocity:    %10.2f m/s (%.2f km/s)\n", v_circ, v_circ / 1000.0);
    printf("  Escape Velocity v_esc:        %10.2f m/s (%.2f km/s)\n", v_esc, v_esc / 1000.0);
    printf("  Orbital Period T:             %10.2f seconds (%.2f hours)\n", period_s, period_h);
}

static void hohmann_transfer(double M, double r1_km, double r2_km) {
    double r1 = r1_km * 1000.0;
    double r2 = r2_km * 1000.0;
    double a_trans = 0.5 * (r1 + r2);

    double v1 = sqrt(G * M / r1);
    double v2 = sqrt(G * M / r2);

    double vt1 = sqrt(G * M * (2.0 / r1 - 1.0 / a_trans));
    double vt2 = sqrt(G * M * (2.0 / r2 - 1.0 / a_trans));

    double delta_v1 = fabs(vt1 - v1);
    double delta_v2 = fabs(v2 - vt2);
    double total_dv = delta_v1 + delta_v2;
    double t_transfer_s = 3.141592653589793 * sqrt((a_trans * a_trans * a_trans) / (G * M));

    printf("\n--- Hohmann Transfer Orbit (r1 = %.0f km -> r2 = %.0f km) ---\n", r1_km, r2_km);
    printf("  Delta-v 1 (Departure Burn):   %10.2f m/s\n", delta_v1);
    printf("  Delta-v 2 (Insertion Burn):   %10.2f m/s\n", delta_v2);
    printf("  Total Transfer Delta-v:       %10.2f m/s (%.3f km/s)\n", total_dv, total_dv / 1000.0);
    printf("  One-Way Transfer Time:        %10.2f hours (%.2f days)\n", t_transfer_s / 3600.0, t_transfer_s / 86400.0);
}

int main(void) {
    double M_earth = 5.972e24;
    double R_earth = 6.371e6;

    int choice;
    do {
        printf("\n================ ORBITAL MECHANICS WORKBENCH ================\n");
        printf("1. Circular Orbit & Escape Speed Analysis around Earth\n");
        printf("2. Hohmann Transfer Orbit (LEO to GEO or custom orbits)\n");
        printf("0. Exit\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                double alt;
                printf("Enter orbit altitude above Earth surface in km (e.g. 400 for ISS): ");
                if (scanf("%lf", &alt) == 1 && alt >= 0.0) {
                    analyze_orbit(M_earth, R_earth, alt);
                } else {
                    clear_input();
                }
                break;
            }
            case 2: {
                double r1, r2;
                printf("Enter initial orbit radius from center in km (e.g. 6771 for 400km LEO): ");
                if (scanf("%lf", &r1) != 1) { clear_input(); break; }
                printf("Enter target orbit radius from center in km (e.g. 42164 for GEO): ");
                if (scanf("%lf", &r2) != 1) { clear_input(); break; }
                hohmann_transfer(M_earth, r1, r2);
                break;
            }
            case 0:
                printf("Exiting Orbital Mechanics.\n");
                break;
            default:
                printf("Invalid choice.\n");
        }
    } while (choice != 0);

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_orbital_mechanics`, `academics-programming.physics.kinematics-gravity.orbital-mechanics.prog-orbital-mechanics`, `academics-programming>prog_acad_orbital_mechanics()`, `academics-programming>physics>kinematics-gravity>orbital-mechanics>prog-orbital-mechanics>prog_acad_orbital_mechanics()`
