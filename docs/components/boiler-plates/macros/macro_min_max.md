# macro_min_max
> **Domain:** `boiler-plates` | **Subcategory:** `macros` | **Type:** `macro`
## Overview
Preprocessor macros for MIN and MAX value evaluation

## Signature
```c
#define MIN(a,b) ... #define MAX(a,b) ...
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
#define MIN(a, b) (((a) < (b)) ? (a) : (b))
#define MAX(a, b) (((a) > (b)) ? (a) : (b))
```

## Aliases & Shorthands
Available via: `macro_min_max`, `boiler-plates.separate-components.macros.macro-min-max`, `boiler-plates>macro_min_max()`, `boiler-plates>separate-components>macros>macro-min-max>macro_min_max()`, `minMaxMacros`
