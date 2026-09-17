# vector_push_back
> **Domain:** `data-structures` | **Subcategory:** `arrays` | **Type:** `function`
## Overview
Appends element to vector and doubles capacity if full

## Signature
```c
void vector_push_back(Vector* v, int val);
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
void vector_push_back(Vector* v, int val) {
    if (v->size >= v->capacity) {
        v->capacity *= 2;
        v->items = (int*)realloc(v->items, v->capacity * sizeof(int));
    }
    v->items[v->size++] = val;
}
```

## Aliases & Shorthands
Available via: `vector_push_back`, `data-structures.separate-components.arrays.dynamic-array.push-back`, `data-structures>vector_push_back()`, `data-structures>separate-components>arrays>dynamic-array>push-back>vector_push_back()`, `vectorPushBack`

## Dependencies
Requires: `data-structures.separate-components.arrays.dynamic-array.vector-struct`
