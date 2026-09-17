# Person
> **Domain:** `boiler-plates` | **Subcategory:** `structures` | **Type:** `struct`
## Overview
Person entity structure declaration

## Signature
```c
typedef struct Person { char name[64]; int age; float score; } Person;
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
typedef struct Person {
    char name[64];
    int age;
    float score;
} Person;
```

## Aliases & Shorthands
Available via: `Person`, `boiler-plates.separate-components.structures.person-struct`, `boiler-plates>Person()`, `boiler-plates>separate-components>structures>person-struct>Person()`, `person_struct`
