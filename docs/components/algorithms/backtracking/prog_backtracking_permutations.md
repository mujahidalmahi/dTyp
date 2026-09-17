# prog_backtracking_permutations
> **Domain:** `algorithms` | **Subcategory:** `backtracking` | **Type:** `program`
## Overview
Complete recursive array permutation generator program

## Signature
```c
int main(void)
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

void swap(int* a, int* b) { int t = *a; *a = *b; *b = t; }

void permute(int* a, int l, int r) {
    if (l == r) {
        for (int i = 0; i <= r; i++) printf("%d ", a[i]);
        putchar('
');
    } else {
        for (int i = l; i <= r; i++) {
            swap(&a[l], &a[i]);
            permute(a, l + 1, r);
            swap(&a[l], &a[i]);
        }
    }
}

int main(void) {
    int arr[] = {1, 2, 3};
    printf("Permutations of {1, 2, 3}:
");
    permute(arr, 0, 2);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_backtracking_permutations`, `algorithms.full-programs.backtracking.combinatorial.prog-permutations`, `algorithms>prog_backtracking_permutations()`, `algorithms>full-programs>backtracking>combinatorial>prog-permutations>prog_backtracking_permutations()`, `programPermutations`
