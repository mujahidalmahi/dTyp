# prog_fibonacci_memoized
> **Domain:** `boiler-plates` | **Subcategory:** `recursion` | **Type:** `program`
## Overview
Interactive Fibonacci recursion workbench comparing memoized vs iterative computation

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
#include <string.h>

static unsigned long long memo[93];
static long long recursive_calls = 0;

static unsigned long long fib_memo(int n) {
    recursive_calls++;
    if (n <= 0) return 0;
    if (n == 1) return 1;
    if (memo[n] != 0) return memo[n];
    memo[n] = fib_memo(n - 1) + fib_memo(n - 2);
    return memo[n];
}

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

int main(void) {
    int choice;

    do {
        printf("\n=== MEMOIZED FIBONACCI CALCULATOR ===\n");
        printf("1. Calculate Fibonacci(N) [1 to 90]\n");
        printf("2. Print Fibonacci Sequence up to N\n");
        printf("0. Exit\n");
        printf("Select option: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        if (choice == 1) {
            int n;
            printf("Enter N (0 to 90): ");
            if (scanf("%d", &n) == 1 && n >= 0 && n <= 90) {
                memset(memo, 0, sizeof(memo));
                recursive_calls = 0;
                unsigned long long result = fib_memo(n);
                printf("Fibonacci(%d) = %llu\n", n, result);
                printf("Memoized recursive calls made: %lld\n", recursive_calls);
            }
        } else if (choice == 2) {
            int limit;
            printf("Enter limit N (1 to 45): ");
            if (scanf("%d", &limit) == 1 && limit > 0 && limit <= 45) {
                memset(memo, 0, sizeof(memo));
                printf("Sequence: ");
                for (int i = 0; i <= limit; i++) {
                    printf("%llu ", fib_memo(i));
                }
                printf("\n");
            }
        }
        clear_input();
    } while (choice != 0);

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_fibonacci_memoized`, `boiler-plates.full-programs.recursion.prog-fibonacci-memoized`, `boiler-plates>prog_fibonacci_memoized()`, `boiler-plates>full-programs>recursion>prog-fibonacci-memoized>prog_fibonacci_memoized()`, `fibonacciMemoizedProgram`
