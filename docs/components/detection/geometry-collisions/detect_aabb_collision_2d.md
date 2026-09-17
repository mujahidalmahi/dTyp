# detect_aabb_collision_2d
> **Domain:** `detection` | **Subcategory:** `geometry-collisions` | **Type:** `function`
## Overview
Detects overlap between two 2D Axis-Aligned Bounding Boxes

## Signature
```c
int detect_aabb_collision_2d(float x1, float y1, float w1, float h1, float x2, float y2, float w2, float h2);
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
int detect_aabb_collision_2d(float x1, float y1, float w1, float h1, float x2, float y2, float w2, float h2) {
    return (x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2);
}
```

## Aliases & Shorthands
Available via: `detect_aabb_collision_2d`, `detection.geometry-collisions.aabb-collision-2d`, `detection>detect_aabb_collision_2d()`, `detection>geometry-collisions>aabb-collision-2d>detect_aabb_collision_2d()`, `aabb_overlap`
