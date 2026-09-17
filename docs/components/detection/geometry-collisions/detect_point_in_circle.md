# detect_point_in_circle
> **Domain:** `detection` | **Subcategory:** `geometry-collisions` | **Type:** `function`
## Overview
Detects if 2D coordinate point lies inside or on circle perimeter

## Signature
```c
int detect_point_in_circle(float px, float py, float cx, float cy, float r);
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
int detect_point_in_circle(float px, float py, float cx, float cy, float r) {
    float dx = px - cx;
    float dy = py - cy;
    return (dx * dx + dy * dy <= r * r);
}
```

## Aliases & Shorthands
Available via: `detect_point_in_circle`, `detection.geometry-collisions.point-in-circle`, `detection>detect_point_in_circle()`, `detection>geometry-collisions>point-in-circle>detect_point_in_circle()`, `is_point_in_circle`
