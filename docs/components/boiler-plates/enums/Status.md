# Status
> **Domain:** `boiler-plates` | **Subcategory:** `enums` | **Type:** `enum`
## Overview
Standard status code enumeration

## Signature
```c
typedef enum Status { STATUS_OK = 0, STATUS_ERROR, STATUS_PENDING } Status;
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
typedef enum Status {
    STATUS_OK = 0,
    STATUS_ERROR = 1,
    STATUS_PENDING = 2
} Status;
```

## Aliases & Shorthands
Available via: `Status`, `boiler-plates.separate-components.enums.status-enum`, `boiler-plates>Status()`, `boiler-plates>separate-components>enums>status-enum>Status()`, `status_enum`
