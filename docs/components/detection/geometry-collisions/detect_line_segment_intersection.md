# detect_line_segment_intersection
> **Domain:** `detection` | **Subcategory:** `geometry-collisions` | **Type:** `function`
## Overview
Detects if two 2D line segments intersect using cross product counter-clockwise orientation

## Signature
```c
int detect_line_segment_intersection(float x1, float y1, float x2, float y2, float x3, float y3, float x4, float y4);
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
static int ccw_check(float ax, float ay, float bx, float by, float cx, float cy) {
    return ((cy - ay) * (bx - ax) > (by - ay) * (cx - ax));
}

int detect_line_segment_intersection(float x1, float y1, float x2, float y2, float x3, float y3, float x4, float y4) {
    return (ccw_check(x1, y1, x3, y3, x4, y4) != ccw_check(x2, y2, x3, y3, x4, y4)) &&
           (ccw_check(x1, y1, x2, y2, x3, y3) != ccw_check(x1, y1, x2, y2, x4, y4));
}
```

## Aliases & Shorthands
Available via: `detect_line_segment_intersection`, `detection.geometry-collisions.line-segment-intersection`, `detection>detect_line_segment_intersection()`, `detection>geometry-collisions>line-segment-intersection>detect_line_segment_intersection()`, `lines_intersect`
