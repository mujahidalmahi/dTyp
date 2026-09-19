# prog_cp_monotonic_structures
> **Domain:** `competitive-programming` | **Subcategory:** `cp-data-structures` | **Type:** `program`
## Overview
Codeforces style monotonic structures suite computing next greater elements, window max, and histogram area

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

#define MAX_N 1000

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

static void next_greater_element(void) {
    int n;
    printf("Enter array size N: ");
    if (scanf("%d", &n) != 1 || n <= 0 || n > MAX_N) {
        clear_input();
        return;
    }
    int arr[MAX_N], nge[MAX_N], stack[MAX_N];
    printf("Enter %d integers: ", n);
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    clear_input();
    int top = -1;
    for (int i = n - 1; i >= 0; i--) {
        while (top >= 0 && stack[top] <= arr[i]) top--;
        nge[i] = (top >= 0) ? stack[top] : -1;
        stack[++top] = arr[i];
    }
    printf("Next Greater Elements:\n");
    for (int i = 0; i < n; i++) {
        printf("arr[%d] = %-4d -> NGE: %d\n", i, arr[i], nge[i]);
    }
}

static void sliding_window_maximum(void) {
    int n, k;
    printf("Enter array size N and window size K: ");
    if (scanf("%d %d", &n, &k) != 2 || n <= 0 || k <= 0 || k > n || n > MAX_N) {
        clear_input();
        return;
    }
    int arr[MAX_N], deque[MAX_N];
    printf("Enter %d integers: ", n);
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    clear_input();
    int head = 0, tail = -1;
    printf("Sliding Window Maximums: ");
    for (int i = 0; i < n; i++) {
        if (head <= tail && deque[head] <= i - k) head++;
        while (head <= tail && arr[deque[tail]] <= arr[i]) tail--;
        deque[++tail] = i;
        if (i >= k - 1) {
            printf("%d ", arr[deque[head]]);
        }
    }
    putchar('\n');
}

static void largest_rectangle_histogram(void) {
    int n;
    printf("Enter number of bars N: ");
    if (scanf("%d", &n) != 1 || n <= 0 || n > MAX_N) {
        clear_input();
        return;
    }
    long long h[MAX_N];
    printf("Enter %d bar heights: ", n);
    for (int i = 0; i < n; i++) scanf("%lld", &h[i]);
    clear_input();
    int stack[MAX_N + 1];
    int top = -1;
    long long max_area = 0;
    for (int i = 0; i <= n; i++) {
        long long cur_h = (i == n) ? 0 : h[i];
        while (top >= 0 && h[stack[top]] > cur_h) {
            long long height = h[stack[top--]];
            long long width = (top < 0) ? i : (i - stack[top] - 1);
            long long area = height * width;
            if (area > max_area) max_area = area;
        }
        stack[++top] = i;
    }
    printf("Largest Rectangle Area: %lld\n", max_area);
}

int main(void) {
    int choice;
    do {
        printf("=== Monotonic Structures Codeforces Suite ===\n");
        printf("1. Next Greater Element (NGE) in O(N)\n");
        printf("2. Sliding Window Maximum in O(N) using Monotonic Deque\n");
        printf("3. Largest Rectangle in Histogram in O(N) using Monotonic Stack\n");
        printf("4. Solve Multi-Testcases (T Cases)\n");
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
                next_greater_element();
                break;
            case 2:
                sliding_window_maximum();
                break;
            case 3:
                largest_rectangle_histogram();
                break;
            case 4: {
                int t;
                printf("Enter T test cases: ");
                if (scanf("%d", &t) == 1 && t > 0) {
                    clear_input();
                    for (int c = 1; c <= t; c++) {
                        printf("[Case #%d]\n", c);
                        next_greater_element();
                    }
                } else {
                    clear_input();
                }
                break;
            }
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
Available via: `prog_cp_monotonic_structures`, `competitive-programming.full-programs.cp-data-structures.monotonic-structures.prog-monotonic-structures`, `competitive-programming>prog_cp_monotonic_structures()`, `competitive-programming>full-programs>cp-data-structures>monotonic-structures>prog-monotonic-structures>prog_cp_monotonic_structures()`
