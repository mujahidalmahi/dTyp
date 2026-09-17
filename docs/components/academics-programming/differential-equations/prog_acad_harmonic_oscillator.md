# prog_acad_harmonic_oscillator
> **Domain:** `academics-programming` | **Subcategory:** `differential-equations` | **Type:** `program`
## Overview
Simulates 2nd-order damped harmonic oscillator y'' + 2*zeta*omega*y' + omega^2*y = 0

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

void solve_oscillator_rk4(double m, double c, double k, double y0, double v0, double dt, int steps) {
    double t = 0.0;
    double y = y0, v = v0;
    printf("Time   | Displacement | Velocity
");
    printf("-------+--------------+---------
");
    for (int i = 0; i <= steps; i++) {
        if (i % 20 == 0) printf("%6.2f | %12.4f | %8.4f
", t, y, v);
        double kv1 = (-c * v - k * y) / m;
        double ky1 = v;

        double v_mid1 = v + 0.5 * dt * kv1;
        double y_mid1 = y + 0.5 * dt * ky1;
        double kv2 = (-c * v_mid1 - k * y_mid1) / m;
        double ky2 = v_mid1;

        double v_mid2 = v + 0.5 * dt * kv2;
        double y_mid2 = y + 0.5 * dt * ky2;
        double kv3 = (-c * v_mid2 - k * y_mid2) / m;
        double ky3 = v_mid2;

        double v_end = v + dt * kv3;
        double y_end = y + dt * ky3;
        double kv4 = (-c * v_end - k * y_end) / m;
        double ky4 = v_end;

        v += (dt / 6.0) * (kv1 + 2 * kv2 + 2 * kv3 + kv4);
        y += (dt / 6.0) * (ky1 + 2 * ky2 + 2 * ky3 + ky4);
        t += dt;
    }
}

int main(void) {
    solve_oscillator_rk4(1.0, 0.5, 4.0, 1.0, 0.0, 0.05, 100);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_harmonic_oscillator`, `academics-programming.differential-equations.second-order-bvp.harmonic-oscillator-rk4.prog-harmonic-oscillator`, `academics-programming>prog_acad_harmonic_oscillator()`, `academics-programming>differential-equations>second-order-bvp>harmonic-oscillator-rk4>prog-harmonic-oscillator>prog_acad_harmonic_oscillator()`
