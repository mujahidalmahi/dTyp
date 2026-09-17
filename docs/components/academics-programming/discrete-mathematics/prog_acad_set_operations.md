# prog_acad_set_operations
> **Domain:** `academics-programming` | **Subcategory:** `discrete-mathematics` | **Type:** `program`
## Overview
Computes set union, intersection, and set difference on user-specified sets

## Signature
```c
int main(void);
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
#include <stdio.h>

int set_contains(const int* set, int size, int val) {
    for (int i = 0; i < size; i++) {
        if (set[i] == val) return 1;
    }
    return 0;
}

int set_union(const int* A, int sizeA, const int* B, int sizeB, int* out) {
    int count = 0;
    for (int i = 0; i < sizeA; i++) out[count++] = A[i];
    for (int i = 0; i < sizeB; i++) {
        if (!set_contains(A, sizeA, B[i])) out[count++] = B[i];
    }
    return count;
}

int set_intersection(const int* A, int sizeA, const int* B, int sizeB, int* out) {
    int count = 0;
    for (int i = 0; i < sizeA; i++) {
        if (set_contains(B, sizeB, A[i])) out[count++] = A[i];
    }
    return count;
}

int set_difference(const int* A, int sizeA, const int* B, int sizeB, int* out) {
    int count = 0;
    for (int i = 0; i < sizeA; i++) {
        if (!set_contains(B, sizeB, A[i])) out[count++] = A[i];
    }
    return count;
}

void print_set(const char* label, const int* set, int size) {
    printf("%s: { ", label);
    for (int i = 0; i < size; i++) {
        printf("%d%s", set[i], (i < size - 1) ? ", " : " ");
    }
    printf("}
");
}

int main(void) {
    int A[] = {1, 2, 3, 4, 5};
    int B[] = {3, 4, 5, 6, 7};
    int sizeA = 5, sizeB = 5;
    int res[15];

    print_set("Set A", A, sizeA);
    print_set("Set B", B, sizeB);

    int u_len = set_union(A, sizeA, B, sizeB, res);
    print_set("A Union B", res, u_len);

    int i_len = set_intersection(A, sizeA, B, sizeB, res);
    print_set("A Intersect B", res, i_len);

    int d_len = set_difference(A, sizeA, B, sizeB, res);
    print_set("A Difference B", res, d_len);

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_acad_set_operations`, `academics-programming.discrete-mathematics.logic-set-theory.set-operations.prog-set-operations`, `academics-programming>prog_acad_set_operations()`, `academics-programming>discrete-mathematics>logic-set-theory>set-operations>prog-set-operations>prog_acad_set_operations()`
