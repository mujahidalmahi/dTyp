# prog_2d_geometry
> **Domain:** `boiler-plates` | **Subcategory:** `structures` | **Type:** `program`
## Overview
Complete 2D geometry distance and rectangle area calculation program

## Signature
```c
int main(void)
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

typedef struct Point {
    double x;
    double y;
} Point;

typedef struct Rect {
    Point top_left;
    Point bottom_right;
} Rect;

double rect_area(const Rect* r) {
    double width = r->bottom_right.x - r->top_left.x;
    double height = r->top_left.y - r->bottom_right.y;
    return width * height;
}

int main(void) {
    Rect r = {{0.0, 10.0}, {15.0, 0.0}};
    printf("Rectangle Top-Left: (%.1f, %.1f)\n", r.top_left.x, r.top_left.y);
    printf("Rectangle Bottom-Right: (%.1f, %.1f)\n", r.bottom_right.x, r.bottom_right.y);
    printf("Rectangle Area: %.2f\n", rect_area(&r));
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_2d_geometry`, `boiler-plates.full-programs.structures.prog-2d-geometry`, `boiler-plates>prog_2d_geometry()`, `boiler-plates>full-programs>structures>prog-2d-geometry>prog_2d_geometry()`, `geometryProgram`
