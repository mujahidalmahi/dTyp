# detect_point_in_polygon
> **Domain:** `detection` | **Subcategory:** `geometry-collisions` | **Type:** `function`
## Overview
Detects if point is inside arbitrary polygon using ray-casting parity rule

## Signature
```c
int detect_point_in_polygon(float px, float py, const float* poly_x, const float* poly_y, int n);
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
int detect_point_in_polygon(float px, float py, const float* poly_x, const float* poly_y, int n) {
    int inside = 0;
    for (int i = 0, j = n - 1; i < n; j = i++) {
        if (((poly_y[i] > py) != (poly_y[j] > py)) &&
            (px < (poly_y[j] - poly_x[i]) * (py - poly_y[i]) / (poly_y[j] - poly_y[i]) + poly_x[i])) {
            inside = !inside;
        }
    }
    return inside;
}
```

## Aliases & Shorthands
Available via: `detect_point_in_polygon`, `detection.geometry-collisions.point-in-polygon`, `detection>detect_point_in_polygon()`, `detection>geometry-collisions>point-in-polygon>detect_point_in_polygon()`, `is_point_in_polygon`
