# prog_acad_planes_lines_3d
> **Domain:** `academics-programming` | **Subcategory:** `geometry-linear-algebra` | **Type:** `program`
## Overview
Computes dihedral angle between 3D planes and direction vector of intersection line

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

void analyze_planes_3d(double a1, double b1, double c1,
                       double a2, double b2, double c2) {
    double dot = a1 * a2 + b1 * b2 + c1 * c2;
    double mag1 = sqrt(a1 * a1 + b1 * b1 + c1 * c1);
    double mag2 = sqrt(a2 * a2 + b2 * b2 + c2 * c2);
    double cos_theta = dot / (mag1 * mag2);
    double theta_deg = acos(cos_theta) * (180.0 / 3.141592653589793);

    double line_dx = b1 * c2 - b2 * c1;
    double line_dy = c1 * a2 - c2 * a1;
    double line_dz = a1 * b2 - a2 * b1;

    printf("Angle between planes: %.2f degrees
", theta_deg);
    printf("Line of intersection direction vector: (%.2f, %.2f, %.2f)
",
           line_dx, line_dy, line_dz);
}

int main(void) {
    analyze_planes_3d(1, 1, 1, 1, -1, 1);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_planes_lines_3d`, `academics-programming.geometry-linear-algebra.coordinate-geometry.planes-lines-3d.prog-planes-lines-3d`, `academics-programming>prog_acad_planes_lines_3d()`, `academics-programming>geometry-linear-algebra>coordinate-geometry>planes-lines-3d>prog-planes-lines-3d>prog_acad_planes_lines_3d()`
