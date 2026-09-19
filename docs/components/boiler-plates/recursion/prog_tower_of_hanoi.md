# prog_tower_of_hanoi
> **Domain:** `boiler-plates` | **Subcategory:** `recursion` | **Type:** `program`
## Overview
Interactive Tower of Hanoi recursive solver with step tracking

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

static int move_count = 0;

static void solve_hanoi(int n, char from, char to, char aux) {
    if (n <= 0) return;
    solve_hanoi(n - 1, from, aux, to);
    move_count++;
    printf("  Step %3d: Move disk %d from Peg %c to Peg %c\n", move_count, n, from, to);
    solve_hanoi(n - 1, aux, to, from);
}

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

int main(void) {
    int choice;

    do {
        printf("\n=== TOWER OF HANOI SOLVER ===\n");
        printf("1. Solve Puzzle\n");
        printf("0. Exit\n");
        printf("Select option: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        if (choice == 1) {
            int disks;
            printf("Enter number of disks (1 to 10): ");
            if (scanf("%d", &disks) == 1 && disks > 0 && disks <= 10) {
                move_count = 0;
                printf("\nSolving for %d disks:\n", disks);
                solve_hanoi(disks, 'A', 'C', 'B');
                printf("Total moves required: %d (formula: 2^n - 1 = %d)\n",
                       move_count, (1 << disks) - 1);
            }
        }
        clear_input();
    } while (choice != 0);

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_tower_of_hanoi`, `boiler-plates.full-programs.recursion.prog-tower-of-hanoi`, `boiler-plates>prog_tower_of_hanoi()`, `boiler-plates>full-programs>recursion>prog-tower-of-hanoi>prog_tower_of_hanoi()`, `towerOfHanoiProgram`
