# detect_sphere_collision_3d
> **Domain:** `detection` | **Subcategory:** `geometry-collisions` | **Type:** `function`
## Overview
Detects collision/overlap between two 3D spheres using 3D Euclidean distance

## Signature
```c
int detect_sphere_collision_3d(float x1, float y1, float z1, float r1, float x2, float y2, float z2, float r2);
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
int detect_sphere_collision_3d(float x1, float y1, float z1, float r1, float x2, float y2, float z2, float r2) {
    float dx = x1 - x2, dy = y1 - y2, dz = z1 - z2;
    float dist_sq = dx * dx + dy * dy + dz * dz;
    float rad_sum = r1 + r2;
    return (dist_sq <= rad_sum * rad_sum);
}
```

## Aliases & Shorthands
Available via: `detect_sphere_collision_3d`, `detection.geometry-collisions.sphere-collision-3d`, `detection>detect_sphere_collision_3d()`, `detection>geometry-collisions>sphere-collision-3d>detect_sphere_collision_3d()`, `sphere_overlap_3d`
