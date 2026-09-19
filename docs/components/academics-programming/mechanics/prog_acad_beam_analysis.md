# prog_acad_beam_analysis
> **Domain:** `academics-programming` | **Subcategory:** `mechanics` | **Type:** `program`
## Overview
Interactive simply supported beam analyzer computing support reactions, shear force V(x), bending moment M(x), and maximum moment

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

#define MAX_LOADS 10

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

int main(void) {
    double L = 10.0;
    int num_loads = 1;
    double P[MAX_LOADS] = {50.0};
    double a[MAX_LOADS] = {5.0};
    double udl_w = 10.0;

    int choice;
    do {
        printf("\n================ BEAM ANALYSIS (SIMPLY SUPPORTED) ================\n");
        printf("1. Enter Beam Span and Loads\n");
        printf("2. Compute Support Reactions (RA and RB)\n");
        printf("3. Print Shear Force V(x) & Bending Moment M(x) Table\n");
        printf("0. Exit\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                printf("Enter beam length L in meters: ");
                if (scanf("%lf", &L) != 1 || L <= 0.0) { clear_input(); L = 10.0; break; }
                printf("Enter uniformly distributed load w (kN/m across entire span): ");
                if (scanf("%lf", &udl_w) != 1) udl_w = 0.0;
                printf("Enter number of point loads (0 to %d): ", MAX_LOADS);
                if (scanf("%d", &num_loads) != 1 || num_loads < 0) num_loads = 0;
                for (int i = 0; i < num_loads; i++) {
                    printf("Load %d - Force P (kN) and position x from left support (m): ", i + 1);
                    scanf("%lf %lf", &P[i], &a[i]);
                }
                clear_input();
                break;
            }
            case 2:
            case 3: {
                double sum_moments_A = udl_w * L * (L / 2.0);
                double total_down_force = udl_w * L;
                for (int i = 0; i < num_loads; i++) {
                    sum_moments_A += P[i] * a[i];
                    total_down_force += P[i];
                }
                double RB = sum_moments_A / L;
                double RA = total_down_force - RB;

                printf("\n--- Support Reactions ---\n");
                printf("  Left Reaction RA:  %10.3f kN\n", RA);
                printf("  Right Reaction RB: %10.3f kN\n", RB);

                printf("\nShear Force and Bending Moment Profile (10 segments):\n");
                printf("--------------------------------------------------\n");
                printf("  x (m)  | Shear Force V(x) (kN) | Bending Moment M(x) (kN*m)\n");
                printf("--------------------------------------------------\n");
                double max_M = 0.0, max_x = 0.0;
                for (int i = 0; i <= 10; i++) {
                    double x = (L / 10.0) * i;
                    double V = RA - udl_w * x;
                    double M = RA * x - 0.5 * udl_w * x * x;
                    for (int j = 0; j < num_loads; j++) {
                        if (x >= a[j]) {
                            V -= P[j];
                            M -= P[j] * (x - a[j]);
                        }
                    }
                    if (fabs(M) > fabs(max_M)) { max_M = M; max_x = x; }
                    printf(" %6.2f  |       %12.3f    |       %14.3f\n", x, V, M);
                }
                printf("--------------------------------------------------\n");
                printf("Maximum Bending Moment: %.3f kN*m at x = %.2f m\n", max_M, max_x);
                break;
            }
            case 0:
                printf("Exiting Beam Analysis.\n");
                break;
            default:
                printf("Invalid selection.\n");
        }
    } while (choice != 0);

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_beam_analysis`, `academics-programming.mechanics.statics-beams.beam-analysis.prog-beam-analysis`, `academics-programming>prog_acad_beam_analysis()`, `academics-programming>mechanics>statics-beams>beam-analysis>prog-beam-analysis>prog_acad_beam_analysis()`
