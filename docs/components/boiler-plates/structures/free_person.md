# free_person
> **Domain:** `boiler-plates` | **Subcategory:** `structures` | **Type:** `function`
## Overview
Deallocates a Person instance and sets pointer to NULL

## Signature
```c
void free_person(Person** p);
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
void free_person(Person** p) {
    if (p != NULL && *p != NULL) {
        free(*p);
        *p = NULL;
    }
}
```

## Aliases & Shorthands
Available via: `free_person`, `boiler-plates.separate-components.structures.free-person`, `boiler-plates>free_person()`, `boiler-plates>separate-components>structures>free-person>free_person()`, `freePerson`

## Dependencies
Requires: `boiler-plates.separate-components.structures.person-struct`
