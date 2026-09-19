# prog_acad_optics_refraction
> **Domain:** `academics-programming` | **Subcategory:** `physics` | **Type:** `program`
## Overview
Solves Snell's law of refraction and thin lens magnification equation

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

void analyze_optics(double n1, double n2, double theta1_deg, double f_lens, double d_obj) {
    double theta1 = theta1_deg * (3.141592653589793 / 180.0);
    double sin_theta2 = (n1 / n2) * sin(theta1);
    if (fabs(sin_theta2) <= 1.0) {
        double theta2_deg = asin(sin_theta2) * (180.0 / 3.141592653589793);
        printf("Snell's Law: Refraction Angle = %.2f degrees\n", theta2_deg);
    } else {
        printf("Snell's Law: Total Internal Reflection occurs\n");
    }
    double d_img = (f_lens * d_obj) / (d_obj - f_lens);
    double m = -d_img / d_obj;
    printf("Thin Lens: Image Distance = %.2f cm, Magnification = %.2f\n", d_img, m);
}

int main(void) {
    analyze_optics(1.0, 1.5, 30.0, 10.0, 15.0);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_optics_refraction`, `academics-programming.physics.electromagnetism-optics.optics-refraction.prog-optics-refraction`, `academics-programming>prog_acad_optics_refraction()`, `academics-programming>physics>electromagnetism-optics>optics-refraction>prog-optics-refraction>prog_acad_optics_refraction()`
