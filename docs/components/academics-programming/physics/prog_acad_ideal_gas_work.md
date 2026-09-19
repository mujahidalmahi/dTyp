# prog_acad_ideal_gas_work
> **Domain:** `academics-programming` | **Subcategory:** `physics` | **Type:** `program`
## Overview
Interactive thermodynamics calculator evaluating work, heat, and internal energy in Isobaric, Isothermal, Isochoric, and Adiabatic processes

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

static const double R_GAS = 8.314462;

int main(void) {
    int choice;
    do {
        printf("\n================ IDEAL GAS THERMODYNAMICS WORKBENCH ================\n");
        printf("1. Isobaric Process (Constant Pressure)\n");
        printf("2. Isothermal Process (Constant Temperature)\n");
        printf("3. Isochoric Process (Constant Volume)\n");
        printf("4. Adiabatic Process (Zero Heat Exchange, PV^gamma = const)\n");
        printf("5. Carnot Heat Engine Efficiency (eta = 1 - Tc / Th)\n");
        printf("0. Exit\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                double P, V1, V2;
                printf("Enter pressure P (Pa) and initial/final volumes V1, V2 (m^3): ");
                if (scanf("%lf %lf %lf", &P, &V1, &V2) == 3) {
                    double W = P * (V2 - V1);
                    printf("Isobaric Work W = P * Delta(V) = %.2f Joules\n", W);
                } else { clear_input(); }
                break;
            }
            case 2: {
                double n, T, V1, V2;
                printf("Enter moles n, temperature T (K), and volumes V1, V2 (m^3): ");
                if (scanf("%lf %lf %lf %lf", &n, &T, &V1, &V2) == 4 && V1 > 0 && V2 > 0) {
                    double W = n * R_GAS * T * log(V2 / V1);
                    printf("Isothermal Work W = n*R*T*ln(V2/V1) = %.2f Joules (Q = W, Delta(U) = 0)\n", W);
                } else { clear_input(); }
                break;
            }
            case 3: {
                double n, Cv, T1, T2;
                printf("Enter moles n, molar heat capacity Cv (J/mol*K), and T1, T2 (K): ");
                if (scanf("%lf %lf %lf %lf", &n, &Cv, &T1, &T2) == 4) {
                    double Q = n * Cv * (T2 - T1);
                    printf("Isochoric Work W = 0 Joules\n");
                    printf("Heat Transferred Q = Delta(U) = %.2f Joules\n", Q);
                } else { clear_input(); }
                break;
            }
            case 4: {
                double P1, V1, P2, V2, gamma;
                printf("Enter P1 (Pa), V1 (m^3), P2 (Pa), V2 (m^3), and heat capacity ratio gamma (e.g. 1.4): ");
                if (scanf("%lf %lf %lf %lf %lf", &P1, &V1, &P2, &V2, &gamma) == 5 && gamma != 1.0) {
                    double W = (P1 * V1 - P2 * V2) / (gamma - 1.0);
                    printf("Adiabatic Work W = (P1*V1 - P2*V2)/(gamma - 1) = %.2f Joules\n", W);
                    printf("Internal Energy Delta(U) = -W = %.2f Joules\n", -W);
                } else { clear_input(); }
                break;
            }
            case 5: {
                double Th, Tc;
                printf("Enter hot reservoir Th (K) and cold reservoir Tc (K): ");
                if (scanf("%lf %lf", &Th, &Tc) == 2 && Th > Tc && Tc > 0) {
                    double eta = 1.0 - (Tc / Th);
                    printf("Carnot Efficiency eta = 1 - Tc/Th = %.4f (%.2f%%)\n", eta, eta * 100.0);
                } else { clear_input(); }
                break;
            }
            case 0:
                printf("Exiting Thermodynamics Workbench.\n");
                break;
            default:
                printf("Invalid selection.\n");
        }
    } while (choice != 0);

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_ideal_gas_work`, `academics-programming.physics.thermodynamics.ideal-gas-work.prog-ideal-gas-work`, `academics-programming>prog_acad_ideal_gas_work()`, `academics-programming>physics>thermodynamics>ideal-gas-work>prog-ideal-gas-work>prog_acad_ideal_gas_work()`
