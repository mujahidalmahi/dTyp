# detect_point_in_rect
> **Domain:** `detection` | **Subcategory:** `geometry-collisions` | **Type:** `function`
## Overview
Detects if 2D coordinate point lies inside axis-aligned rectangle boundary

## Signature
```c
int detect_point_in_rect(float px, float py, float rx, float ry, float rw, float rh);
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
int detect_point_in_rect(float px, float py, float rx, float ry, float rw, float rh) {
    return (px >= rx && px <= rx + rw && py >= ry && py <= ry + rh);
}
```

## Aliases & Shorthands
Available via: `detect_point_in_rect`, `detection.geometry-collisions.point-in-rect`, `detection>detect_point_in_rect()`, `detection>geometry-collisions>point-in-rect>detect_point_in_rect()`, `is_point_in_rect`
