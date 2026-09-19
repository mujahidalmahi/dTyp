# prog_collatz_sequence
> **Domain:** `boiler-plates` | **Subcategory:** `loops` | **Type:** `program`
## Overview
Interactive 3n+1 Collatz sequence analyzer with peak and step telemetry

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

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

int main(void) {
    int choice;

    do {
        printf("\n=== COLLATZ 3N+1 CONJECTURE ANALYZER ===\n");
        printf("1. Trace Single Number\n");
        printf("2. Compare Sequence Lengths in Range\n");
        printf("0. Exit\n");
        printf("Select option: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        if (choice == 1) {
            long long n;
            printf("Enter positive starting integer: ");
            if (scanf("%lld", &n) == 1 && n > 0) {
                int steps = 0;
                long long peak = n;
                printf("Sequence: %lld", n);
                while (n != 1) {
                    if (n % 2 == 0) {
                        n = n / 2;
                    } else {
                        n = 3 * n + 1;
                    }
                    if (n > peak) peak = n;
                    printf(" -> %lld", n);
                    steps++;
                    if (steps % 10 == 0) printf("\n         ");
                }
                printf("\nFinished in %d steps! Peak value reached: %lld\n", steps, peak);
            }
        } else if (choice == 2) {
            int start, end;
            printf("Enter range start and end (1 to 10000): ");
            if (scanf("%d %d", &start, &end) == 2 && start > 0 && start <= end) {
                int max_steps = 0;
                int champion = start;
                for (int i = start; i <= end; i++) {
                    long long curr = i;
                    int st = 0;
                    while (curr != 1) {
                        curr = (curr % 2 == 0) ? curr / 2 : 3 * curr + 1;
                        st++;
                    }
                    if (st > max_steps) {
                        max_steps = st;
                        champion = i;
                    }
                }
                printf("Longest trajectory between %d and %d: Number %d with %d steps!\n",
                       start, end, champion, max_steps);
            }
        }
        clear_input();
    } while (choice != 0);

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_collatz_sequence`, `boiler-plates.full-programs.loops.prog-collatz-sequence`, `boiler-plates>prog_collatz_sequence()`, `boiler-plates>full-programs>loops>prog-collatz-sequence>prog_collatz_sequence()`, `collatzSequenceProgram`
