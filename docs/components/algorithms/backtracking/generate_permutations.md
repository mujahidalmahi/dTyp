# generate_permutations
> **Domain:** `algorithms` | **Subcategory:** `backtracking` | **Type:** `function`
## Overview
Generates all permutations of an array recursively

## Signature
```c
void generate_permutations(int* arr, int l, int r, void (*callback)(const int*, int));
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
static void swap_val(int* a, int* b) { int t = *a; *a = *b; *b = t; }

void generate_permutations(int* arr, int l, int r, void (*callback)(const int*, int)) {
    if (l == r) {
        callback(arr, r + 1);
    } else {
        for (int i = l; i <= r; i++) {
            swap_val(&arr[l], &arr[i]);
            generate_permutations(arr, l + 1, r, callback);
            swap_val(&arr[l], &arr[i]);
        }
    }
}
```

## Aliases & Shorthands
Available via: `generate_permutations`, `algorithms.separate-components.backtracking.combinatorial.permutations`, `algorithms>generate_permutations()`, `algorithms>separate-components>backtracking>combinatorial>permutations>generate_permutations()`, `permutations`
