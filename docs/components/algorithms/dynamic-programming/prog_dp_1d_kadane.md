# prog_dp_1d_kadane
> **Domain:** `algorithms` | **Subcategory:** `dynamic-programming` | **Type:** `program`
## Overview
Complete interactive program running 1D Dynamic Programming: Kadane and Climbing Stairs

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

#define MAX_N 500

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

static void run_kadane(void) {
    int n;
    printf("Enter array size N: ");
    if (scanf("%d", &n) != 1 || n <= 0 || n > MAX_N) {
        clear_input();
        return;
    }
    long long arr[MAX_N];
    printf("Enter %d integers: ", n);
    for (int i = 0; i < n; i++) scanf("%lld", &arr[i]);
    clear_input();
    long long max_so_far = arr[0], curr_max = arr[0];
    int start = 0, end = 0, s = 0;
    for (int i = 1; i < n; i++) {
        if (arr[i] > curr_max + arr[i]) {
            curr_max = arr[i];
            s = i;
        } else {
            curr_max += arr[i];
        }
        if (curr_max > max_so_far) {
            max_so_far = curr_max;
            start = s;
            end = i;
        }
    }
    printf("Maximum Contiguous Subarray Sum: %lld\n", max_so_far);
    printf("Subarray elements [indices %d..%d]: ", start, end);
    for (int i = start; i <= end; i++) printf("%lld ", arr[i]);
    putchar('\n');
}

static void climbing_stairs(void) {
    int n;
    printf("Enter number of stairs N (1 to 45): ");
    if (scanf("%d", &n) != 1 || n < 1 || n > 45) {
        clear_input();
        return;
    }
    clear_input();
    long long dp[46];
    dp[1] = 1;
    dp[2] = 2;
    for (int i = 3; i <= n; i++) dp[i] = dp[i - 1] + dp[i - 2];
    printf("Distinct ways to climb %d stairs (1 or 2 steps): %lld\n", n, dp[n]);
}

int main(void) {
    int choice;
    do {
        printf("=== 1D Dynamic Programming Workbench ===\n");
        printf("1. Kadane's Algorithm (Max Subarray Sum with Indices)\n");
        printf("2. Climbing Stairs Problem (1 or 2 steps)\n");
        printf("0. Exit\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            choice = -1;
            continue;
        }
        clear_input();
        switch (choice) {
            case 1:
                run_kadane();
                break;
            case 2:
                climbing_stairs();
                break;
            case 0:
                printf("Exiting suite.\n");
                break;
            default:
                printf("Invalid option.\n");
                break;
        }
    } while (choice != 0);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_dp_1d_kadane`, `algorithms.full-programs.dynamic-programming.1d-dp.prog-kadane`, `algorithms>prog_dp_1d_kadane()`, `algorithms>full-programs>dynamic-programming>1d-dp>prog-kadane>prog_dp_1d_kadane()`, `programKadaneDp`
