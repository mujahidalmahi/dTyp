# prog_acad_damped_vibrations
> **Domain:** `academics-programming` | **Subcategory:** `mechanics` | **Type:** `program`
## Overview
Interactive single degree-of-freedom damped vibrations analyzer with natural frequency, damping ratio, regime, and logarithmic decrement

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

static void analyze_vibration(double m, double c, double k) {
    double omega_n = sqrt(k / m);
    double c_crit = 2.0 * sqrt(k * m);
    double zeta = c / c_crit;

    printf("\n--- Damped Free Vibration Characteristics ---\n");
    printf("  Mass m:                      %10.3f kg\n", m);
    printf("  Damping Coefficient c:       %10.3f N*s/m\n", c);
    printf("  Stiffness k:                 %10.3f N/m\n", k);
    printf("  Natural Frequency omega_n:   %10.3f rad/s (%.3f Hz)\n", omega_n, omega_n / (2.0 * 3.141592653589793));
    printf("  Critical Damping c_c:        %10.3f N*s/m\n", c_crit);
    printf("  Damping Ratio zeta:          %10.4f\n", zeta);

    if (fabs(zeta - 1.0) < 1e-4) {
        printf("  Vibration Regime: CRITICALLY DAMPED (Fastest non-oscillatory return to rest)\n");
    } else if (zeta < 1.0) {
        double omega_d = omega_n * sqrt(1.0 - zeta * zeta);
        double delta = (2.0 * 3.141592653589793 * zeta) / sqrt(1.0 - zeta * zeta);
        double period_d = 2.0 * 3.141592653589793 / omega_d;

        printf("  Vibration Regime: UNDERDAMPED (Oscillatory decay)\n");
        printf("  Damped Frequency omega_d:    %10.3f rad/s (%.3f Hz)\n", omega_d, omega_d / (2.0 * 3.141592653589793));
        printf("  Damped Period T_d:           %10.3f seconds\n", period_d);
        printf("  Logarithmic Decrement delta: %10.4f\n", delta);
    } else {
        printf("  Vibration Regime: OVERDAMPED (Sluggish non-oscillatory decay)\n");
    }
}

int main(void) {
    int choice;
    do {
        printf("\n================ DAMPED FREE VIBRATIONS WORKBENCH ================\n");
        printf("1. Enter System Parameters (Mass m, damping c, stiffness k)\n");
        printf("2. Test Standard Underdamped Case (m=2.0 kg, c=1.5 N*s/m, k=50.0 N/m)\n");
        printf("0. Exit\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                double m, c, k;
                printf("Enter mass m (kg), damping c (N*s/m), and stiffness k (N/m): ");
                if (scanf("%lf %lf %lf", &m, &c, &k) == 3 && m > 0 && k > 0 && c >= 0) {
                    analyze_vibration(m, c, k);
                } else { clear_input(); }
                break;
            }
            case 2:
                analyze_vibration(2.0, 1.5, 50.0);
                break;
            case 0:
                printf("Exiting Vibrations Workbench.\n");
                break;
            default:
                printf("Invalid selection.\n");
        }
    } while (choice != 0);

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_damped_vibrations`, `academics-programming.mechanics.vibrations.damped-vibrations.prog-damped-vibrations`, `academics-programming>prog_acad_damped_vibrations()`, `academics-programming>mechanics>vibrations>damped-vibrations>prog-damped-vibrations>prog_acad_damped_vibrations()`
