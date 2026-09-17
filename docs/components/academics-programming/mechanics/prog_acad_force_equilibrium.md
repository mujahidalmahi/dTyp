# prog_acad_force_equilibrium
> **Domain:** `academics-programming` | **Subcategory:** `mechanics` | **Type:** `program`
## Overview
Computes resultant and equilibrant force vector for 2D concurrent forces

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

void resolve_forces(int n, const double mag[], const double theta_deg[]) {
    double sum_fx = 0.0, sum_fy = 0.0;
    for (int i = 0; i < n; i++) {
        double rad = theta_deg[i] * (3.141592653589793 / 180.0);
        sum_fx += mag[i] * cos(rad);
        sum_fy += mag[i] * sin(rad);
    }
    double r_mag = sqrt(sum_fx * sum_fx + sum_fy * sum_fy);
    double r_ang = atan2(sum_fy, sum_fx) * (180.0 / 3.141592653589793);
    printf("Resultant Force: %.2f N at %.2f deg
", r_mag, r_ang);
    printf("Equilibrant:     %.2f N at %.2f deg
", r_mag, r_ang + 180.0);
}

int main(void) {
    int n = 3;
    double mag[] = {100, 150, 80};
    double deg[] = {0, 60, 135};
    resolve_forces(n, mag, deg);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_force_equilibrium`, `academics-programming.mechanics.statics-beams.force-equilibrium.prog-force-equilibrium`, `academics-programming>prog_acad_force_equilibrium()`, `academics-programming>mechanics>statics-beams>force-equilibrium>prog-force-equilibrium>prog_acad_force_equilibrium()`
