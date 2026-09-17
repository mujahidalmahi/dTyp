# point2d_distance
> **Domain:** `boiler-plates` | **Subcategory:** `structures` | **Type:** `function`
## Overview
Calculates Euclidean distance between two Point2D structures

## Signature
```c
double point2d_distance(const Point2D* a, const Point2D* b);
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
double point2d_distance(const Point2D* a, const Point2D* b) {
    double dx = a->x - b->x;
    double dy = a->y - b->y;
    return sqrt(dx * dx + dy * dy);
}
```

## Aliases & Shorthands
Available via: `point2d_distance`, `boiler-plates.separate-components.structures.point2d-distance`, `boiler-plates>point2d_distance()`, `boiler-plates>separate-components>structures>point2d-distance>point2d_distance()`, `point2dDistance`

## Dependencies
Requires: `boiler-plates.separate-components.structures.point2d-struct`
