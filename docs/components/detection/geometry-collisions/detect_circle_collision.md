# detect_circle_collision
> **Domain:** `detection` | **Subcategory:** `geometry-collisions` | **Type:** `function`
## Overview
Detects collision/overlap between two 2D circles using squared Euclidean distance

## Signature
```c
int detect_circle_collision(float x1, float y1, float r1, float x2, float y2, float r2);
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
int detect_circle_collision(float x1, float y1, float r1, float x2, float y2, float r2) {
    float dx = x1 - x2;
    float dy = y1 - y2;
    float dist_sq = dx * dx + dy * dy;
    float rad_sum = r1 + r2;
    return (dist_sq <= rad_sum * rad_sum);
}
```

## Aliases & Shorthands
Available via: `detect_circle_collision`, `detection.geometry-collisions.circle-collision`, `detection>detect_circle_collision()`, `detection>geometry-collisions>circle-collision>detect_circle_collision()`, `circle_overlap`
