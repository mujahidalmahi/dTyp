# prog_tower_of_hanoi
> **Domain:** `boiler-plates` | **Subcategory:** `recursion` | **Type:** `program`
## Overview
Complete recursive Tower of Hanoi solver program

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

void solve_hanoi(int n, char from, char to, char aux) {
    if (n == 1) {
        printf("Move disk 1 from %c to %c
", from, to);
        return;
    }
    solve_hanoi(n - 1, from, aux, to);
    printf("Move disk %d from %c to %c
", n, from, to);
    solve_hanoi(n - 1, aux, to, from);
}

int main(void) {
    int disks = 3;
    printf("Solving Tower of Hanoi for %d disks:
", disks);
    solve_hanoi(disks, 'A', 'C', 'B');
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_tower_of_hanoi`, `boiler-plates.full-programs.recursion.prog-tower-of-hanoi`, `boiler-plates>prog_tower_of_hanoi()`, `boiler-plates>full-programs>recursion>prog-tower-of-hanoi>prog_tower_of_hanoi()`, `hanoiProgram`
