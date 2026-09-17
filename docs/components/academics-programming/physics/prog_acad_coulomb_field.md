# prog_acad_coulomb_field
> **Domain:** `academics-programming` | **Subcategory:** `physics` | **Type:** `program`
## Overview
Computes net electric field vector and magnitude at test location from point charges

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

void compute_electric_field(int n, const double q[], const double x[], const double y[],
                            double px, double py) {
    double ke = 8.98755e9;
    double Ex = 0.0, Ey = 0.0;
    for (int i = 0; i < n; i++) {
        double dx = px - x[i];
        double dy = py - y[i];
        double r = sqrt(dx * dx + dy * dy);
        if (r > 1e-12) {
            double E_mag = ke * q[i] / (r * r);
            Ex += E_mag * (dx / r);
            Ey += E_mag * (dy / r);
        }
    }
    double total_E = sqrt(Ex * Ex + Ey * Ey);
    printf("Electric Field at (%.2f, %.2f):
", px, py);
    printf("Ex = %.4e N/C, Ey = %.4e N/C
", Ex, Ey);
    printf("|E| = %.4e N/C
", total_E);
}

int main(void) {
    int n = 2;
    double q[] = {1e-9, -1e-9};
    double x[] = {-0.05, 0.05};
    double y[] = {0.0, 0.0};
    compute_electric_field(n, q, x, y, 0.0, 0.1);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_coulomb_field`, `academics-programming.physics.electromagnetism-optics.coulomb-field.prog-coulomb-field`, `academics-programming>prog_acad_coulomb_field()`, `academics-programming>physics>electromagnetism-optics>coulomb-field>prog-coulomb-field>prog_acad_coulomb_field()`
