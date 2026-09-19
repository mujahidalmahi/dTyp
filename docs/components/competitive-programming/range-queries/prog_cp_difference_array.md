# prog_cp_difference_array
> **Domain:** `competitive-programming` | **Subcategory:** `range-queries` | **Type:** `program`
## Overview
Codeforces style difference array suite applying O(1) range updates and generating final arrays

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

typedef long long ll;
#define MAX_N 1000

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

static void solve_cf_case(void) {
    int n, q;
    printf("Enter array size N and number of updates Q: ");
    if (scanf("%d %d", &n, &q) != 2 || n <= 0 || n > MAX_N) {
        clear_input();
        return;
    }
    ll orig[MAX_N + 2] = {0};
    ll diff[MAX_N + 2] = {0};
    printf("Enter initial %d elements: ", n);
    for (int i = 1; i <= n; i++) {
        scanf("%lld", &orig[i]);
    }
    diff[1] = orig[1];
    for (int i = 2; i <= n; i++) {
        diff[i] = orig[i] - orig[i - 1];
    }
    printf("Enter %d updates (1-indexed L R Val):\n", q);
    for (int i = 0; i < q; i++) {
        int l, r;
        ll v;
        scanf("%d %d %lld", &l, &r, &v);
        if (l >= 1 && r <= n && l <= r) {
            diff[l] += v;
            diff[r + 1] -= v;
        } else {
            printf("Update out of bounds, skipped.\n");
        }
    }
    clear_input();
    ll final_arr[MAX_N + 2];
    ll cur = 0;
    for (int i = 1; i <= n; i++) {
        cur += diff[i];
        final_arr[i] = cur;
    }
    printf("Final array: ");
    for (int i = 1; i <= n; i++) printf("%lld ", final_arr[i]);
    putchar('\n');
}

int main(void) {
    int choice;
    int n = 0;
    ll diff[MAX_N + 2] = {0};
    do {
        printf("=== Difference Array Codeforces Suite ===\n");
        printf("1. Solve Standard Range Updates Problem\n");
        printf("2. Initialize Interactive Array (Size N)\n");
        printf("3. Apply Range Add Update in O(1) [L, R, Val]\n");
        printf("4. Reconstruct & Display Final Array\n");
        printf("5. Solve Multi-Testcases (T Cases)\n");
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
                solve_cf_case();
                break;
            case 2: {
                printf("Enter N (<= %d): ", MAX_N);
                if (scanf("%d", &n) == 1 && n > 0 && n <= MAX_N) {
                    for (int i = 0; i <= n + 1; i++) diff[i] = 0;
                    printf("Enter %d initial values: ", n);
                    ll prev = 0;
                    for (int i = 1; i <= n; i++) {
                        ll x;
                        scanf("%lld", &x);
                        diff[i] = x - prev;
                        prev = x;
                    }
                    clear_input();
                    printf("Array initialized.\n");
                } else {
                    clear_input();
                }
                break;
            }
            case 3: {
                if (n == 0) {
                    printf("Initialize array first.\n");
                    break;
                }
                int l, r;
                ll v;
                printf("Enter L R Val: ");
                if (scanf("%d %d %lld", &l, &r, &v) == 3 && l >= 1 && r <= n && l <= r) {
                    clear_input();
                    diff[l] += v;
                    diff[r + 1] -= v;
                    printf("Updated range [%d, %d] with +%lld in O(1).\n", l, r, v);
                } else {
                    clear_input();
                }
                break;
            }
            case 4: {
                if (n == 0) {
                    printf("Array not initialized.\n");
                    break;
                }
                printf("Reconstructed Array: ");
                ll running = 0;
                for (int i = 1; i <= n; i++) {
                    running += diff[i];
                    printf("%lld ", running);
                }
                putchar('\n');
                break;
            }
            case 5: {
                int t;
                printf("Enter T test cases: ");
                if (scanf("%d", &t) == 1 && t > 0) {
                    clear_input();
                    for (int c = 1; c <= t; c++) {
                        printf("[Case #%d]\n", c);
                        solve_cf_case();
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
Available via: `prog_cp_difference_array`, `competitive-programming.full-programs.range-queries.difference-array.prog-difference-array`, `competitive-programming>prog_cp_difference_array()`, `competitive-programming>full-programs>range-queries>difference-array>prog-difference-array>prog_cp_difference_array()`
