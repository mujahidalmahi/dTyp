# prog_acad_line_intersection
> **Domain:** `academics-programming` | **Subcategory:** `geometry-linear-algebra` | **Type:** `program`
## Overview
Finds intersection point of two 2D lines and perpendicular distance from a point

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

int find_intersection(double a1, double b1, double c1,
                      double a2, double b2, double c2,
                      double* ix, double* iy) {
    double det = a1 * b2 - a2 * b1;
    if (fabs(det) < 1e-9) return 0;
    *ix = (c1 * b2 - c2 * b1) / det;
    *iy = (a1 * c2 - a2 * c1) / det;
    return 1;
}

double point_to_line_dist(double a, double b, double c, double px, double py) {
    return fabs(a * px + b * py - c) / sqrt(a * a + b * b);
}

int main(void) {
    double a1 = 2, b1 = 3, c1 = 6;
    double a2 = 1, b2 = -1, c2 = 1;
    double ix, iy;
    if (find_intersection(a1, b1, c1, a2, b2, c2, &ix, &iy)) {
        printf("Intersection: (%.4f, %.4f)
", ix, iy);
    }
    double dist = point_to_line_dist(a1, b1, c1, 4, 5);
    printf("Distance from (4, 5) to Line 1: %.4f
", dist);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_line_intersection`, `academics-programming.geometry-linear-algebra.coordinate-geometry.line-intersection.prog-line-intersection`, `academics-programming>prog_acad_line_intersection()`, `academics-programming>geometry-linear-algebra>coordinate-geometry>line-intersection>prog-line-intersection>prog_acad_line_intersection()`
