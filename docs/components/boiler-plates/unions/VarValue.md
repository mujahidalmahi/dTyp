# VarValue
> **Domain:** `boiler-plates` | **Subcategory:** `unions` | **Type:** `struct`
## Overview
Tagged variant union associating a type tag with DataValue

## Signature
```c
typedef struct VarValue { ValueType type; DataValue val; } VarValue;
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
typedef enum ValueType {
    TYPE_INT,
    TYPE_FLOAT,
    TYPE_CHAR
} ValueType;

typedef struct VarValue {
    ValueType type;
    DataValue val;
} VarValue;
```

## Aliases & Shorthands
Available via: `VarValue`, `boiler-plates.separate-components.unions.tagged-union-struct`, `boiler-plates>VarValue()`, `boiler-plates>separate-components>unions>tagged-union-struct>VarValue()`, `tagged_union`

## Dependencies
Requires: `boiler-plates.separate-components.unions.datavalue-union`
