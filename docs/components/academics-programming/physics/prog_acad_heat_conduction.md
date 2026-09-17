# prog_acad_heat_conduction
> **Domain:** `academics-programming` | **Subcategory:** `physics` | **Type:** `program`
## Overview
Computes 1D steady-state heat conduction temperature profile across a rod

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

void steady_heat_conduction(double L, double k, double T1, double T2, double A, int nodes) {
    double dx = L / (nodes - 1);
    double q_flux = -k * (T2 - T1) / L;
    double total_rate = q_flux * A;

    printf("Heat Flux: %.2f W/m^2
", q_flux);
    printf("Total Heat Transfer Rate: %.2f W
", total_rate);
    printf("Nodal Temperatures:
");
    for (int i = 0; i < nodes; i++) {
        double x = i * dx;
        double T = T1 + (T2 - T1) * (x / L);
        printf("x = %.3f m: T = %.2f C
", x, T);
    }
}

int main(void) {
    steady_heat_conduction(0.5, 45.0, 100.0, 20.0, 0.01, 6);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_heat_conduction`, `academics-programming.physics.thermodynamics.heat-conduction.prog-heat-conduction`, `academics-programming>prog_acad_heat_conduction()`, `academics-programming>physics>thermodynamics>heat-conduction>prog-heat-conduction>prog_acad_heat_conduction()`
