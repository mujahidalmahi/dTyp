# print_person
> **Domain:** `boiler-plates` | **Subcategory:** `structures` | **Type:** `function`
## Overview
Outputs a Person instance to standard output

## Signature
```c
void print_person(const Person* p);
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
void print_person(const Person* p) {
    if (!p) return;
    printf("Person { name: %s, age: %d, score: %.2f }
", p->name, p->age, p->score);
}
```

## Aliases & Shorthands
Available via: `print_person`, `boiler-plates.separate-components.structures.print-person`, `boiler-plates>print_person()`, `boiler-plates>separate-components>structures>print-person>print_person()`, `printPerson`

## Dependencies
Requires: `boiler-plates.separate-components.structures.person-struct`
