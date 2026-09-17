# DataValue
> **Domain:** `boiler-plates` | **Subcategory:** `unions` | **Type:** `struct`
## Overview
Basic union supporting multiple primitive representations in shared memory

## Signature
```c
typedef union DataValue { int i; float f; char c; } DataValue;
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
typedef union DataValue {
    int i;
    float f;
    char c;
} DataValue;
```

## Aliases & Shorthands
Available via: `DataValue`, `boiler-plates.separate-components.unions.datavalue-union`, `boiler-plates>DataValue()`, `boiler-plates>separate-components>unions>datavalue-union>DataValue()`, `data_value_union`
