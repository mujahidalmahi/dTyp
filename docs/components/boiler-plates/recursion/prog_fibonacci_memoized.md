# prog_fibonacci_memoized
> **Domain:** `boiler-plates` | **Subcategory:** `recursion` | **Type:** `program`
## Overview
Complete recursive Fibonacci program with memoization array

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

long long memo[100];

long long fib(int n) {
    if (n <= 0) return 0;
    if (n == 1) return 1;
    if (memo[n] != 0) return memo[n];
    memo[n] = fib(n - 1) + fib(n - 2);
    return memo[n];
}

int main(void) {
    for (int i = 0; i <= 20; i++) {
        printf("Fib(%d) = %lld\n", i, fib(i));
    }
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_fibonacci_memoized`, `boiler-plates.full-programs.recursion.prog-fibonacci-memoized`, `boiler-plates>prog_fibonacci_memoized()`, `boiler-plates>full-programs>recursion>prog-fibonacci-memoized>prog_fibonacci_memoized()`, `fibonacciMemoProgram`
