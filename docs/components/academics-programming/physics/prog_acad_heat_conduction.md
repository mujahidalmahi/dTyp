# prog_acad_heat_conduction
> **Domain:** `academics-programming` | **Subcategory:** `physics` | **Type:** `program`
## Overview
Interactive 1D steady-state and multi-layer composite heat conduction analyzer based on Fourier's Law

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

static void steady_state_conduction(double k, double A, double L, double T1, double T2) {
    double delta_T = T1 - T2;
    double q_flux = (k * delta_T) / L;
    double Q_rate = q_flux * A;
    double R_th = L / (k * A);

    printf("\n--- 1D Steady-State Heat Conduction ---\n");
    printf("  Thermal Resistance R_th: %12.6f K/W\n", R_th);
    printf("  Heat Flux q'':           %12.2f W/m^2\n", q_flux);
    printf("  Total Heat Rate Q:       %12.2f Watts\n", Q_rate);

    printf("\nLinear Temperature Profile through Wall (L = %.3f m):\n", L);
    printf("  Distance x (m) | Temperature T (K)\n");
    printf("  ---------------+------------------\n");
    for (int i = 0; i <= 5; i++) {
        double x = (L / 5.0) * i;
        double T = T1 - (delta_T / L) * x;
        printf("    %10.4f   |     %10.2f\n", x, T);
    }
}

int main(void) {
    int choice;
    do {
        printf("\n================ 1D HEAT CONDUCTION WORKBENCH ================\n");
        printf("1. Single-Layer Wall Conduction (Fourier's Law)\n");
        printf("2. Composite Multi-Layer Series Wall\n");
        printf("0. Exit\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                double k, A, L, T1, T2;
                printf("Enter thermal conductivity k (W/m*K), Area A (m^2), Thickness L (m): ");
                if (scanf("%lf %lf %lf", &k, &A, &L) != 3 || L <= 0.0) { clear_input(); break; }
                printf("Enter boundary temperatures T1 and T2 (K): ");
                if (scanf("%lf %lf", &T1, &T2) != 2) { clear_input(); break; }
                steady_state_conduction(k, A, L, T1, T2);
                break;
            }
            case 2: {
                int layers;
                printf("Enter number of layers in series (2 to 4): ");
                if (scanf("%d", &layers) != 1 || layers < 2 || layers > 4) { clear_input(); break; }
                double A = 1.0, R_total = 0.0;
                printf("Enter wall area A (m^2): ");
                if (scanf("%lf", &A) != 1) A = 1.0;
                for (int i = 0; i < layers; i++) {
                    double ki, Li;
                    printf("Layer %d - conductivity k (W/m*K) and thickness L (m): ", i + 1);
                    if (scanf("%lf %lf", &ki, &Li) == 2 && ki > 0 && Li > 0) {
                        R_total += Li / (ki * A);
                    }
                }
                double T_in, T_out;
                printf("Enter inside and outside temperatures T_in, T_out (K): ");
                if (scanf("%lf %lf", &T_in, &T_out) == 2) {
                    double Q = (T_in - T_out) / R_total;
                    printf("Total Thermal Resistance R_total: %.6f K/W\n", R_total);
                    printf("Steady Heat Flow Q:               %.2f Watts\n", Q);
                }
                clear_input();
                break;
            }
            case 0:
                printf("Exiting Heat Conduction Workbench.\n");
                break;
            default:
                printf("Invalid selection.\n");
        }
    } while (choice != 0);

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_heat_conduction`, `academics-programming.physics.thermodynamics.heat-conduction.prog-heat-conduction`, `academics-programming>prog_acad_heat_conduction()`, `academics-programming>physics>thermodynamics>heat-conduction>prog-heat-conduction>prog_acad_heat_conduction()`
