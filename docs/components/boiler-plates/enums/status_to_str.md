# status_to_str
> **Domain:** `boiler-plates` | **Subcategory:** `enums` | **Type:** `function`
## Overview
Converts Status enum value to string representation

## Signature
```c
const char* status_to_str(Status s);
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
const char* status_to_str(Status s) {
    switch (s) {
        case STATUS_OK:
            return "OK";
        case STATUS_ERROR:
            return "ERROR";
        case STATUS_PENDING:
            return "PENDING";
        default:
            return "UNKNOWN";
    }
}
```

## Aliases & Shorthands
Available via: `status_to_str`, `boiler-plates.separate-components.enums.status-to-string`, `boiler-plates>status_to_str()`, `boiler-plates>separate-components>enums>status-to-string>status_to_str()`, `statusToString`

## Dependencies
Requires: `boiler-plates.separate-components.enums.status-enum`
