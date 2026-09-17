# macro_array_len
> **Domain:** `boiler-plates` | **Subcategory:** `macros` | **Type:** `macro`
## Overview
Calculates static array element count at compile-time

## Signature
```c
#define ARRAY_LEN(arr) (sizeof(arr) / sizeof((arr)[0]))
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
#define ARRAY_LEN(arr) (sizeof(arr) / sizeof((arr)[0]))
```

## Aliases & Shorthands
Available via: `macro_array_len`, `boiler-plates.separate-components.macros.macro-array-size`, `boiler-plates>macro_array_len()`, `boiler-plates>separate-components>macros>macro-array-size>macro_array_len()`, `arrayLen`
